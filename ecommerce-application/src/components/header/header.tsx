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
import CartIcon from '../../assets/svg/cart.svg?react';

const Header = (): ReactElement => {
  const {customer, cart} = useAppSelector((store) => store.user);
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
        Good wallpapers
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
          <button onClick={() => navigate(routeList.CART)} className='header_cart-button'>
            <CartIcon/>
            {cart && cart.lineItems.length > 0 && <span className='header_cart-button-mark'>{cart.lineItems.length}</span>}
          </button>
          {customer && isAuthenticated ? (
            <div className="header_user">
              <Link to={routeList.USER} className="header_username">
                {customer.firstName} {customer.lastName}
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
