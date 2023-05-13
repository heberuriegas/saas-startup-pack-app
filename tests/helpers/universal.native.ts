import { fireEvent } from '@testing-library/react-native';
export * from '@testing-library/react-native';

export const clickOrPress = fireEvent.press;
export const changeText = fireEvent.changeText;
export const getInputValue = (inputEl: any): string => inputEl.props?.value;
