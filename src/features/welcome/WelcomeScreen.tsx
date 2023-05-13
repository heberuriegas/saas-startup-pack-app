import { Text } from 'native-base';
import React from 'react';
import { DashboardLayout } from '../../layouts';
import { HomeScreenProps } from '../home/navigation/HomeNavigator';

export type WelcomeScreenProps = HomeScreenProps<'Welcome'>;

export const WelcomeScreen = (props: WelcomeScreenProps) => {
  return (
    <DashboardLayout
      title="Welcome"
      displayMenuButton
      displayScreenTitle={false}
      displayAlternateMobileHeader
      rightPanelMobileHeader>
      <Text>Welcome !</Text>
    </DashboardLayout>
  );
};
