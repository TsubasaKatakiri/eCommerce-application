import type { Customer, CustomerUpdateAction } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setUser } from "../store/user-slice";

export const deleteAddress = async (id: string, version: number, addressId: string, dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid access token');

  const url = `${apiHost}${projectKey}/customers/${id}`;
  const action: CustomerUpdateAction[] = [{action: 'removeAddress', addressId}];

  const parameters = {
    version: version,
    actions: action,
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
    throw new Error('Failed to set default address');
  }
  const customerData: Customer = await response.json();
  dispatch(setUser({ customer: customerData }));
};