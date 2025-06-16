import type {  DiscountCodePagedQueryResponse } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setDiscountCodes } from "../store/product-slice";

export const getDiscountCodes = async (dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');

  const url = `${apiHost}${projectKey}/discount-codes`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get discount codes');
  }
  const codesData: DiscountCodePagedQueryResponse = await response.json();
  dispatch(setDiscountCodes(codesData.results));
};