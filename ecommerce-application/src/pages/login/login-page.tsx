import { useNavigate } from 'react-router-dom';
import './login-page.css';
import LoginForm from '../../components/login-form/login-form';
import type { ReactElement } from 'react';

const LoginPage = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="login_wrapper">
      <div className="login_block">
        <h2 className="login_header">Sign In</h2>
        <LoginForm />
        <button className="login_button" onClick={() => navigate('/register')}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
