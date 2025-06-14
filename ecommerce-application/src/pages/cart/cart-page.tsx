import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './cart-page.css';
import { ReactElement, useEffect, useState } from 'react';
import { routeList } from '../../const/routes';
import { LineItem } from '@commercetools/platform-sdk';
import { removeFromCart } from '../../api/remove-from-cart';
import { clearCart } from '../../api/clear-cart';
import { addToCart } from '../../api/add-to-cart';

const CartPage = () => {
    const {cart} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [items, setItems] = useState<LineItem[]>([]);
    const [itemElements, setItemElements] = useState<ReactElement[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(cart){
            setItems(cart.lineItems);
        }
    }, [cart])

    const handleClearCart = () => {
        if (cart) {
            const { id, version, lineItems } = cart;
            const lineItemIds = lineItems.map(item => item.id);
            clearCart(id, version, lineItemIds, dispatch);
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
                            <span>{item.name['en-US']}</span>
                            <span>{item.variant.attributes && item.variant.attributes[4].value}</span>
                            <span>{item.variant.sku}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <input type='number' min={0} step={1} value={item.quantity} onChange={(event) => handleAmountChange(event, item)}/>
                </td>
                <td>
                    <span>{item.totalPrice.currencyCode} {(item.totalPrice.centAmount / 100).toFixed(item.totalPrice.fractionDigits)}</span>
                </td>
                <td>
                    <button onClick={() => handleRemoveItem(item)}>Remove</button>
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
                    <button onClick={() => navigate(routeList.MAIN)}>To catalog</button>
                </div>
                : <div className='cart_contents'>
                    <div className='cart_contents-header'>
                        <button onClick={handleClearCart}>Clear cart</button>
                    </div>
                    <table className='cart_table'>
                        <thead className='cart_table-header'>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemElements}
                        </tbody>
                    </table>
                </div>
            }
            </div>
        </div>
    );
};

export default CartPage;