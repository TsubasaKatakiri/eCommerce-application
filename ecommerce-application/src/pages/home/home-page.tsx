import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './home-page.css';
import { getProducts } from '../../api/get-products';
import { getCategories } from '../../api/get-categories';
import ProductCard from '../../components/product-card/product-card';
import { Category, Product } from '@commercetools/platform-sdk';

const HomePage: React.FC = () => {
  const {products, categories} = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | undefined>();

  useEffect(() => {
    setLoading(true);
    try {
      getProducts(dispatch);
      getCategories(dispatch);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    setFiltered(products);
  }, [products])

  const handleCategoryChange = (id: string | undefined): void => {
    if(id){
      const filteredProducts = products.filter(item => item.masterData.staged.categories.some(item => item.id === id));
      setFiltered(filteredProducts);
    } else setFiltered(products);
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
              <button className='home_category' key={item.id} onClick={() => handleCategoryChange(item.id)}>
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
          {filtered.length > 0 
          ? <>
            {filtered.map(item => <ProductCard product={item} key={item.id}/>)}
          </>
          : loading 
            ? <span>Loading...</span>
            : error 
              ? <span>Error</span>
              : <></>
          }
        </div>
      </div>
    </div>
  )
};

export default HomePage;
