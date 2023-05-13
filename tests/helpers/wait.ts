import { act } from './universal';

export const wait = async (ms = 1) => {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
};
