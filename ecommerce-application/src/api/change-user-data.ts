import type { Customer, CustomerUpdateAction } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setUser } from "../store/user-slice";

export const changeUserData = async (id: string, version: number, firstName: string, lastName: string, dateOfBirth: string, email: string, dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid access token');

  const url = `${apiHost}${projectKey}/customers/${id}`
  const actions: CustomerUpdateAction[] = [
    {action: 'setFirstName', firstName: firstName},
    {action: 'setLastName', lastName: lastName},
    {action: 'setDateOfBirth', dateOfBirth: dateOfBirth},
    {action: 'changeEmail', email: email}
  ]
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
    throw new Error('Failed to update user');
  }
  const customerData: Customer = await response.json();
  dispatch(setUser({ customer: customerData }));
};