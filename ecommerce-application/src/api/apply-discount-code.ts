import type { Cart, CartUpdateAction } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCart } from "../store/user-slice";

export const applyDiscountCode = async (id: string, version: number, discountCode: string, dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid access token');

  const url = `${apiHost}${projectKey}/carts/${id}`
  
  const actions: CartUpdateAction[] = [{
    action: 'addDiscountCode',
    code: discountCode,
  }]

  const parameters = {
    version: version,
    actions: actions,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });

  if (!response.ok) {
    throw new Error('Failed to update cart');
  }
  const cartData: Cart = await response.json();
  dispatch(setCart(cartData));
};