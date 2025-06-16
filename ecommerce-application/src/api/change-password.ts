import type { Customer, CustomerChangePassword } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setUser } from "../store/user-slice";

export const changePassword = async (id: string, version: number, currentPassword: string, newPassword: string, dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');

  const url = `${apiHost}${projectKey}/customers/password`
  const parameters: CustomerChangePassword = {
    id: id,
    version: version,
    currentPassword: currentPassword,
    newPassword: newPassword,
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
    throw new Error('Failed to update password');
  }
  const customerData: Customer = await response.json();
  dispatch(setUser({ customer: customerData }));
};