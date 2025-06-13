import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth-slice';
import { clearUser } from '../../store/user-slice';
import { useState, type ReactElement } from 'react';
import './header.css';
import BurgerMenu from '../burger-menu/burger-menu';
import { useScreenSize } from '../../hooks/use-screen-size';
import { loginUnauthorizedUser } from '../../api/unauthorized-login';
import { routeList } from '../../const/routes';

const Header = (): ReactElement => {
  const customer = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('refreshToken');
  const dispatch = useAppDispatch();
  const smallScreen = useScreenSize();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    dispatch(logout());
    dispatch(clearUser());
    await loginUnauthorizedUser();
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
          <Link to="/about" className='header__about-link'>
            about us
          </Link>
          {isAuthenticated ? (
            <div className="header_user">
              <Link to={routeList.USER} className="header_username">
                {customer.customer?.firstName} {customer.customer?.lastName}
              </Link>
              <button onClick={handleLogout} className="nav__button_secondary">
                Logout
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => navigate(routeList.LOGIN)} className="nav__button_primary">
                Login
              </button>
              <button onClick={() => navigate(routeList.REGISTER)} className="nav__button_secondary">
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
