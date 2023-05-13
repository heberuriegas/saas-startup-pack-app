export const Config = {
  ENV: process.env.ENV ?? 'development',
  API_URL: process.env.API_URL ?? 'http://localhost:8080/v1/graphql',
  AUTH_URL: process.env.AUTH_URL ?? 'http://localhost:3000',
  AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID ?? '',
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? '',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? '',
  GOOGLE_EXPO_CLIENT_ID: process.env.GOOGLE_EXPO_CLIENT_ID ?? '',
  GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID ?? '',
  GOOGLE_ANDROID_CLIENT_ID: process.env.GOOGLE_ANDROID_CLIENT_ID ?? '',
  GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID ?? '',
  SENTRY_DSN: process.env.SENTRY_DSN ?? '',
  DAILY_API_KEY: process.env.DAILY_API_KEY ?? '',
};
