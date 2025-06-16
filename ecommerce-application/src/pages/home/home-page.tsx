import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './home-page.css';
import { getCategories } from '../../api/get-categories';
import ProductCard from '../../components/product-card/product-card';
import { Category, Product } from '@commercetools/platform-sdk';
import { loginUnauthorizedUser } from '../../api/unauthorized-login';
import ProductsList from '../../components/products-list/products-list';
import { setCurrentCategory } from '../../store/product-slice';

const HomePage: React.FC = () => {
  const {products, categories} = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const [category, setCategory] = useState<Category | undefined>();

  const getData = async(): Promise<void> => {
     try {
        getCategories(dispatch);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    if(!token){
      loginUnauthorizedUser()
      .then(() => getData())
      .catch(() => setError(true))
      .finally(() => setLoading(false))
    } else getData();
  }, [])

  const handleCategoryChange = (category: Category | undefined): void => {
    dispatch(setCurrentCategory(category));
  }

  return (
    <div className='home_wrapper'>
      <div className='home_categories'>
        <h3>Categories</h3>
        <div className='home_categories-list'>
          {categories.length > 0 
          ? <>
            <button className='home_category' key={1} onClick={() => handleCategoryChange(undefined)}>
              All products
            </button>
            {categories.map(item => 
              <button className='home_category' key={item.id} onClick={() => handleCategoryChange(item)}>
                {item.name['en-US']}
              </button>)
            }
          </>
          : loading 
            ? <span>Loading...</span>
            : error 
              ? <span>Error</span>
              : <></>
          }
        </div>
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


