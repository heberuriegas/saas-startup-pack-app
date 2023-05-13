import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DashboardLayout } from '../../layouts';
import { HomeScreenProps } from '../home/navigation/HomeNavigator';
import { EditAccountForm } from './components';

export type EditAccountScreenProps = HomeScreenProps<'Edit account'>;

export const EditAccountScreen = (props: EditAccountScreenProps) => {
  return (
    <DashboardLayout title="Edit account">
      <KeyboardAwareScrollView bounces={false}>
        <EditAccountForm />
      </KeyboardAwareScrollView>
    </DashboardLayout>
  );
};
