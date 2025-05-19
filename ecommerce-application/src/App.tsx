import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './header';

<<<<<<< HEAD
import RegistrationPage from './register'; 
import LoginPage from './loginPage';
import HomePage from './homePage'; 
=======
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

>>>>>>> auth-header-navigation


function App() {
  return (
    <>
      <Header />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
=======
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
>>>>>>> auth-header-navigation
      </Routes>
    </>
  );
}

export default App;