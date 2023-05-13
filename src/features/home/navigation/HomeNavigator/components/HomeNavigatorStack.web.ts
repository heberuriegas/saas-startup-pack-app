import { createStackNavigator } from '@react-navigation/stack';
import { isMobile } from 'react-device-detect';
import { Platform } from 'react-native';
import { HomeDrawerParams } from '../HomeNavigator';

export const HomeNavigatorStack =
  Platform.OS === 'web' && !isMobile ? createStackNavigator<HomeDrawerParams>() : null;
