// setup-tests.js

// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

const originalLog = global.console;
const logBlacklist = /sentry|warning|deprecated/i;

global.console = {
  log: (...args) => {
    if (logBlacklist.test(args[0])) {
      return jest.fn();
    } else {
      originalLog.log(...args);
    }
  },
  debug: (...args) => {
    originalLog.debug(...args);
    // Your code
  },
  info: (...args) => {
    originalLog.info(...args);
    // Your code
  },
  warn: (...args) => {
    if (logBlacklist.test(args[0])) {
      return jest.fn();
    } else {
      originalLog.warn(...args);
    }
  },
  error: (...args) => {
    if (logBlacklist.test(args[0])) {
      return jest.fn();
    } else {
      originalLog.error(...args);
    }
  },
};

jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('rn-fetch-blob', () => ({
  fs: {
    dirs: {
      CacheDir: './',
    },
    unlink: jest.fn(),
  },
  config: () => ({
    fetch: jest.fn(),
  }),
}));

jest.mock('react-device-detect', () => ({
  isMobile: false,
}));

jest.mock('@expo-google-fonts/open-sans', () => ({
  useFonts: () => [true],
}));

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@expo/vector-icons', () => {
  const { View, Platform } = require('react-native');
  return {
    SimpleLineIcons: View,
    Ionicons: View,
    Entypo: View,
  };
});

jest.mock('../src/clients/apollo', () => ({
  getApolloClient: jest.fn(),
}));

export const mockedUseNavigation = {
  navigate: jest.fn(),
  setOptions: jest.fn(),
};

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  //Mock the default export and named export 'foo'
  return {
    ...originalModule,
    useNavigation: () => mockedUseNavigation,
    useRoute: jest.fn(),
  };
});

jest.mock('../src/hooks/useThemedToast', () => ({
  useThemedToast: jest.fn().mockReturnValue({
    show: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  }),
}));
