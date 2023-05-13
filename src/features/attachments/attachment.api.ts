import { getApolloClient } from '../../clients/apollo';
import {
  CreateAttachmentDocument,
  CreateAttachmentMutation,
  CreateAttachmentMutationVariables,
  DestroyAttachmentDocument,
  DestroyAttachmentMutation,
  DestroyAttachmentMutationVariables,
} from '../../generated/graphql';

export const createAttachment = async (variables: CreateAttachmentMutationVariables) => {
  const apolloClient = await getApolloClient();

  const result = await apolloClient.mutate<
    CreateAttachmentMutation,
    CreateAttachmentMutationVariables
  >({
    fetchPolicy: 'no-cache',
    mutation: CreateAttachmentDocument,
    variables,
  });

  return result?.data?.create_attachment;
};

export const destroyAttachment = async (variables: DestroyAttachmentMutationVariables) => {
  const apolloClient = await getApolloClient();

  const result = await apolloClient.mutate<
    DestroyAttachmentMutation,
    DestroyAttachmentMutationVariables
  >({
    fetchPolicy: 'no-cache',
    mutation: DestroyAttachmentDocument,
    variables,
  });

  return result?.data?.destroy_attachment;
};
