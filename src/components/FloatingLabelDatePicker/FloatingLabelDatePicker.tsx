import React from 'react';
import { FloatingLabelDatePickerNativeProps } from './FloatingLabelDatePicker.native';
import { FloatingLabelDatePickerWebProps } from './FloatingLabelDatePicker.web';

export type FloatingLabelDatePickerProps =
  | FloatingLabelDatePickerWebProps
  | FloatingLabelDatePickerNativeProps;

export const FloatingLabelDatePicker: React.FC<FloatingLabelDatePickerProps> = () => <></>;
