import type { UnknownAction } from '@reduxjs/toolkit';
import { login } from '../store/auth-slice';
import type { Dispatch } from 'react';
import { setUser } from '../store/user-slice';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';

export const loginUser = async (email: string, password: string, dispatch: Dispatch<UnknownAction>): Promise<void> => {
  const authHost = import.meta.env.VITE_AUTH_HOST;
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const scope = import.meta.env.VITE_SCOPES;

  const tokenUrl = `${authHost}oauth/${projectKey}/customers/token`;
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
      scope,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to login');
  }

  const tokenData = await tokenResponse.json();
  const accessTokenBestBefore: number = Date.now() + tokenData.expires_in * 1000;
  localStorage.setItem('accessTokenBestBefore', accessTokenBestBefore.toString());
  dispatch(login({ accessToken: tokenData.access_token, refreshToken: tokenData.refresh_token }));

  const userUrl = `${apiHost}${projectKey}/me/login`;
  const userParameters = JSON.stringify({
    email: email,
    password: password,
  });
  const userResponse = await fetch(userUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: userParameters,
  });

  if (!userResponse.ok) {
    throw new Error('Failed to retrieve user data');
  }
  const userData: CustomerSignInResult = await userResponse.json();
  dispatch(setUser({ customer: userData.customer }));
};
