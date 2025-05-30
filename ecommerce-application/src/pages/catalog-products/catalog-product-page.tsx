
import type { ReactElement } from 'react';
import ProductCard from '../../components/product-card/product-card';

const allProduct = [
  {
    id: '1',
    cost: '330 руб.',
    name: 'item first',
    img: undefined
  },
  {
    id: '2',
    cost: '440 руб.',
    name: 'item second',
    img: undefined
  },
];

const CatalogProductPage = (): ReactElement => {
  return (
    <div className="catalog_page">
      <h1>catalog</h1>
      <div className="products_list">
        {allProduct.map((item) => (
          <ProductCard
            id={item.id}
            cost={item.cost}
            name={item.name}
            img={item.img}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogProductPage;