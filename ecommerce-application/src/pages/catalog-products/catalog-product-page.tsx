import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const CatalogProductPage = (): ReactElement => {
  return (
    <div className="catalog_page">
      <h1>catalog</h1>
      <ul className="products_list">
            <li>
              <Link to={`/products/1`}>{'product first'}</Link>
            </li>
            <li>
              <Link to={`/products/2`}>{'product second'}</Link>
            </li>
        </ul>
    </div>
  );
};

export default CatalogProductPage;