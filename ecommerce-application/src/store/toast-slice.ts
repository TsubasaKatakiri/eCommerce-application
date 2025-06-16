import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ToastState {
  isVisible: boolean;
  status: 'success' | 'error';
  text: string;
}

const initialState: ToastState = {
  isVisible: false,
  status: 'success',
  text: '',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ status: 'success' | 'error'; text: string }>) => {
      state.isVisible = true;
      state.status = action.payload.status;
      state.text = action.payload.text;
    },
    hideToast: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;