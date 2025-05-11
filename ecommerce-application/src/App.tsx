import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './header';

import LoginPage from './loginPage'
import SignUpPage from './signUpPage'

import HomePage from './homePage';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App