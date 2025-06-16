import './home-page.css';
import ProductsList from '../../components/products-list/products-list';
import Sidebar from '../../components/sidebar/sidebar';

const HomePage: React.FC = () => {
  return (
    <div className='home_wrapper'>
      <div className='home_sidebar'>
        <Sidebar/>
      </div>
      <div className='home_contents'>
        <div className='product_cards'>
          <ProductsList/>
        </div>
      </div>
    </div>
  )
};

export default HomePage;


