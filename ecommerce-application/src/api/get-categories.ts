import type { Category } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCategories } from "../store/product-slice";

export const getCategories = async (dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');
  // let token = localStorage.getItem('accessToken');
  // if(token === undefined) token = localStorage.getItem('anonymousToken');
  // else throw new Error('Invalid token');

  const url = `${apiHost}${projectKey}/categories`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get categories');
  }
  const categoryData: Category[] = await response.json();
  dispatch(setCategories({ categories: categoryData }));
};