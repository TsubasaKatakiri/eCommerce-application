import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearUser } from '../../store/user-slice';
import './burger-menu.css';
import { useScreenSize } from '../../hooks/use-screen-size';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { routeList } from '../../const/routes';

interface Properties {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}

const BurgerMenu = ({ menuOpen, setMenuOpen }: Properties): ReactElement => {
  const {customer, cart} = useAppSelector((store) => store.user);
  const isAuthenticated = !!localStorage.getItem('refreshToken');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const smallScreen = useScreenSize();

  const handleLogout = (): void => {
    dispatch(logout());
    dispatch(clearUser());
    location.reload();
  };

  useEffect(() => {
    if (!smallScreen) {
      setMenuOpen(false);
      document.body.classList.remove('noscroll');
    }
  }, [smallScreen]);

  useEffect(() => {
    if (menuOpen) {
      const handleClickOutside = (event: MouseEvent): void => {
        const burgerMenu = document.querySelector('.burger-menu');
        if (burgerMenu && !burgerMenu.contains(event.target as Node)) {
          setMenuOpen(false);
          document.body.classList.remove('noscroll');
        }
      };
      document.addEventListener('click', handleClickOutside);
      return (): void => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [menuOpen]);

  return (
    <div className="burger-menu">
      {isAuthenticated ? (
        <div className="burger-menu__content">
          <p>
            {customer?.firstName} {customer?.lastName}
          </p>
          <button className="burger-menu__button_secondary" onClick={() => navigate(routeList.CART)}>
            My cart {cart && cart.lineItems.length > 0 && <span>({cart.lineItems.length})</span>}
          </button>
          <button className="burger-menu__button_secondary" onClick={() => navigate(routeList.USER)}>
            User profile
          </button>
          <button className="burger-menu__button_secondary" onClick={() => navigate(routeList.ABOUT)}>
            About us
          </button>
          <button
            className="burger-menu__button_secondary"
            onClick={(): void => {
              setMenuOpen(false);
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="burger-menu__content">
          <button className="burger-menu__button_secondary" onClick={() => navigate(routeList.CART)}>
            My cart
          </button>
          <button
            className="burger-menu__button_primary"
            onClick={(): void => {
              setMenuOpen(false);
              navigate(routeList.LOGIN);
            }}
          >
            Login
          </button>
          <button
            className="burger-menu__button_secondary"
            onClick={(): void => {
              setMenuOpen(false);
              navigate(routeList.REGISTER);
            }}
          >
            Sign Up
          </button>
          <button className="burger-menu__button_secondary" onClick={() => navigate(routeList.ABOUT)}>
            About us
          </button>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
