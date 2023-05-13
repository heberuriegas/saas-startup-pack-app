import { MockedResponse } from '@apollo/client/testing';
import { usersFactory } from '../../../../../tests/factories/users.factory';
import { MeDocument } from '../../../../generated/graphql';
import { User } from '../../types';

type MeMock = (currentUser?: User) => MockedResponse<Record<string, any>>;

export const meMock: MeMock = (currentUser) => ({
  request: {
    query: MeDocument,
    variables: {},
  },
  result: jest.fn().mockReturnValue({
    data: {
      me: currentUser || usersFactory.build(),
    },
  }),
});
