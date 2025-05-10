import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('myToken');

    const handleLogout = () => {
        localStorage.removeItem('myToken');
        navigate('/login');
    };

    return (
        <header className="header">
            <Link to="/" className="logo">
                Ecommerce-logo
            </Link>

            <nav className="nav">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                        <Link to="/register" className="nav-link">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
