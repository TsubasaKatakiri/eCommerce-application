import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/auth-slice';
import { clearUser } from '../../store/user-slice';
import { useEffect, useState, type ReactElement } from 'react';
import './header.css';
import BurgerMenu from '../burger-menu/burger-menu';
import { useScreenSize } from '../../hooks/use-screen-size';
import { loginUnauthorizedUser } from '../../api/unauthorized-login';
import { routeList } from '../../const/routes';
import CartIcon from '../../assets/svg/cart.svg?react';
import FilterIcon from '../../assets/svg/filter.svg?react';
import MenuIcon from '../../assets/svg/menu.svg?react';
import Sidebar from '../sidebar/sidebar';
import aboutUsIcon from '../../assets/about-us-icon/about-us.png';

const Header = (): ReactElement => {
  const {customer, cart} = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('refreshToken');
  const dispatch = useAppDispatch();
  const smallScreen = useScreenSize();
  const currentPath: string | undefined = location.pathname.split('/').filter(item => item !== '')[1];

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    dispatch(logout());
    dispatch(clearUser());
    await loginUnauthorizedUser();
    location.reload();
  };

  const handleSidebarOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSidebarOpen(!sidebarOpen);
    document.body.classList.toggle('noscroll');
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen)
    document.body.classList.toggle('noscroll');
  }

  useEffect(() => {
      if (sidebarOpen) {
        const handleClickOutside = (event: MouseEvent): void => {
          const overlay = document.querySelector('.sidebar_overlay');
          if (overlay && !overlay.contains(event.currentTarget as Node)) {
            setSidebarOpen(false);
          }
        };
        document.addEventListener('click', handleClickOutside);
        return (): void => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
    }, [sidebarOpen]);

  return (
    <header className="header">
      {smallScreen &&
        (location.pathname === routeList.MAIN 
          || location.pathname === routeList.USER
          || location.pathname === `${routeList.USER}/settings`
          || location.pathname === `${routeList.USER}/address`
          ? <button className="nav__button_secondary" onClick={handleSidebarOpen}><FilterIcon/></button>
          : <div className='nav_filler'/>
        )
      }
      <Link to="/" className="header_logo">
        Good wallpapers
      </Link>

      {smallScreen ? (
        <button
          className="nav__button_secondary"
          onClick={handleMenuOpen}
        >
          <MenuIcon/>
        </button>
      ) : (
        <nav className="header_nav">
          <Link to="/about" className='header__about-link'>
            <img src={aboutUsIcon} alt='about us' className='header__about-icon' />
          </Link>
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
      {sidebarOpen && 
        <div className='sidebar_overlay'>
          <div className='sidebar_body'>
            {location.pathname === routeList.MAIN && <Sidebar/>}
            {(location.pathname === routeList.USER || location.pathname === `${routeList.USER}/settings` || location.pathname === `${routeList.USER}/address`) && 
              <div className='user-page_menu'>
                  <Link to={`${routeList.USER}/settings`} className={`user-page_menu-link ${currentPath === 'settings' ? 'active' : ''}`}>Settings</Link>
                  <Link to={`${routeList.USER}/address`} className={`user-page_menu-link ${currentPath === 'address' ? 'active' : ''}`}>Address</Link>
              </div>
            }
          </div>
        </div>
      }
      {menuOpen && <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
    </header>
  );
};

export default Header;
