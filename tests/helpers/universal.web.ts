import { fireEvent } from '@testing-library/react';
export * from '@testing-library/react';

export const clickOrPress = fireEvent.click;
export const changeText = (inputEl: any, text: string) =>
  fireEvent.change(inputEl, { target: { value: text } });
export const getInputValue = (inputEl: any): string => inputEl.value;
