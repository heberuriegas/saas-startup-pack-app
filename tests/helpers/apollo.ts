import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { MockLink, MockedResponse } from '@apollo/client/testing';
import { getApolloClient } from '../../src/clients/apollo';
import { User } from '../../src/features/user';
import { meMock } from '../../src/features/user/__tests__/mocks/me.mock';

/**
 * Cache used in mocks
 */
const apolloCache = new InMemoryCache({ addTypename: false });

/**
 * Return apollo in memory cache singleton instance using in both ApolloClient and MockProvider
 * @returns {InMemoryCache}
 */
export const getApolloCache = () => {
  return apolloCache;
};

export const mockLink = (mocks: readonly MockedResponse<Record<string, any>>[]) => {
  const mockLink = new MockLink(mocks, false);
  const errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          '[GraphQL error]:' + `Message: ${message},` + `Location: ${locations},` + `Path: ${path}`
        )
      );
    }

    // if (networkError) {
    //   console.log(`[Network error]: ${networkError}`);
    // }
  });
  return ApolloLink.from([errorLoggingLink, mockLink]);
};

/**
 * It generates a mocked apollo client
 *
 * @export
 * @param {MockedResponse<Record<string, any>>[]} mocks
 * @return {ApolloClient}
 */
export const mockGetApolloClient = (allMocks: MockedResponse<Record<string, any>>[]) => {
  return new ApolloClient({
    cache: getApolloCache(),
    link: mockLink(allMocks),
  });
};

/**
 * Will mock get apollo client function to return mocks
 * @param {MockedResponse<Record<string, any>>[]} mocks
 */
export const mockApolloClient = (mocks: MockedResponse<Record<string, any>>[]) => {
  (getApolloClient as jest.Mock).mockReturnValue(mockGetApolloClient(mocks));
};

/**
 * Will build mocks adding the me query
 * @param {MockedResponse<Record<string, any>>[]} mocks
 * @return {MockedResponse<Record<string, any>>[]}
 */
export const buildAuthMocks = (
  mocks?: MockedResponse<Record<string, any>>[],
  currentUser?: User
) => {
  const allMocks: MockedResponse<Record<string, any>>[] = [];
  allMocks.push(currentUser ? meMock(currentUser) : meMock());
  if (mocks) mocks.forEach((mock) => allMocks.push(mock));
  return allMocks;
};
