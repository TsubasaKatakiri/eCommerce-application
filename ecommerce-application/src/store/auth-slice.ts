import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') || undefined,
  refreshToken: localStorage.getItem('refreshToken') || undefined,
  isLoggedIn: !!localStorage.getItem('accessToken'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isLoggedIn = true;
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isLoggedIn = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenBestBefore');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
