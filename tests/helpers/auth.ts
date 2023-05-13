import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

export const setCredentials = async () =>
  AsyncStorage.setItem(
    'credentials',
    '{"accessToken":"d_BT4auOtpZNoUz-uEeQCzOhBS4nbsShl1PjflvYlu8","tokenType":"Bearer","expiresIn":7200,"refreshToken":"-0jKL80BrJvs7RXuKVfcgc2vngcOARswA4jxowq00t4","scope":"read","createdAt":1673217768}'
  );
