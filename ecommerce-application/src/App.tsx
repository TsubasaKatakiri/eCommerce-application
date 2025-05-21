import './app.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/header';

import LoginPage from './pages/login/login-page';
import SignUpPage from './pages/signup/sign-up-page';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { refreshAccessToken } from './api/refresh-token';
import { login, logout } from './store/auth-slice';
import HomePage from './pages/home/home-page';
import NotFoundPage from './pages/not-found/not-found-page';

function App(): ReactElement {
  const dispatch = useAppDispatch();

  const authHost = import.meta.env.VITE_AUTH_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  async function getAnonymousToken(): Promise<void> {
    const response = await fetch(`${authHost}oauth/${projectKey}/anonymous/token`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&scope=manage_my_profile:${projectKey}`,
    });
    const tokenData = await response.json();
    sessionStorage.setItem('anonymousToken', tokenData.access_token);
  }

  useEffect(() => {
    const anonymousToken = sessionStorage.getItem('anonymousToken');
    if (!anonymousToken) getAnonymousToken();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenBestBefore = localStorage.getItem('accessTokenBestBefore');
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken && (!accessToken || !accessTokenBestBefore || +accessTokenBestBefore <= Date.now())) {
      refreshTokens(refreshToken, dispatch);
    }
  });

  return (
    <>
      <Header />
      <div className="app_content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={localStorage.getItem('refreshToken') ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path="/register"
            element={localStorage.getItem('refreshToken') ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

async function refreshTokens(refreshToken: string, dispatch: Dispatch<UnknownAction>): Promise<void> {
  try {
    const tokens = await refreshAccessToken(refreshToken);
    dispatch(login({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }));
  } catch {
    dispatch(logout());
  }
}
