import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './header';
<<<<<<< HEAD

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

=======
import RegistrationPage from './register'
import LoginPage from './loginPage'


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
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

>>>>>>> rss-ecomm-2-16
export default App