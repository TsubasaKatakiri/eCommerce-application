import type { Cart, CartUpdateAction } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCart } from "../store/user-slice";

export const removeFromCart = async (id: string, version: number, lineItemId: string, dispatch: Dispatch<UnknownAction>, quantity?: number): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid access token');

  const url = `${apiHost}${projectKey}/carts/${id}`
  
  const actions: CartUpdateAction[] = [{
    action: 'removeLineItem', 
    lineItemId,
    quantity: quantity ?? undefined,
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
    throw new Error('Failed to remove item from cart');
  }
  const cartData: Cart = await response.json();
  dispatch(setCart(cartData));
};