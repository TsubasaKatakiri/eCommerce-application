export const refreshAccessToken = async (refreshToken: string) => {
    const authHost = import.meta.env.VITE_AUTH_HOST;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret  = import.meta.env.VITE_CLIENT_SECRET;

    const url = `${authHost}oauth/token`;
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        })
    });

    if(!response.ok){
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken
    }
}