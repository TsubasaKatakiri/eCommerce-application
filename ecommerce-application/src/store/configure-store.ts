import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { authSlice } from './auth-slice';
import userReducer, { userSlice } from './user-slice';
import toastReducer, { toastSlice } from './toast-slice';

export interface RootState {
  [authSlice.name]: ReturnType<typeof authReducer>;
  [userSlice.name]: ReturnType<typeof userReducer>;
  [toastSlice.name]: ReturnType<typeof toastReducer>;
}

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
  [userSlice.name]: userReducer,
  [toastSlice.name]: toastReducer,
});

export type ApplicationState = RootState;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
