import './page-placeholder.css';
import splash from '../../assets/splash/00044-2746264735.png';

const PagePlaceholder: React.FC = () => {
  return (
    <div className="placeholder_wrapper">
      <div className="placeholder_container">
        <img src={splash} alt="Under construction" className="placeholder_splash" />
        <h2 className="placeholder_title">Under construction</h2>
      </div>
    </div>
  );
};

export default PagePlaceholder;
