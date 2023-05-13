import { FormControl, useColorModeValue, VStack, WarningOutlineIcon } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React from 'react';
import { FloatingLabelDatePicker, FloatingLabelDatePickerProps } from './FloatingLabelDatePicker';

export interface FormDatePickerProps extends IVStackProps {
  label: string;
  editable?: boolean;
  errorMessage?: string;
  inputProps?: FloatingLabelDatePickerProps;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  editable = true,
  errorMessage,
  inputProps = {},
  ...containerProps
}): React.ReactElement => {
  const labelBgColor = useColorModeValue('#fff', '#1f2937');

  return (
    <VStack {...containerProps}>
      <FormControl isInvalid={Boolean(errorMessage) && editable}>
        <FloatingLabelDatePicker
          labelColor="#9ca3af"
          labelBGColor={labelBgColor}
          label={label}
          isDisabled={!editable}
          borderRadius="4"
          _dark={{
            borderColor: 'coolGray.700',
          }}
          _light={{
            borderColor: 'coolGray.300',
          }}
          {...inputProps}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
};
