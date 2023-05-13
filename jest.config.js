// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'ios',
      preset: 'jest-expo/ios',
      transformIgnorePatterns: [
        `node_modules/(
        ?!((jest-)?react-native|
        @react-native(-community)?)|
        expo(nent)?|
        @expo(nent)?/.*|
        @expo-google-fonts/.*|
        react-navigation|
        @react-navigation/.*|
        @unimodules/.*|
        unimodules|
        sentry-expo|
        native-base|
        react-native-svg|
        @sentry|
        @sentry/.*|
        i18n-js|
        rn-fetch-blob
      )`,
      ],
      setupFilesAfterEnv: ['<rootDir>/tests/setup-tests.js'],
    },
    {
      displayName: 'android',
      preset: 'jest-expo/android',
      transformIgnorePatterns: [
        `node_modules/(
        ?!((jest-)?react-native|
        @react-native(-community)?)|
        expo(nent)?|
        @expo(nent)?/.*|
        @expo-google-fonts/.*|
        react-navigation|
        @react-navigation/.*|
        @unimodules/.*|
        unimodules|
        sentry-expo|
        native-base|
        react-native-svg|
        @sentry|
        @sentry/.*|
        i18n-js|
        rn-fetch-blob
      )`,
      ],
      setupFilesAfterEnv: ['<rootDir>/tests/setup-tests.js'],
    },
    {
      displayName: 'web',
      preset: 'jest-expo/web',
      transformIgnorePatterns: [
        `node_modules/(
        ?!((jest-)?react-native|
        @react-native(-community)?)|
        expo(nent)?|
        @expo(nent)?/.*|
        @expo-google-fonts/.*|
        react-navigation|
        @react-navigation/.*|
        @unimodules/.*|
        unimodules|
        sentry-expo|
        native-base|
        react-native-svg|
        @sentry|
        @sentry/.*|
        i18n-js|
        rn-fetch-blob
      )`,
      ],
      setupFilesAfterEnv: ['<rootDir>/tests/setup-tests.js'],
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/tests/export-mock.js',
        '\\.(css|less)$': '<rootDir>/tests/export-mock.js',
      },
    },
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
