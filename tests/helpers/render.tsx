import { MockedResponse } from '@apollo/client/testing';
import React from 'react';
import { Platform } from 'react-native';
import { User } from '../../src/features/user';
import { TestProvider } from '../components/TestProvider';
import { buildAuthMocks, mockApolloClient } from './apollo';
import { act, render, waitFor } from './universal';

interface AuthRenderWithProvidersOptions {
  mocks?: MockedResponse<Record<string, any>>[];
  currentUser?: User;
  skipAuthWait?: boolean;
}

type AuthRenderWithProviders = (
  component: React.ReactElement,
  options?: AuthRenderWithProvidersOptions
) => Promise<void>;

export const renderWithProviders: AuthRenderWithProviders = async (component, options) => {
  const mocks = buildAuthMocks(options?.mocks, options?.currentUser);
  mockApolloClient(mocks);
  if (Platform.OS === 'web') {
    await act(() => {
      (render as any)(<TestProvider mocks={mocks}>{component}</TestProvider>);
    });
  } else {
    (render as any)(<TestProvider mocks={mocks}>{component}</TestProvider>);
  }
  if (!options?.skipAuthWait) await waitFor(() => expect(mocks[0].result).toHaveBeenCalled());
};
