import { DirectUpload } from '@rails/activestorage';
import { useCallback, useContext, useState } from 'react';
import { Context as ActiveStorageContext } from '../../../../context/ActiveStorage/ActiveStorageProvider';
import { Sentry } from '../../../../helpers/sentry';
import { createAttachment } from '../../attachment.api';
import { Attachment } from '../../types/Attachment';
import { Upload, UploadFile, UseAttachmentUpload } from './useAttachmentUpload.types';

export const useAttachmentUpload: UseAttachmentUpload = ({
  onSuccess: onSuccessCb,
  onError: onErrorCb,
}) => {
  const [uploadInProgress, setUploadInProgress] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<(Attachment | undefined | null)[]>();
  const { directUploadsUrl, headers } = useContext(ActiveStorageContext);

  const setHeaders = useCallback(
    (xhr: XMLHttpRequest) => {
      for (const header in headers) {
        xhr.setRequestHeader(header, headers[header as keyof typeof headers]);
      }
    },
    [headers]
  );

  const onSuccess = async ({
    relatedId,
    relatedType,
    attribute,
    signedIds,
  }: {
    signedIds: string[];
    relatedId: number;
    relatedType: string;
    attribute: string;
  }) => {
    if (relatedId && relatedType && attribute) {
      try {
        setUploadInProgress(true);

        const createAttachments = signedIds.map(async (signedId) =>
          createAttachment({ signedId, relatedId, relatedType, attribute })
        );

        const attachments = await Promise.all(createAttachments);
        onSuccessCb(attachments);
        if (attachments) {
          setAttachments(attachments);
        }
      } catch (err: any) {
        Sentry.captureMessage(err);
        onErrorCb(err);
      } finally {
        setUploadInProgress(false);
      }
    }
  };

  const webUpload: Upload = ({
    uploadFiles,
    relatedId,
    relatedType,
    attribute,
  }: {
    uploadFiles: UploadFile[];
    relatedId: number;
    relatedType: string;
    attribute: string;
  }) => {
    return new Promise((response, reject) => {
      const signedIds: string[] = [];
      try {
        uploadFiles.map(async (uploadFile) => {
          const blob = await fetch(uploadFile.uri).then((res) => res.blob());
          const file = new File([blob], 'attachment.jpg');

          if (directUploadsUrl) {
            const upload = new DirectUpload(file, directUploadsUrl, {
              directUploadWillCreateBlobWithXHR: setHeaders,
              directUploadWillStoreFileWithXHR: setHeaders,
            });

            upload.create((error, blob) => {
              if (!error) {
                signedIds.push(blob.signed_id);
                if (uploadFiles.length === signedIds.length) {
                  onSuccess({ relatedId, relatedType, attribute, signedIds });
                  response({ signedIds });
                }
              } else {
                reject(error);
              }
            });
          } else {
            reject(new Error('direct upload url is not configured'));
          }
        });
      } catch (err: any) {
        Sentry.captureMessage(err);
        reject(err);
      }
    });
  };

  return {
    upload: webUpload,
    uploading: uploadInProgress,
    attachments,
  };
};
