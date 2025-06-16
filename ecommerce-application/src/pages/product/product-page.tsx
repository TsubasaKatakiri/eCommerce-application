import { useParams } from 'react-router-dom';
import './product-page.css';
import { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProductById } from '../../api/get-product-by-id';
import { Category, CategoryReference, Image, ProductVariant } from '@commercetools/platform-sdk';
import { getCategories } from '../../api/get-categories';
import Slider from '../../components/slider/slider';
import { unsetCurrentProduct } from '../../store/product-slice';
import { loginUnauthorizedUser } from '../../api/unauthorized-login';
import { addToCart } from '../../api/add-to-cart';
import { removeFromCart } from '../../api/remove-from-cart';

const ProductPage: React.FC = () => {
    const {cart} = useAppSelector(state => state.user);
    const {currentProduct, categories} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(true);
    const [variantData, setVariantData] = useState<ProductVariant[]>([]);
    const [variants, setVariants] = useState<ReactElement[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
    const [images, setImages] = useState<Image[]>([]);
    const [price, setPrice] = useState<string>();
    const [category, setCategory] = useState<string[]>([]);
    const [imageSet, setImageSet] = useState<Image[]>([]);
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [lineItemId, setLineItemId] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    const getData = async(): Promise<void> => {
        if(productId){
         try {
            getProductById(productId, dispatch);
            if(categories.length === 0){
                getCategories(dispatch);
            }
          } catch {
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        }
    }

    useEffect(() => {
        setIsError(false);
        const token = localStorage.getItem('accessToken');
        if(!token){
            loginUnauthorizedUser()
            .then(() => getData())
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
        } else getData();
        return () => {dispatch(unsetCurrentProduct());}
    }, [productId]);

    useEffect(() => {
        if(currentProduct){
            let allVariants: ProductVariant[] = [currentProduct.masterData.staged.masterVariant];
            if(currentProduct.masterData.staged.variants){
                allVariants = [...allVariants, ...currentProduct.masterData.staged.variants];
            }
            setVariantData(allVariants);
            setSelectedVariant(allVariants[0]);
            const radioSwitches:ReactElement[] = [];
            allVariants.forEach((item) => {
                const element: ReactElement = (
                    <label htmlFor={`${item.key}`} className='product_variant' key={item.key}>
                        {item.images && item.images[0] && <img src={item.images[0].url} alt='' className='product_variant-img'/>}
                        <span className='product_variant-text'>{item.key}</span>
                        <input type='radio' name='variant' id={`${item.key}`} value={item.key} className='product_variant-input' onChange={() => setSelectedVariant(item)}/>
                    </label>
                )
                radioSwitches.push(element)
            })
            setVariants(radioSwitches);
        }
    }, [currentProduct]);

    useEffect(() => {
        if(selectedVariant){
            if(selectedVariant.images) setImages(selectedVariant.images);
            if(selectedVariant.prices){
                const currentPrice = selectedVariant.prices[0];
                setPrice(`${currentPrice.value.currencyCode} ${(currentPrice.value.centAmount / 100).toFixed(2)}`);
            }
        }
    }, [selectedVariant]);

    useEffect(() => {
        if(variantData){
            const images: Image[] = [];
            variantData.forEach(item => {
                if(item.images){
                    item.images.forEach(img => images.push(img))
                }
            })
            setImageSet(images);
        }
    }, [variantData])

    useEffect(() => {
        if(currentProduct && categories.length > 0){
            const productCategories: CategoryReference[] = currentProduct.masterData.staged.categories;
            const categoryNames: string[] = productCategories.map(item => {
                const categoryObject: Category | undefined = categories.find(cat => cat.id === item.id);
                if(categoryObject) return categoryObject.name['en-US'];
                else return ''
            })
            setCategory(categoryNames.filter(item => item !== ''));
        }
    }, [currentProduct, categories])


    useEffect(() => {
        if(cart && currentProduct){
            const items = cart.lineItems;
            const requiredItem = items.find(item => item.productId === currentProduct.id);
            console.log(requiredItem);
            if(requiredItem) {
                setIsInCart(true);
                setLineItemId(requiredItem.id)
            }
            else {
                setIsInCart(false);
                setLineItemId('')
            }
        }
    }, [cart, currentProduct])


    const handleAddToCart = async () => {
        if(cart && currentProduct){
            if(!isInCart){
                try {
                    await addToCart(cart.id, cart.version, currentProduct.id, dispatch, quantity, selectedVariant && selectedVariant.id);
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


    return (
        <div className='product_wrapper'>
            {currentProduct
                ? <>
                    <div className='product_header'>
                        <div className='product_images'>
                            {images.length > 0 
                            ? <Slider images={imageSet}/>
                            : <div>No image</div>}
                        </div>
                        <div className='product_data'>
                            <p className='product_category'>{category.join(', ')}</p>
                            <h3 className='product_name'>
                                {currentProduct.masterData.staged.name
                                ? currentProduct.masterData.staged.name['en-US']
                                : ''}
                            </h3>
                            <p className='product_price'>{price}</p>
                            <div className='product_variants'>
                                {variants.map((item) => item)}
                            </div>
                            <div>
                                <label htmlFor='quantity'>Quantity</label>
                                <input name='quantity' id='quantity' type='number' value={quantity} onChange={(event) => setQuantity(+event.target.value)}/>
                            </div>
                            <div className='product_buttons-buy'>
                                <button className='product_button-add' onClick={handleAddToCart}>
                                    {isInCart ? 'Remove from cart' : 'Add to cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='product_main'>
                            {selectedVariant
                            ? <div className='product_params'>
                                <h4>Product Parameters</h4>
                                <div className='product_params-list'>
                                    {selectedVariant.attributes && selectedVariant.attributes.map((item, index) => {
                                        if(typeof item.value==='string' || typeof item.value==='number'){
                                            return (<span className='product_param' key={index}>{item.name.split('-').slice(0, -1).join(' ')}: {item.value}</span>)
                                        }
                                    })}
                                </div>
                            </div>
                            : <></>}
                        <div className='product_description'>
                            <h4>Description:</h4>
                            {currentProduct.masterData.staged.description
                            ? <p>{currentProduct.masterData.staged.description['en-US']}</p>
                            : <p>No description provided</p>}
                        </div>
                    </div>
                </>
                : isLoading 
                    ? <>Loading...</> 
                    : isError ? <>Error</> : <></>
            }
        </div>
    );
};

export default ProductPage;