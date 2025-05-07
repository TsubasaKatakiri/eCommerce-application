import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/main-layout';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import NotFoundPage from './pages/not-found';
import RegisterPage from './pages/register';
import type { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
