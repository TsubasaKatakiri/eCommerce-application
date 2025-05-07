import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

const MainLayout: React.FC = () => {
  return (
    <div className={'app_wrapper'}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
