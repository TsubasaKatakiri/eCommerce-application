import { Link } from 'react-router-dom';
import { useEffect, useState, type ReactElement } from 'react';
import './product-card.css';
import { Image, Product } from '@commercetools/platform-sdk';

interface ProductCardContent {
    product: Product
}

const ProductCard = ({ product }: ProductCardContent): ReactElement => {
    const [price, setPrice] = useState<string>('');
    const [image, setImage] = useState<Image | undefined>();

    useEffect(() => {
        if(product){
            if(product.masterData.current.masterVariant.images) setImage(product.masterData.current.masterVariant.images[0]);
            if(product.masterData.staged.masterVariant.prices){
                const currentPrice = product.masterData.staged.masterVariant.prices[0];
                setPrice(`${currentPrice.value.currencyCode} ${(currentPrice.value.centAmount / 100).toFixed(2)}`);
            }
        }
    }, [product]);

    return (
      <Link to={`/product/${product.id}`} className="product_card" key={product.id}>
        {image 
            ? <img src={image.url} alt={product.masterData.current.name['en-US']} className='product-card_image'/>
            : <div className='product-card_no-image'>No image</div>
        }
        <h3>{product.masterData.current.name['en-US']}</h3>
        <p>{price}</p>
      </Link>
    );
};
export default ProductCard;
