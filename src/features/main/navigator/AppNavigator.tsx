import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { AppContent } from '..';
import { AuthEmailNavigator, AuthPhoneNumberNavigator } from '../../auth';
import { AuthContext } from '../../auth/context';
import { SideMenuProvider } from '../../home/navigation/context/SidemenuContext';
import { Loading } from '../../loading';

enum LoginType {
  PhoneNumber,
  Email,
}

const LOGIN_TYPE: LoginType = LoginType.Email;

export const AppNavigator: React.FC = () => {
  const { isSignedIn, userLoading } = useContext(AuthContext);

  const linking = {
    prefixes: ['https://app.saasstartuppack.com', 'saasstartuppack://'],
  };

  const linkingAuth = {
    ...linking,
    config: {
      screens: {
        Splash: '/',
        SignUp: 'sign_up',
        SignIn: 'sign_in',
        ForgotPassword: 'forgot_password',
        // 'Not found': '*',
      },
    },
  };

  const linkingMain = {
    ...linking,
    config: {
      screens: {
        SetupWizard: 'setup',
        Welcome: 'welcome',
        'Edit account': 'edit_account',
        'Create session': 'create_session',
        Room: ':uuid',
        // 'Not found': '*',
      },
    },
  };

  return userLoading ? (
    <Loading />
  ) : isSignedIn ? (
    <SideMenuProvider>
      <NavigationContainer linking={linkingMain} fallback={<Loading />}>
        <AppContent />
      </NavigationContainer>
    </SideMenuProvider>
  ) : (
    <NavigationContainer linking={linkingAuth}>
      {/* @ts-ignore */}
      {LOGIN_TYPE === LoginType.PhoneNumber && <AuthPhoneNumberNavigator />}
      {LOGIN_TYPE === LoginType.Email && <AuthEmailNavigator />}
    </NavigationContainer>
  );
};
