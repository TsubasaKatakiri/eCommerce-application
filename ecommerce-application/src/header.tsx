import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('myToken');

=======
const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('myToken');
>>>>>>> rss-ecomm-2-16
    const handleLogout = () => {
        localStorage.removeItem('myToken');
        navigate('/login');
    };
<<<<<<< HEAD

=======
>>>>>>> rss-ecomm-2-16
    return (
        <header className="header">
            <Link to="/" className="logo">
                Ecommerce-logo
            </Link>
<<<<<<< HEAD

=======
>>>>>>> rss-ecomm-2-16
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

export default Header;