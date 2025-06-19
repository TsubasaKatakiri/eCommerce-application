import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './sidebar.css';
import { getCategories } from '../../api/get-categories';
import { loginUnauthorizedUser } from '../../api/unauthorized-login';
import { Category } from '@commercetools/platform-sdk';
import { setCurrentCategory, setFilters } from '../../store/product-slice';
import type { Filters } from '../../types/filters';
import Preloader from '../preloader/preloader';
import ErrorMessage from '../error-message/error-message';

const Sidebar = () => {
    const {currentCategory, categories} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [material, setMaterial] = useState<string | undefined>();
    const [minWidth, setMinWidth] = useState<number | undefined>();
    const [maxWidth, setMaxWidth] = useState<number | undefined>();
    
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

    const handleClearFilters = () => {
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setMaterial(undefined);
        setMinWidth(undefined);
        setMaxWidth(undefined);
        const filters: Filters = {
            minPrice: undefined,
            maxPrice: undefined,
            material: undefined,
            minWidth: undefined,
            maxWidth: undefined,
        }
        dispatch(setFilters(filters));
    }

    const handleApplyFilters = () => {
        const filters: Filters = {
            minPrice: minPrice,
            maxPrice: maxPrice,
            material: material,
            minWidth: minWidth,
            maxWidth: maxWidth,
        }
        dispatch(setFilters(filters));
    }

    return (
        <div className='sidebar'>
            <div className='sidebar_group'>
                <h3 className='sidebar_group-title'>Categories</h3>
                <div className='sidebar_group-list'>
                {categories.length > 0 
                ? <>
                    <button className={`home_category ${!currentCategory && 'home_category__active'}`} key={1} onClick={() => handleCategoryChange(undefined)}>
                    All products
                    </button>
                    {categories.map(item => 
                    <button className={`home_category ${currentCategory && currentCategory.id === item.id && 'home_category__active'}`} key={item.id} onClick={() => handleCategoryChange(item)}>
                        {item.name['en-US']}
                    </button>)
                    }
                </>
                : loading 
                    ? <Preloader/>
                    : error 
                    ? <ErrorMessage/>
                    : <></>
                }
                </div>
            </div>
            <div className='sidebar_group'>
                <h3 className='sidebar_group-title'>Filters</h3>
                <div className='sidebar_group-list'>
                    <div className='sidebar_input-group'>
                        <label className='sidebar_input-label'>Price from:</label>
                        <input className='sidebar_input' type="number" value={minPrice || ''} onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)} />
                        <label className='sidebar_input-label'>to:</label>
                        <input className='sidebar_input' type="number" value={maxPrice || ''} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)} />
                    </div>
                    <div className='sidebar_input-group'>
                        <label className='sidebar_input-label'>Material:</label>
                        <select className='sidebar_input' value={material || ''} onChange={(e) => setMaterial(e.target.value || undefined)}>
                            <option value="">All</option>
                            <option value="Vinyl">Vinyl</option>
                            <option value="Paper">Paper</option>
                            <option value="Non-woven fabric">Non-woven fabric</option>
                        </select>
                    </div>
                    <div className='sidebar_input-group'>
                        <label className='sidebar_input-label'>Width from:</label>
                        <input className='sidebar_input' type="number" value={minWidth || ''} onChange={(e) => setMinWidth(e.target.value ? Number(e.target.value) : undefined)} />
                        <label className='sidebar_input-label'>to:</label>
                        <input className='sidebar_input' type="number" value={maxWidth || ''} onChange={(e) => setMaxWidth(e.target.value ? Number(e.target.value) : undefined)} />
                    </div>
                </div>
                <div className='sidebar_button-group'>
                    <button className='sidebar_button' onClick={handleApplyFilters}>Apply filters</button>
                    <button className='sidebar_button' onClick={handleClearFilters}>Clear filters</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;