import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main>
      <h2>home page</h2>
      <ul>
        <li><Link to="/login">login page</Link></li>
        <li><Link to="/register">registration page</Link></li>
      </ul>
    </main>
  );
};

export default HomePage;