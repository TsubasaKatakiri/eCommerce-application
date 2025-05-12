import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './header';
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

export default App