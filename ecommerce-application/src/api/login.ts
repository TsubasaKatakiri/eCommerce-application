import { UnknownAction } from "@reduxjs/toolkit";
import { login } from "../store/auth-slice";
import { Dispatch } from "react";
import { setUser } from "../store/user-slice";
import { CustomerSignInResult } from "@commercetools/platform-sdk";

export const loginUser = async (email: string, password: string, dispatch: Dispatch<UnknownAction>) => {
    const authHost = import.meta.env.VITE_AUTH_HOST;
    const apiHost = import.meta.env.VITE_API_HOST;
    const projectKey = import.meta.env.VITE_PROJECT_KEY;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret  = import.meta.env.VITE_CLIENT_SECRET;
    const scope = import.meta.env.VITE_SCOPES;


    const tokenUrl = `${authHost}oauth/${projectKey}/customers/token`;
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'password',
            username: email,
            password: password,
            scope
        })
    });

    if(!tokenResponse.ok){
        throw new Error('Login failed (token)');
    }

    const tokenData = await tokenResponse.json();
    console.log(tokenData);
    dispatch(login({accessToken: tokenData.access_token, refreshToken: tokenData.refresh_token}))

    const userUrl = `${apiHost}${projectKey}/me/login`;
    const userParams = JSON.stringify({
            email: email,
            password: password,
        })
    console.log(userParams);
    const userResponse = await fetch(userUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: userParams
    });

    if(!userResponse.ok){
        throw new Error('Login failed (user)');
    }
    const userData: CustomerSignInResult = await userResponse.json();
    console.log(userData);
    dispatch(setUser({customer: userData.customer}))
}