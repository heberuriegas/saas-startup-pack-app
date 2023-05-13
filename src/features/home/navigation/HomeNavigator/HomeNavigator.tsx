import {
  DrawerNavigationOptions,
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { useColorModeValue, useTheme } from 'native-base';
import React, { useContext } from 'react';

import { LogBox } from 'react-native';
import { NotFoundScreen } from '../../../notFound/NotFoundScreen';
import { EditAccountScreen } from '../../../user';
import { WelcomeScreen } from '../../../welcome';
import { HeaderRightMenu } from '../HeaderRightMenu';
import { HomeDrawer } from '../HomeDrawer';
import { WebHeaderTitle } from '../components/WebHeaderTitle';
import { SideMenuContext } from '../context/SidemenuContext';
import { HomeNavigatorStack } from './components/HomeNavigatorStack.web';

export type HomeDrawerParams = {
  SetupWizard: undefined;
  Welcome: object;
  'Edit account': undefined;
  'Create session': undefined;
  Room: {
    uuid: string;
  };
  'Not found': undefined;
};

export type HomeScreenNavProps =
  | DrawerScreenProps<HomeDrawerParams>
  | StackScreenProps<HomeDrawerParams>;

export type HomeScreenProps<V extends keyof HomeDrawerParams> =
  | DrawerScreenProps<HomeDrawerParams, V>
  | StackScreenProps<HomeDrawerParams, V>;

const Drawer = createDrawerNavigator<HomeDrawerParams>();

const HomeHeaderRightMenu = () => <HeaderRightMenu hideSearchBar />;

export const HomeNavigator = () => {
  const { colors } = useTheme();
  const stackHeaderBgColor = useColorModeValue(colors.white[900], colors.blueGray[800]);
  const drawerHeaderBgColor = useColorModeValue(colors.primary[900], colors.blueGray[800]);
  const headerTintColor = colors.coolGray[50];
  const { isLargeScreen } = useContext(SideMenuContext);

  const stackScreenOptions: StackNavigationOptions = {
    headerTitle: WebHeaderTitle,
    headerRight: HomeHeaderRightMenu,
    headerStyle: {
      backgroundColor: stackHeaderBgColor,
    },
    headerTintColor,
  };

  const drawerScreenOptions: DrawerNavigationOptions = {
    swipeEnabled: true,
    headerRight: HomeHeaderRightMenu,
    headerStyle: {
      backgroundColor: drawerHeaderBgColor,
    },
    headerTintColor,
  };

  if (isLargeScreen) {
    drawerScreenOptions['drawerType'] = 'permanent';
    drawerScreenOptions['overlayColor'] = 'transparent';
    stackScreenOptions['headerLeft'] = () => null;
  }

  return HomeNavigatorStack ? (
    <HomeNavigatorStack.Navigator screenOptions={stackScreenOptions}>
      <HomeNavigatorStack.Screen key="Welcome" name="Welcome" component={WelcomeScreen} />
      <HomeNavigatorStack.Screen
        key="Edit account"
        name="Edit account"
        component={EditAccountScreen}
      />
      <HomeNavigatorStack.Screen key="Not found" name="Not found" component={NotFoundScreen} />
    </HomeNavigatorStack.Navigator>
  ) : (
    <Drawer.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={(props) => <HomeDrawer {...props} />}>
      <Drawer.Screen key="Welcome" name="Welcome" component={WelcomeScreen} />
      <Drawer.Screen key="Edit account" name="Edit account" component={EditAccountScreen} />
      <Drawer.Screen key="Not found" name="Not found" component={NotFoundScreen} />
    </Drawer.Navigator>
  );
};

LogBox.ignoreLogs(['Accessing the state']);
