import type { Product } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setProducts } from "../store/product-slice";

export const getProducts = async (dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');

  const url = `${apiHost}${projectKey}/products`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get products');
  }
  const productData: Product[] = await response.json();
  dispatch(setProducts({ products: productData }));
};