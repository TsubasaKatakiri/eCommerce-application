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
                          <button onClick={() => navigate('/login')} className="navigate-button">
                            Login
                        </button>
                        <button onClick={() => navigate('/register')} className="navigate-button">
                            Sign Up
                        </button>
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

<<<<<<< HEAD

export default Header;

=======
export default Header;
>>>>>>> auth-header-navigation
