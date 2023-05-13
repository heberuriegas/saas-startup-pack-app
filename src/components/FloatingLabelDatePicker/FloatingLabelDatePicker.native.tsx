import { Entypo } from '@expo/vector-icons';
import DateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import { format, parse, setHours, setMinutes } from 'date-fns';
import IMask from 'imask';
import { Box, Icon, IconButton, IInputProps, Input, Text, View } from 'native-base';
import React, { useMemo, useState } from 'react';
import { Platform } from 'react-native';

const handleMaskedChange =
  (callback: (value: string) => void, mask: IMask.MaskedPattern) => (value: string) => {
    callback(mask.resolve(value));
  };

export enum DatePickerType {
  DATE,
  DATE_TIME,
}

export interface FloatingLabelDatePickerNativeProps extends IInputProps {
  labelColor?: string;
  labelBGColor?: string;
  label?: string;
  isDisabled?: boolean;
  defaultValue?: string;
  containerWidth?: number;
  datePickerType?: DatePickerType;
  dateTimePickerProps?: IOSNativeProps | AndroidNativeProps;
}

export const FloatingLabelDatePicker: React.FC<FloatingLabelDatePickerNativeProps> = ({
  labelBGColor,
  labelColor,
  defaultValue,
  containerWidth,
  label,
  datePickerType,
  dateTimePickerProps,
  onChangeText,
  ...inputProps
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAndroidTimePicker, setShowAndroidTimePicker] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const valueFormat =
    datePickerType === DatePickerType.DATE_TIME ? 'yyyy/MM/dd HH:mm' : 'yyyy/MM/dd';
  const dateMask = IMask.createMask({
    mask: datePickerType === DatePickerType.DATE_TIME ? '00/00/0000, 00:00' : '00/00/0000',
  });

  const valueInDate = useMemo(() => {
    const date = value ? parse(value, valueFormat, new Date()) : new Date();
    return date;
  }, [value]);

  return (
    <Box w={containerWidth}>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 16,
          top: -7,
          zIndex: 5,
          paddingLeft: 3,
          paddingRight: 3,
          backgroundColor: labelBGColor,
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: labelColor,
            fontSize: 12,
            marginTop: Platform.OS !== 'android' ? 0 : undefined,
          }}>
          {label}
        </Text>
      </View>
      <Input
        _hover={{ bg: labelBGColor }}
        rightElement={
          <IconButton
            icon={<Icon as={Entypo} name="calendar" onPress={() => setShowDatePicker(true)} />}
          />
        }
        {...inputProps}
        value={value}
        onChangeText={handleMaskedChange((v) => {
          setValue(v);
          if (onChangeText) onChangeText(v);
        }, dateMask)}
        placeholder={valueFormat.toLowerCase()}
      />
      {showDatePicker && (
        <DateTimePicker
          mode={
            datePickerType === DatePickerType.DATE_TIME && Platform.OS === 'ios'
              ? 'datetime'
              : 'date'
          }
          value={valueInDate}
          onChange={(v) => {
            if (v?.nativeEvent?.timestamp && onChangeText) {
              const _value = format(new Date(v.nativeEvent.timestamp), valueFormat);
              setValue(_value);
              setShowDatePicker(false);

              if (datePickerType === DatePickerType.DATE_TIME && Platform.OS === 'android') {
                setShowAndroidTimePicker(true);
              } else {
                onChangeText(_value);
              }
            }
          }}
          {...dateTimePickerProps}
        />
      )}
      {showAndroidTimePicker && (
        <DateTimePicker
          mode="time"
          value={valueInDate}
          onChange={(v) => {
            if (v?.nativeEvent?.timestamp && onChangeText) {
              const hours = format(new Date(v.nativeEvent.timestamp), 'HH');
              const minutes = format(new Date(v.nativeEvent.timestamp), 'mm');

              setValue((value) => {
                if (value) {
                  let date = parse(value, valueFormat, new Date());

                  date = setHours(date, Number(hours));
                  date = setMinutes(date, Number(minutes));

                  return format(date, valueFormat);
                } else {
                  return value;
                }
              });
              setShowAndroidTimePicker(false);
              if (value) onChangeText(value);
            }
          }}
          {...dateTimePickerProps}
        />
      )}
    </Box>
  );
};
