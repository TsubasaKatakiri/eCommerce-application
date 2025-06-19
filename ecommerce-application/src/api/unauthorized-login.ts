export const loginUnauthorizedUser = async (): Promise<void> => {
  const authHost = import.meta.env.VITE_AUTH_HOST;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const scope = import.meta.env.VITE_SCOPES;

  const tokenUrl = `${authHost}oauth/token`;
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error('Failed to login');
  }

  const tokenData = await tokenResponse.json();
  const accessTokenBestBefore: number = Date.now() + tokenData.expires_in * 1000;
  localStorage.setItem('accessTokenBestBefore', accessTokenBestBefore.toString());
  localStorage.setItem('accessToken', tokenData.access_token);
  
};