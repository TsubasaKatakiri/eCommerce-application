import { Link } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  return (
    <div className="header_wrapper">
      <Link to="/">
        <h1 className="header_name">Store Name</h1>
      </Link>
      <nav className="header_nav">
        <Link to="/login">Sign in</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
};

export default Header;
