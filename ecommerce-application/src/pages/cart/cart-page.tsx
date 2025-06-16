import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './cart-page.css';
import { ReactElement, useEffect, useState } from 'react';
import { routeList } from '../../const/routes';
import { LineItem } from '@commercetools/platform-sdk';
import { removeFromCart } from '../../api/remove-from-cart';
import { clearCart } from '../../api/clear-cart';
import { addToCart } from '../../api/add-to-cart';
import CartClearIcon from '../../assets/svg/cart-xmark.svg?react';
import { useScreenSize } from '../../hooks/use-screen-size';
import { showToast } from '../../store/toast-slice';

const CartPage = () => {
    const {cart} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<LineItem[]>([]);
    const [itemElements, setItemElements] = useState<ReactElement[]>([]);
    const navigate = useNavigate();
    const smallScreen = useScreenSize();

    useEffect(() => {
        if(cart){
            setItems(cart.lineItems);
        }
    }, [cart])

    const handleClearCart = async () => {
        if (cart) {
            const { id, version, lineItems } = cart;
            const lineItemIds = lineItems.map(item => item.id);
            try {
                await clearCart(id, version, lineItemIds, dispatch);
                dispatch(showToast({ status: 'success', text: `Cart cleared successfully` }));
            } catch {
                dispatch(showToast({ status: 'error', text: `Failed to clear the cart` }));
            }
        }
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>, item: LineItem) => {
        const newQuantityStr = event.target.value;
        const newQuantity = parseInt(newQuantityStr, 10);
        if (isNaN(newQuantity) || newQuantity < 0) {
            return;
        }
        if (cart) {
            const { id, version } = cart;
            if (newQuantity === 0) {
                removeFromCart(id, version, item.id, dispatch);
            } else if (newQuantity > item.quantity) {
                const quantityToAdd = newQuantity - item.quantity;
                addToCart(id, version, item.productId, dispatch, quantityToAdd, item.variant.id);
            } else if (newQuantity < item.quantity) {
                const quantityToRemove = item.quantity - newQuantity;
                removeFromCart(id, version, item.id, dispatch, quantityToRemove);
            }
        }
    }

    const handleRemoveItem = (item: LineItem) => {
        if (cart) {
            const { id, version } = cart;
            removeFromCart(id, version, item.id, dispatch);
        }
    };

    useEffect(() => {
        const rows: ReactElement[] = [];
        items.forEach(item => {
            const row = (<tr>
                <td>
                    <div className='row-item_wrapper'>
                        {item.variant.images && item.variant.images.length > 0 
                            ? <img src={item.variant.images[0].url} alt='' className='row-item_image'/> 
                            : <div className='row-item_empty-image'>No image</div>}
                        <div className='row-item_info'>
                            <Link to={`/product/${item.productId}`} className='row-item_name'>{item.name['en-US']}</Link>
                            <span className='row-item_variant'>{item.variant.attributes && item.variant.attributes[4].value}</span>
                            <span className='row-item_sku'>{item.variant.sku}</span>
                        </div>
                    </div>
                </td>
                <td className='cart_table-cell__short'>
                    <input className='row-item_counter' type='number' min={0} step={1} value={item.quantity} onChange={(event) => handleAmountChange(event, item)}/>
                </td>
                <td className='cart_table-cell__short'>
                    <span className='row-item_price'>{item.totalPrice.currencyCode} {(item.totalPrice.centAmount / 100).toFixed(item.totalPrice.fractionDigits)}</span>
                </td>
                <td className='cart_table-cell__short'>
                    <button className='row-item_remove-button' onClick={() => handleRemoveItem(item)}>
                        {smallScreen ? <CartClearIcon/> : 'Remove'}
                    </button>
                </td>
            </tr>)
            rows.push(row);
        })
        setItemElements(rows);
    }, [items])

    return (
        <div className='cart_wrapper'>
            <h2 className='cart_header'>Cart</h2>
            <div className='cart_inner'>
            {items.length === 0 
                ? <div className='cart_empty-placeholder'>
                    <span className='cart_empty-text'>The cart is currently empty. Do you want to add some items?</span>
                    <button className='cart_contents-button' onClick={() => navigate(routeList.MAIN)}>To catalog</button>
                </div>
                : <div className='cart_contents'>
                    <div className='cart_contents-header'>
                        <button className='cart_contents-button' onClick={handleClearCart}>
                            <CartClearIcon/>
                            Clear cart
                        </button>
                    </div>
                    <table className='cart_table'>
                        <thead className='cart_table-header'>
                            <tr>
                                <th>Item</th>
                                <th className='cart_table-cell__short'>Quantity</th>
                                <th className='cart_table-cell__short'>Price</th>
                                <th className='cart_table-cell__short'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemElements}
                        </tbody>
                        <tfoot className='cart_table-footer'>
                            <tr>
                                <th></th>
                                <th className='cart_table-cell__short'>Total price</th>
                                <th className='cart_table-cell__short'>
                                    <span className='row-item_price'>
                                        {cart && `${cart.totalPrice.currencyCode} ${(cart.totalPrice.centAmount / 100).toFixed(cart.totalPrice.fractionDigits)}`}
                                    </span>
                                </th>
                                <th className='cart_table-cell__short'></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
            </div>
        </div>
    );
};

export default CartPage;