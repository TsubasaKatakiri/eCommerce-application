import type { Product } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCurrentProduct } from "../store/product-slice";

export const getProductById = async (id: string, dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');

  const url = `${apiHost}${projectKey}/products/${id}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to get product');
  }
  const productData: Product = await response.json();
  dispatch(setCurrentProduct({ currentProduct: productData }));
};