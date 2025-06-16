import type { Cart } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCart } from "../store/user-slice";

export const createCart = async (dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');

  const url = `${apiHost}${projectKey}/carts`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({currency: 'USD'}),
  });

  if (!response.ok) {
    throw new Error('Failed to create cart');
  }
  const cartData: Cart = await response.json();
  dispatch(setCart(cartData));
};