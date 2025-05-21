import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth-slice';
import { clearUser } from '../../store/user-slice';
import { useState, type ReactElement } from 'react';
import './header.css';
import BurgerMenu from '../burger-menu/burger-menu';
import { useScreenSize } from '../../hooks/use-screen-size';

const Header = (): ReactElement => {
  const customer = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('refreshToken');
  const dispatch = useAppDispatch();
  const smallScreen = useScreenSize();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

      {smallScreen ? (
        <button
          className="nav__button_secondary"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          Menu
        </button>
      ) : (
        <nav className="header_nav">
          {isAuthenticated ? (
            <div className="header_user">
              <span className="header_username">
                {customer.customer?.firstName} {customer.customer?.lastName}
              </span>
              <button onClick={handleLogout} className="nav__button_secondary">
                Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="nav__button_primary">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="nav__button_secondary">
                Sign Up
              </button>
            </>
          )}
        </nav>
      )}
      {menuOpen && <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
    </header>
  );
};

export default Header;
