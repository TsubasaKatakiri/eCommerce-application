import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { ApplicationState, store } from './configure-store';
import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';

type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
export const useAppDispatch = (): Dispatch<UnknownAction> => useDispatch<AppDispatch>();
