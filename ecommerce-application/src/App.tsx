import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/header';
import LoginPage from './pages/login/login-page';
import SignUpPage from './pages/signup/sign-up-page';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import type { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { refreshAccessToken } from './api/refresh-token';
import { login, logout } from './store/auth-slice';
import HomePage from './pages/home/home-page';
import NotFoundPage from './pages/not-found/not-found-page';
import UserPage from './pages/user/user-page';
import PagePlaceholder from './components/page-placeholder/page-placeholder';
import Settings from './components/settings/settings';
import Addresses from './components/addresses/addresses';
import Toast from './components/toast/toast';
import ProductPage from './pages/product/product-page';
import { loginUnauthorizedUser } from './api/unauthorized-login';
import { routeList } from './const/routes';
import { setCart } from './store/user-slice';
import { Cart } from '@commercetools/platform-sdk';
import { createCart } from './api/create-cart';
import CartPage from './pages/cart/cart-page';
import PlaceholderUser from './components/placeholder-user/placeholder-user';

function App(): ReactElement {
  const {cart} = useAppSelector((store) => store.user);
  const toast = useAppSelector((state) => state.toast);
  const {accessToken, refreshToken} = useAppSelector((state) => state.auth);
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
    await loginUnauthorizedUser();
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

  const getCartData = async(): Promise<void> => {
        try {
          await createCart(dispatch);
        } catch {
          console.log('Fail');
        }
      }

  useEffect(() => {
    if(accessToken && !cart){
      const cartData = localStorage.getItem('cart');
      if(cartData){
        const parsedCart: Cart = JSON.parse(cartData);
        dispatch(setCart(parsedCart))
      } else {
        getCartData();
      }
    }
  }, [accessToken, cart])

  return (
    <>
      {toast.isVisible && (
        <Toast status={toast.status} text={toast.text} />
      )}
      <Header />
      <div className="app_content">
        <Routes>
          <Route path={routeList.MAIN} element={<HomePage />} />
          <Route path={routeList.PRODUCT} element={<ProductPage />} />
          <Route path={routeList.CART} element={<CartPage />} />
          <Route path={routeList.LOGIN} element={!!refreshToken ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path={routeList.REGISTER}
            element={!!refreshToken ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route path={routeList.USER} element={!!refreshToken ? <UserPage/> : <Navigate to="/" /> }>
            <Route index element={<PlaceholderUser/>}/>
            <Route path={routeList.USER_SETTINGS} element={<Settings/>} />
            <Route path={routeList.USER_ADDRESS} element={<Addresses/>} />
          </Route>
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

// http://localhost:5173/