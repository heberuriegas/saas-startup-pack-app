import * as ImagePicker from 'expo-image-picker';
import { Box, IAvatarProps, IImageProps, Image, Spinner, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, { useContext, useState } from 'react';
import { Pressable, ViewProps } from 'react-native';
import { SvgIcon } from '../../../../components/SvgIcon';
import { Sentry } from '../../../../helpers/sentry';
import { useThemedToast } from '../../../../hooks/useThemedToast';
import { useAttachmentUpload } from '../../../attachments/hooks/useAttachmentUpload';

import { AuthContext } from '../../context';
import { getSizes } from '../Avatar.helpers';
import { AvatarWithDefault } from '../AvatarWithDefault/AvatarWithDefault';
import CameraIconSvg from './assets/camera-icon.svg';

interface IUser {
  id?: number;
  avatar?: {
    url?: string | null;
    thumbnailUrl?: string | null;
  } | null;
}

export interface ProfileAvatarProps extends IAvatarProps {
  allowEdit?: boolean;
  user: IUser;
  containerProps?: IVStackProps;
  defaultImageProps?: IImageProps;
  avatarSize?: 'thumbnail' | 'original';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfileAvatar = ({
  user,
  allowEdit,
  containerProps,
  defaultImageProps,
  size = 'sm',
  avatarSize = 'thumbnail',
  source,
  ...props
}: ProfileAvatarProps): React.ReactElement<ViewProps> => {
  const [avatarIsLoading, setAvatarIsLoading] = useState<boolean>(false);
  const { refreshUser } = useContext(AuthContext);
  const toast = useThemedToast();
  const onSuccess = async () => {
    setAvatarIsLoading(true);
    await refreshUser();
    setAvatarIsLoading(false);
  };

  const onError = (err: any) => {
    console.error(err);
    toast.error({ description: 'Something went wrong uploading the attachment' });
  };

  const { upload, uploading } = useAttachmentUpload({
    onSuccess,
    onError,
  });

  const onUploadButtonClick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        toast.warning({ description: 'Please enable access to your photos.' });
        return;
      }
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!image.cancelled) {
        await upload({
          relatedId: Number(user?.id),
          relatedType: 'User',
          attribute: 'avatar',
          uploadFiles: [image],
        });
      }
    } catch (err: any) {
      Sentry.captureMessage(err);
      toast.error({ description: 'Something went wrong uploading the attachment' });
    }
  };

  const getImageUrl = () => {
    if (user && user.avatar) {
      if (avatarSize === 'thumbnail') return user.avatar.thumbnailUrl;
      if (avatarSize === 'original') return user.avatar.url;
      return user.avatar.thumbnailUrl;
    }
  };

  return (
    <VStack w={getSizes(size).container} h={getSizes(size).container} {...containerProps}>
      {avatarIsLoading || uploading ? (
        <Box alignSelf="center" justifyContent="center" size={getSizes(size).image}>
          <Spinner />
        </Box>
      ) : (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
          disabled={!user || !allowEdit}
          onPress={onUploadButtonClick}>
          <AvatarWithDefault
            source={{ uri: getImageUrl() || undefined }}
            size={size}
            bgColor="gray.200"
            {...props}>
            <Image
              size={getSizes(size).image}
              source={require('./assets/image-person.png')}
              alt="profile"
              {...defaultImageProps}
            />
          </AvatarWithDefault>
        </Pressable>
      )}
      {user && allowEdit && !avatarIsLoading && (
        <Box position="absolute" bottom={0} right={0}>
          <SvgIcon
            icon={CameraIconSvg}
            width={getSizes(size).button}
            height={getSizes(size).button}
          />
        </Box>
      )}
    </VStack>
  );
};
