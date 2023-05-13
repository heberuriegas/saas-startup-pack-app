import { ApolloProvider } from '@apollo/client';
import { NativeBaseProvider, View, theme as defaultNbTheme, extendTheme } from 'native-base';
import React from 'react';
import {
  Provider as PaperProvider,
  configureFonts,
  MD3LightTheme as defaultNpTheme,
} from 'react-native-paper';
import * as Sentry from 'sentry-expo';
import { Config } from './src/config';
import { AuthProvider } from './src/features/auth/context';
import { I18nProvider } from './src/features/i18n';
import { AppNavigator } from './src/features/main/navigator';
import { registerForPushNotificationsAsync } from './src/helpers/pushNotifications';
import { useAppIsReady } from './src/hooks/useAppIsReady';

Sentry.init({
  dsn: Config.SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: Config.ENV === 'development',
});

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

export default function App() {
  const [appIsReady, { apolloClient, onLayoutRootView }] = useAppIsReady();

  if (!appIsReady || !apolloClient) {
    return null;
  }

  registerForPushNotificationsAsync();

  return (
    <I18nProvider>
      <ApolloProvider client={apolloClient}>
        <NativeBaseProvider
          theme={nbTheme}
          initialWindowMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}>
          <PaperProvider theme={npTheme}>
            {/* <Provider store={store}> */}
            <View testID="app" flex={1} onLayout={onLayoutRootView}>
              <AuthProvider>
                <AppNavigator />
              </AuthProvider>
            </View>
            {/* </Provider> */}
          </PaperProvider>
        </NativeBaseProvider>
      </ApolloProvider>
    </I18nProvider>
  );
}
