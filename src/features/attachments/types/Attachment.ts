import { CreateAttachmentMutation } from '../../../generated/graphql';

export interface Attachment extends NonNullable<CreateAttachmentMutation['create_attachment']> {
  __typename?: any;
}
