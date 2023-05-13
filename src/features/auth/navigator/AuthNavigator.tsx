import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NotFoundScreen } from '../../notFound/NotFoundScreen';
import {
  SignInByEmailScreen,
  SignInByPhoneNumberScreen,
  SignUpByEmailScreen,
  SignUpByPhoneNumberScreen,
} from '../screens';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { SplashScreen } from '../screens/Splash';

export type AuthEmailStackParams = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  'Not found': undefined;
};

const StackEmail = createStackNavigator<AuthEmailStackParams>();

export const AuthEmailNavigator: React.FC = () => {
  return (
    <StackEmail.Navigator>
      <StackEmail.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <StackEmail.Screen
        name="SignUp"
        component={SignUpByEmailScreen}
        options={{ headerShown: false }}
      />
      <StackEmail.Screen
        name="SignIn"
        component={SignInByEmailScreen}
        options={{ headerShown: false }}
      />
      <StackEmail.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <StackEmail.Screen
        name="Not found"
        component={NotFoundScreen}
        options={{ headerShown: false }}
      />
    </StackEmail.Navigator>
  );
};

export type AuthPhoneNumberStackParams = {
  SignUp: undefined;
  SignIn: {
    phoneNumber: string;
  };
  'Not found': undefined;
};

const StackPhoneNumber = createStackNavigator<AuthPhoneNumberStackParams>();

export const AuthPhoneNumberNavigator: React.FC = () => {
  return (
    <StackPhoneNumber.Navigator>
      <StackPhoneNumber.Screen
        name="SignUp"
        component={SignUpByPhoneNumberScreen}
        options={{ headerShown: false }}
      />
      <StackPhoneNumber.Screen
        name="SignIn"
        component={SignInByPhoneNumberScreen}
        options={{ headerShown: false }}
      />
      <StackPhoneNumber.Screen
        name="Not found"
        component={NotFoundScreen}
        options={{ headerShown: false }}
      />
    </StackPhoneNumber.Navigator>
  );
};
