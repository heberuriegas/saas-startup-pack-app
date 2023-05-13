import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { camelizeKeys } from 'humps';
import React, { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Sentry } from '../../../helpers/sentry';
import { useThemedToast } from '../../../hooks/useThemedToast';
import { User } from '../../user';
import {
  forgotPasswordApi,
  meApi,
  sendOtpApi,
  signInByAssertionApi,
  signInByEmailApi,
  signInByPhoneNumberApi,
  signOutApi,
  signUpByEmailApi,
  signUpByPhoneNumberApi,
  updateUserApi,
} from '../../user/user.api';
import {
  AuthContextData,
  OAuthCredentials,
  SignInByAssertion,
  SignInByEmail,
  SignInByOAuth2,
  SignInByPhoneNumber,
  SignOut,
  SignUpByEmail,
  UpdateUser,
} from '../types';
import { setDevice, unsetDevice } from './AuthContext.helpers';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
WebBrowser.maybeCompleteAuthSession();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [setupIsLoading, setSetupIsLoading] = useState<boolean>(true);
  const [oauth2IsLoading, ] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<OAuthCredentials>();

  const toast = useThemedToast();

  const saveCredentials = async (credentials: OAuthCredentials) => {
    setCredentials(credentials);
    return AsyncStorage.setItem('credentials', JSON.stringify(credentials));
  };

  const getCurrentUser = async () => {
    setUserLoading(true);
    const me = await reloadCurrentUser();
    setUserLoading(false);
    setSetupIsLoading(false);
    return me;
  };

  const reloadCurrentUser = async () => {
    try {
      const me = await meApi();
      if (me) {
        setCurrentUser(me);
        setIsSignedIn(true);
      }
      return me;
    } catch (err: any) {
      Sentry.captureMessage(err);
    }
  };

  const refreshUser = async () => {
    const user = await meApi();
    if (user) {
      setCurrentUser(user);
    }
  };

  useEffect(() => {
    (async () => {
      const credentialsString = await AsyncStorage.getItem('credentials');
      if (credentialsString) {
        const credentials = JSON.parse(credentialsString) as OAuthCredentials;
        setCredentials(credentials);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const displayName =
        currentUser.name || currentUser.username || currentUser.email || currentUser.phoneNumber;

      setDisplayName(displayName || '');
      if (Platform.OS === 'android' || Platform.OS === 'ios') setDevice(currentUser.id);
    } else {
      setDisplayName('');
    }
  }, [currentUser]);

  useEffect(() => {
    const setCurrentUserlistener = EventRegister.addEventListener('unauthenticate', () => {
      setCurrentUser(undefined);
    });
    const saveCredentialsListener = EventRegister.addEventListener(
      'save-credentials',
      (credentials) => {
        saveCredentials(credentials);
      }
    );
    return () => {
      EventRegister.removeEventListener(setCurrentUserlistener as string);
      EventRegister.removeEventListener(saveCredentialsListener as string);
    };
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.getItem('credentials').then((credentials) => {
        if (credentials) {
          getCurrentUser();
        } else {
          setSetupIsLoading(false);
        }
      });
    } catch (err: any) {
      Sentry.captureMessage(err);
      setCurrentUser(undefined);
    }
  }, []);

  useEffect(() => {
    setIsSignedIn(Boolean(currentUser));
  }, [currentUser]);

  const signUpByEmail: SignUpByEmail = async (signUpData) => {
    const { user, credentials } = await signUpByEmailApi(signUpData);

    if (credentials && credentials.accessToken) {
      await saveCredentials(credentials);
      if (user) {
        setCurrentUser(user);
      }
    } else {
      toast.show({
        description:
          'Please confirm your email address by clicking on the link in the confirmation email sent to your account.',
      });
    }
  };

  const signInByEmail: SignInByEmail = async ({ email, password }) => {
    const credentials = await signInByEmailApi({ email, password });
    await saveCredentials(credentials);
    await getCurrentUser();
  };

  const forgotPassword = forgotPasswordApi;

  const signUpByPhoneNumber = signUpByPhoneNumberApi;

  const sendOtp = sendOtpApi;

  const signInByPhoneNumber: SignInByPhoneNumber = async ({ phoneNumber, otpCode }) => {
    const loginData = await signInByPhoneNumberApi({ phoneNumber, otpCode });

    await saveCredentials(loginData);
    await getCurrentUser();
  };

  const signInByAssertion: SignInByAssertion = async ({ provider, assertion }) => {
    const loginData = await signInByAssertionApi({ provider, assertion });
    await saveCredentials(loginData);
    await getCurrentUser();
  };

  const signInByOAuth2: SignInByOAuth2 = async (authState) => {
    const expiresIn = Math.floor(
      (Date.parse(authState.accessTokenExpirationDate) - new Date().getTime()) / 1000
    );
    const credentials = {
      accessToken: authState.accessToken,
      tokenType: authState.tokenType,
      expiresIn,
      refreshToken: authState.refreshToken,
      scope: authState.scopes,
      createdAt: Date.parse(authState.tokenAdditionalParameters.created_at),
    };

    await saveCredentials(credentials);
    await getCurrentUser();
  };

  // Remove data from context, so the App can be notified and send the user to the AuthStack
  const signOut: SignOut = async () => {
    const credentialsString = await AsyncStorage.getItem('credentials');
    if (credentialsString) {
      const _credentials: OAuthCredentials = JSON.parse(credentialsString);
      if ((Platform.OS === 'android' || Platform.OS === 'ios') && currentUser)
        await unsetDevice(currentUser.id);
      await signOutApi(_credentials.accessToken);
    }
    await AsyncStorage.removeItem('credentials');
    setCurrentUser(undefined);
  };

  const updateUser: UpdateUser = useCallback(
    async (user) => {
      if (currentUser) {
        await updateUserApi(user);

        const newUser = { ...currentUser, ...camelizeKeys(user) };
        setCurrentUser(newUser);

        return newUser;
      }
    },
    [currentUser]
  );

  // const [, googleResponse, googleSignIn] = Google.useAuthRequest({
  //   expoClientId: GOOGLE_EXPO_CLIENT_ID,
  //   iosClientId: GOOGLE_IOS_CLIENT_ID,
  //   androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  //   webClientId: GOOGLE_WEB_CLIENT_ID,
  // });

  // const [, facebookResponse, facebookSignIn] = Facebook.useAuthRequest({
  //   expoClientId: FACEBOOK_CLIENT_ID,
  //   androidClientId: FACEBOOK_CLIENT_ID,
  //   iosClientId: FACEBOOK_CLIENT_ID,
  //   webClientId: FACEBOOK_CLIENT_ID,
  // });

  // const githubDiscovery = {
  //   authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  //   tokenEndpoint: 'https://github.com/login/oauth/access_token',
  //   revocationEndpoint: `https://github.com/settings/connections/applications/${Config.GITHUB_CLIENT_ID}`,
  // };

  // const [, githubResponse, githubSignIn] = useAuthRequest(
  //   {
  //     clientId: Config.GITHUB_CLIENT_ID,
  //     scopes: ['identity'],
  //     redirectUri: makeRedirectUri(),
  //   },
  //   githubDiscovery
  // );

  // Sign in by assertion effects
  // useEffect(() => {
  //   (async () => {
  //     let provider = null;
  //     try {
  //       let accessToken = null;

  //       // if (googleResponse?.type === 'success') {
  //       //   const { authentication } = googleResponse;
  //       //   accessToken = authentication?.accessToken;
  //       //   provider = 'google';
  //       // } else if (facebookResponse?.type === 'success') {
  //       //   const { authentication } = facebookResponse;
  //       //   accessToken = authentication?.accessToken;
  //       //   provider = 'facebook';
  //       // } else
  //       if (githubResponse?.type === 'success') {
  //         accessToken = githubResponse?.params?.code;
  //         provider = 'github';
  //       }

  //       if (accessToken && provider) {
  //         setOauth2IsLoading(true);
  //         await signInByAssertion({
  //           provider,
  //           assertion: accessToken,
  //         });
  //       }
  //     } catch (err: any) {
  //       Sentry.captureMessage(err);
  //       toast.error({
  //         description: `we cannot login with your ${
  //           provider || 'oauth'
  //         } account, please try another method.`,
  //       });
  //     } finally {
  //       setOauth2IsLoading(false);
  //     }
  //   })();
  // }, [githubResponse]);
  // }, []);

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <AuthContext.Provider
      value={{
        isSignedIn,
        currentUser,
        credentials,
        displayName,
        refreshUser,
        setCurrentUser,
        reloadCurrentUser,
        userLoading: setupIsLoading || userLoading || oauth2IsLoading,
        signUpByEmail,
        signInByEmail,
        signUpByPhoneNumber,
        sendOtp,
        signInByPhoneNumber,
        forgotPassword,
        signInByAssertion,
        signInByOAuth2,
        signOut,
        updateUser,
        // googleSignIn,
        // facebookSignIn,
        // githubSignIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
