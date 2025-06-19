import { useNavigate } from 'react-router-dom';
import { useEffect, useState, type ReactElement } from 'react';
import './product-card.css';
import { Image, ProductProjection } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../api/add-to-cart';
import { removeFromCart } from '../../api/remove-from-cart';
import CartIcon from '../../assets/svg/cart.svg?react';

interface ProductCardContent {
    product: ProductProjection
}

const ProductCard = ({ product }: ProductCardContent): ReactElement => {
    const {cart} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [price, setPrice] = useState<string>('');
    const [image, setImage] = useState<Image | undefined>();
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [lineItemId, setLineItemId] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if(product){
            if(product.masterVariant.images) setImage(product.masterVariant.images[0]);
            if(product.masterVariant.prices){
                const currentPrice = product.masterVariant.prices[0];
                setPrice(`${currentPrice.value.currencyCode} ${(currentPrice.value.centAmount / 100).toFixed(2)}`);
            }
        }
    }, [product]);

    useEffect(() => {
        if(cart){
            const items = cart.lineItems;
            const requiredItem = items.find(item => item.productId === product.id);
            if(requiredItem) {
                setIsInCart(true);
                setLineItemId(requiredItem.id)
            }
            else {
                setIsInCart(false);
                setLineItemId('')
            }
        }
    }, [cart])

    const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if(cart){
            if(!isInCart){
                try {
                    await addToCart(cart.id, cart.version, product.id, dispatch);
                    setIsInCart(true);
                } catch (error) {
                    console.log('error');
                }
            } else {
                try {
                    await removeFromCart(cart.id, cart.version, lineItemId, dispatch);
                    setIsInCart(false);
                } catch (error) {
                    console.log('error');
                }
            }
        }
    }

    const handleMoveToDetails = () => {
        navigate(`/product/${product.id}`);
    }

    return (
      <div className="product-card" key={product.id} onClick={handleMoveToDetails}>
        <div className='product-card_image-container'>
            {image 
                ? <img src={image.url} alt={product.name['en-US']} className='product-card_image'/>
                : <div className='product-card_no-image'>No image</div>
            }
        </div>
        <span className='product-card_title'>{product.name['en-US']}</span>
        <span className='product-card_price'>{price}</span>
        <button className='product-card_cart-button' onClick={(event) => handleAddToCart(event)}>
            <CartIcon/>
            {isInCart ? 'Remove from cart' : 'Add to cart'}
        </button>
      </div>
    );
};
export default ProductCard;
