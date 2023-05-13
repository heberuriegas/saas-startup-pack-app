import {
  FormControl,
  ISelectProps,
  useColorModeValue,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React from 'react';
import { FloatingLabelSelect } from './FloatingLabelSelect';

export interface FormSelectProps extends IVStackProps {
  label: string;
  editable?: boolean;
  errorMessage?: string;
  selectProps?: ISelectProps;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  editable = true,
  errorMessage,
  selectProps,
  children,
  ...containerProps
}): React.ReactElement => {
  const labelBgColor = useColorModeValue('#fff', '#1f2937');

  return (
    <VStack {...containerProps}>
      <FormControl isInvalid={Boolean(errorMessage) && editable}>
        <FloatingLabelSelect
          labelColor="#9ca3af"
          labelBGColor={labelBgColor}
          label={label}
          isDisabled={!editable}
          borderRadius="4"
          _text={{
            fontSize: 'sm',
            fontWeight: 'medium',
          }}
          _dark={{
            borderColor: 'coolGray.700',
          }}
          _light={{
            borderColor: 'coolGray.300',
          }}
          {...selectProps}>
          {children}
        </FloatingLabelSelect>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  );
};
