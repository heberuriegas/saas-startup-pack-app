import { configureStore } from '@reduxjs/toolkit';

export interface PreloadState {}

export interface StoreProps {
  preloadedState?: PreloadState;
}

export const createStore = (props?: StoreProps) =>
  configureStore({
    reducer: {},
    preloadedState: props?.preloadedState,
  });

const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
