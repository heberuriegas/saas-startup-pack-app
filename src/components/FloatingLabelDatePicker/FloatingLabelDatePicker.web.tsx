import { Box, IInputProps, Input } from 'native-base';
import React, { MutableRefObject, useEffect } from 'react';
import { Animated, Platform } from 'react-native';
import { DatePickerType } from './FloatingLabelDatePicker.types';

export interface FloatingLabelDatePickerWebProps extends IInputProps {
  labelColor?: string;
  labelBGColor?: string;
  label?: string;
  isDisabled?: boolean;
  defaultValue?: string;
  containerWidth?: number;
  datePickerType?: DatePickerType;
}

export const FloatingLabelDatePicker: React.FC<FloatingLabelDatePickerWebProps> = ({
  labelBGColor,
  labelColor,
  defaultValue,
  containerWidth,
  label,
  datePickerType,
  ...props
}) => {
  const _animatedIsFocused = new Animated.Value(defaultValue === '' ? 0 : 1);
  const isFocused = true;

  const handleFocus = () => {
    // setIsFocused(true);
  };
  const handleBlur = () => {
    // setIsFocused(false);
  };

  useEffect(() => {
    Animated.timing(_animatedIsFocused, {
      duration: 200,
      useNativeDriver: false,
      toValue: isFocused || defaultValue !== '' ? 1 : 0,
    }).start();
  }, [isFocused]);

  return (
    <Box w={containerWidth}>
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 16,
          top: _animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [12, -7],
          }),
          zIndex: 5,
          paddingLeft: 3,
          paddingRight: 3,
          backgroundColor: labelBGColor,
        }}>
        <Animated.Text
          style={{
            fontWeight: '500',
            color: labelColor,
            fontSize:
              Platform.OS === 'android'
                ? _animatedIsFocused.interpolate({
                    inputRange: [0, 1],
                    outputRange: [14, 12],
                  })
                : _animatedIsFocused.interpolate({
                    inputRange: [0, 1],
                    outputRange: [14, 12],
                  }),

            marginTop:
              Platform.OS !== 'android'
                ? _animatedIsFocused.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-3, 0],
                  })
                : undefined,
          }}>
          {label}
        </Animated.Text>
      </Animated.View>
      <Input
        ref={
          ((input: any) => {
            if (input)
              input.type = datePickerType === DatePickerType.DATE_TIME ? 'datetime-local' : 'date';
          }) as unknown as MutableRefObject<any>
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        _hover={{ bg: labelBGColor }}
        {...props}
      />
    </Box>
  );
};
