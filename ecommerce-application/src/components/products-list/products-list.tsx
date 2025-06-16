import { ReactElement, useEffect, useState } from 'react';
import './products-list.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ProductCard from '../product-card/product-card';
import { searchProducts } from '../../api/search-products';
import { loginUnauthorizedUser } from '../../api/unauthorized-login';
import { setSearchTerm } from '../../store/product-slice';
import Magnify from '../../assets/svg/search.svg?react';
import ChevronLeft from '../../assets/svg/chevron-left.svg?react';
import ChevronRight from '../../assets/svg/chevron-right.svg?react';

const ProductsList: React.FC = () => {
    const {products, total, offset, limit, searchTerm, currentCategory, filters} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [paginationButtons, setPaginationButtons] = useState<ReactElement[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const getData = async(): Promise<void> => {
      try {
        await searchProducts(pageSize, dispatch, filters, pageNumber, currentCategory, searchTerm);
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
    }, [pageSize, pageNumber, searchTerm, currentCategory, filters])

    useEffect(() => {
        const buttonsNumber: number = Math.ceil(total / limit);
        const pageButtons: ReactElement[] = [];
        for(let i = 0; i < buttonsNumber; i++){
            const button: ReactElement = <button className={`pagination-button ${pageNumber === i ? 'pagination-button__active' : ''}`} onClick={() => setPageNumber(i)} key={i}>{i+1}</button>
            pageButtons.push(button);
        }
        setPaginationButtons(pageButtons);
    }, [products, total, limit])

    return (
        <div className='product-list'>
            <div className='product-list_search'>
                <input className='product-list_search-field' type='text' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={'Search...'}/>
                <button className='product-list_search-button' onClick={() => dispatch(setSearchTerm(searchQuery))}>
                    <Magnify/>
                </button>
            </div>
            <div className='product-list_area'>
                {products.length > 0 
                ? <>
                    {products.map(item => <ProductCard product={item} key={item.id}/>)}
                </>
                : loading 
                    ? <span>Loading...</span>
                    : error 
                    ? <span>Error</span>
                    : <></>
                }
            </div>
            <div className='product-list_pagination'>
                <div className='product-list_page-size'>
                    <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)} className='product-list_page-select'>
                        <option value={10} defaultChecked>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span>products per page</span>
                </div>
                <div className='product-list_page-buttons'>
                    <button className='pagination-button' disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 1)}>
                        <ChevronLeft/>
                    </button>
                    {paginationButtons}
                    <button className='pagination-button' disabled={total-offset < limit} onClick={() => setPageNumber((prev) => prev + 1)}>
                        <ChevronRight/>
                    </button>
                </div>
                <div/>
            </div>
        </div>
    );
};

export default ProductsList;