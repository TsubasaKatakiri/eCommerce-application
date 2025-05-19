import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth-slice';
import { clearUser } from '../../store/user-slice';
import type { ReactElement } from 'react';
import './header.css';

const Header: React.FC = (): ReactElement => {
  const customer = useAppSelector((store) => store.user)
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('refreshToken');
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
    dispatch(clearUser());
    location.reload();
  };

  return (
    <header className="header">
      <Link to="/" className="header_logo">
        Ecommerce-logo
      </Link>

      <nav className="header_nav">
        {isAuthenticated ? (
          <div className='header_user'>
            <span className='header_username'>{customer.customer?.firstName} {customer.customer?.lastName}</span>
            <button onClick={handleLogout} className="navigate_button">
              Logout
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="navigate_button">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="navigate_button">
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
