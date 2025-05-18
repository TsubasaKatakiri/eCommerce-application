import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/auth-slice';
import { clearUser } from '../../store/user-slice';
import type { ReactElement } from 'react';

const Header: React.FC = (): ReactElement => {
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
      <Link to="/" className="logo">
        Ecommerce-logo
      </Link>

      <nav className="nav">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="navigate-button">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="navigate-button">
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
