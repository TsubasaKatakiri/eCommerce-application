// import PagePlaceholder from '../../components/page-placeholder/page-placeholder';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './home-page.css';
import { getProducts } from '../../api/get-products';
import { getCategories } from '../../api/get-categories';

const HomePage: React.FC = () => {
  const {products, categories} = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      getProducts(dispatch);
      getCategories(dispatch);
    } catch (error) {
      console.log('fail');
      console.log(error);
    }
  }, [])

  console.log(products);
  console.log(categories);

  return (
    <div className='home_wrapper'>
      <div className='home_categories'>
        <span>Categories</span>
      </div>
      <div className='home_contents'>
        <span>Products</span>
      </div>
    </div>
  )
};

export default HomePage;
