import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, {authSlice} from './auth-slice';
import userReducer, {userSlice} from './user-slice';

export interface RootState {
    [authSlice.name]: ReturnType<typeof authReducer>;
    [userSlice.name]: ReturnType<typeof userReducer>;
}

const rootReducer = combineReducers({
    [authSlice.name]: authReducer,
    [userSlice.name]: userReducer,
});

export type ApplicationState = RootState;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})