import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './header';

import LoginPage from './pages/login/login-page'
import SignUpPage from './signUpPage'
import { useEffect } from 'react';
import { useAppSelector } from './store/hooks';

function Home() {
  return (
    <div>
      <h1>Vite + React</h1>
      <h2>главная страница</h2>
      <div className="card">
      </div>
    </div>
  );
}

const authHost = import.meta.env.VITE_AUTH_HOST;
const projectKey = import.meta.env.VITE_PROJECT_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret  = import.meta.env.VITE_CLIENT_SECRET;


function App() {
  const customer = useAppSelector(state => state.user.customer) ;
  async function getAnonymousToken(): Promise<void> {
    const response = await fetch(`${authHost}oauth/${projectKey}/anonymous/token`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&scope=manage_my_profile:${projectKey}`
    });
    const tokenData = await response.json();
    localStorage.setItem('anonymousToken', tokenData.access_token);
  }

  useEffect(() => {
    const anonymousToken = localStorage.getItem('anonymousToken');
    if(!anonymousToken) getAnonymousToken();
  })

  console.log(customer);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={localStorage.getItem('refreshToken') ? <Home/> : <LoginPage />} />
        <Route path="/register" element={localStorage.getItem('refreshToken') ? <Home/> : <SignUpPage />} />
      </Routes>
    </>
  );
}

export default App
