import * as TestingLibraryReact from '@testing-library/react';
import * as TestingLibraryReactNative from '@testing-library/react-native';

export default {
  ...TestingLibraryReactNative,
  ...TestingLibraryReact,
};

export let act: any;
export let cleanup: any;
export let configure: any;
export let fireEvent: any;
export let userEvent: any;
export let getDefaultNormalizer: any;
export let getQueriesForElement: any;
export let isInaccessible: any;
export let render: any;
export let screen: any;
export let waitFor: any;
export let waitForElementToBeRemoved: any;
export let within: any;
export let renderHook: any;
export let clickOrPress: any;
export let changeText: any;
export let getInputValue: any;
