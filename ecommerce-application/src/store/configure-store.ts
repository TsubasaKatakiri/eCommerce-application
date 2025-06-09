import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { authSlice } from './auth-slice';
import userReducer, { userSlice } from './user-slice';
import toastReducer, { toastSlice } from './toast-slice';
import productReducer, { productSlice } from './product-slice';

export interface RootState {
  [authSlice.name]: ReturnType<typeof authReducer>;
  [userSlice.name]: ReturnType<typeof userReducer>;
  [toastSlice.name]: ReturnType<typeof toastReducer>;
  [productSlice.name]: ReturnType<typeof productReducer>;
}

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
  [userSlice.name]: userReducer,
  [toastSlice.name]: toastReducer,
  [productSlice.name]: productReducer,
});

export type ApplicationState = RootState;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
