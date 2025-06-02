import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearUser } from '../../store/user-slice';
import './burger-menu.css';
import { useScreenSize } from '../../hooks/use-screen-size';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { routeList } from '../../const/routes';

interface Properties {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}

const BurgerMenu = ({ menuOpen, setMenuOpen }: Properties): ReactElement => {
  const customer = useAppSelector((store) => store.user);
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
    if (!smallScreen) setMenuOpen(false);
  }, [smallScreen]);

  useEffect(() => {
    if (menuOpen) {
      const handleClickOutside = (event: MouseEvent): void => {
        const burgerMenu = document.querySelector('.burger-menu');
        if (burgerMenu && !burgerMenu.contains(event.target as Node)) {
          setMenuOpen(false);
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
            {customer.customer?.firstName} {customer.customer?.lastName}
          </p>
          <Link to={routeList.USER} className="burger-menu__button_secondary">
            User profile
          </Link>
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
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
