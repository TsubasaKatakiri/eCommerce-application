import { Link } from 'react-router-dom';
import type { ReactElement } from 'react';
import './product-card.css';

interface ProductCardContent {
    id: string;
    cost: string;
    name: string;
    img?: string;
  }
const ProductCard = ({ id, cost, name, img }: ProductCardContent): ReactElement => {
    return (
      <Link to={`/products/${id}`} className="product_card">
        <img src={img} alt={name} />
        <h3>{name}</h3>
        <p>{cost}</p>
      </Link>
    );
  };
  export default ProductCard;