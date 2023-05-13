import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { NativeBaseProvider, theme as defaultNbTheme, extendTheme } from 'native-base';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  Provider as PaperProvider,
  configureFonts,
  MD3LightTheme as defaultNpTheme,
} from 'react-native-paper';
import { AuthProvider } from '../../src/features/auth/context';
import { I18nProvider } from '../../src/features/i18n';
import { PreloadState } from '../../store';
import { getApolloCache, mockLink } from '../helpers/apollo';
import { setCredentials } from '../helpers/auth';

const nbTheme = extendTheme({
  fonts: {
    heading: 'OpenSans_600SemiBold',
    body: 'OpenSans_400Regular',
    mono: 'OpenSans_400Regular',
  },
  colors: {
    primary: defaultNbTheme.colors.violet,
  },
});

const npTheme = {
  ...defaultNpTheme,
  fonts: configureFonts({
    config: {
      fontFamily: 'OpenSans_400Regular',
    },
  }),
  colors: {
    ...defaultNpTheme.colors,
    primary: defaultNbTheme.colors.primary['500'],
    secondary: defaultNbTheme.colors.secondary['500'],
  },
};

interface TestProviderProps {
  children: ReactNode;
  mocks?: readonly MockedResponse<Record<string, any>>[] | undefined;
  preloadedState?: PreloadState;
}

export const TestProvider: React.FC<TestProviderProps> = ({ mocks, preloadedState, children }) => {
  const [authLoaded, setAuthLoaded] = useState<boolean>(false);

  // const store = createStore({ preloadedState });

  useEffect(() => {
    (async () => {
      await setCredentials();
      setAuthLoaded(true);
    })();
  }, []);

  return authLoaded ? (
    <I18nProvider>
      <MockedProvider
        mocks={mocks}
        link={mockLink(mocks || [])}
        cache={getApolloCache()}
        addTypename={false}>
        <NativeBaseProvider
          theme={nbTheme}
          initialWindowMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}>
          <PaperProvider theme={npTheme}>
            {/* <Provider store={store}> */}
            <AuthProvider>{children}</AuthProvider>
            {/* </Provider> */}
          </PaperProvider>
        </NativeBaseProvider>
      </MockedProvider>
    </I18nProvider>
  ) : null;
};
