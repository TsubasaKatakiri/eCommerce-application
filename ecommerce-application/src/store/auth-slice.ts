import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    accessToken: string | null,
    refreshToken: string | null,
    isLoggedIn: boolean
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isLoggedIn: !!localStorage.getItem('accessToken')
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }: PayloadAction<{accessToken: string, refreshToken: string}>) => {
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.isLoggedIn = true;
            localStorage.setItem('accessToken', payload.accessToken);
            localStorage.setItem('refreshToken', payload.refreshToken);
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenBestBefore');
            localStorage.removeItem('refreshToken');
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;