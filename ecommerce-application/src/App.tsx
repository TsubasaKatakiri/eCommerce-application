import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './header';

import RegistrationPage from './register';
import LoginPage from './loginPage';
import HomePage from './homePage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;