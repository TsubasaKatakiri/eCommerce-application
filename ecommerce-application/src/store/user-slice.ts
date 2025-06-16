import type { Cart, Customer } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  customer: Customer | undefined;
  cart: Cart | undefined;
}

const initialState: UserState = {
  customer: getStoredCustomer(),
  cart: getStoredCart(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<{ customer: Customer; cart?: Cart }>) => {
      state.customer = payload.customer;
      localStorage.setItem('customer', JSON.stringify(payload.customer));
      if (payload.cart) {
        state.cart = payload.cart;
        localStorage.setItem('cart', JSON.stringify(payload.cart));
      }
    },
    setCart: (state, { payload }: PayloadAction<Cart>) => {
        state.cart = payload;
        localStorage.setItem('cart', JSON.stringify(payload));
    },
    clearUser: (state) => {
      state.customer = undefined;
      state.cart = undefined;
      localStorage.removeItem('customer');
      localStorage.removeItem('cart');
    },
  },
});

export const { setUser, setCart, clearUser } = userSlice.actions;
export default userSlice.reducer;

function getStoredCustomer(): Customer | undefined {
  const data: string | null = localStorage.getItem('customer');
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
}

function getStoredCart(): Cart | undefined {
  const data: string | null = localStorage.getItem('cart');
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
}
