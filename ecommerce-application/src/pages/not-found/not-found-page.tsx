import './not-found-page.css';
import splash from '../../assets/splash/00054-3537907931.png';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found_wrapper">
      <div className="not-found_container">
        <div className="not-found_text">
          <h2 className="not-found_title">Error 404 - Not found</h2>
          <p className="not-found_message">
            Please, forgive me, master... I looked everywhere, but I couldn't find what you wanted...
          </p>
          <p>The page you requested cannot be found.</p>
          <div className="not-found_button-block">
            <button className="not-found_button" onClick={() => history.back()}>
              Back
            </button>
            <button className="not-found_button" onClick={() => navigate('/')}>
              Home page
            </button>
          </div>
        </div>
        <img src={splash} alt="Not found" className="not-found_splash" />
      </div>
    </div>
  );
};

export default NotFoundPage;
