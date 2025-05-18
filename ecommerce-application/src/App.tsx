<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

=======
>>>>>>> 4e98b371fec0cf42921a491313e87384793fb25e
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './header';

import LoginPage from './loginPage'
import SignUpPage from './singup-form/signUpPage'

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



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App
