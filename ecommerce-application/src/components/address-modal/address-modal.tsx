import { BaseAddress, Customer } from '@commercetools/platform-sdk';
import './address-modal.css';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { updateAddress } from '../../api/update-address';
import { showToast } from '../../store/toast-slice';

interface Properties {
    onClose: () => void,
    editingAddress: BaseAddress | undefined,
    customer: Customer,
}

const AddressModal: React.FC<Properties> = ({onClose, editingAddress, customer}: Properties) => {
    const dispatch = useAppDispatch();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [streetName, setStreetName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [country, setCountry] = useState<string>('DE');
    const [isBilling, setIsBilling] = useState<boolean>(false);
    const [isShipping, setIsShipping] = useState<boolean>(false);

    const [firstNameError, setFirstNameError] = useState<string | undefined>();
    const [lastNameError, setLastNameError] = useState<string | undefined>();
    const [streetNameError, setStreetNameError] = useState<string | undefined>();
    const [cityError, setCityError] = useState<string | undefined>();
    const [postalCodeError, setPostalCodeError] = useState<string | undefined>();

    useEffect(() => {
        if (editingAddress) {
            setFirstName(editingAddress.firstName || '');
            setLastName(editingAddress.lastName || '');
            setStreetName(editingAddress.streetName || '');
            setCity(editingAddress.city || '');
            setPostalCode(editingAddress.postalCode || '');
            setCountry(editingAddress.country || 'DE');
            if(customer.billingAddressIds && editingAddress.id){
                setIsBilling(customer.billingAddressIds.includes(editingAddress.id));
            }
            if(customer.shippingAddressIds && editingAddress.id){
                setIsShipping(customer.shippingAddressIds.includes(editingAddress.id));
            }
        } else {
            setFirstName('');
            setLastName('');
            setStreetName('');
            setCity('');
            setPostalCode('');
            setCountry('DE');
            setIsBilling(false);
            setIsShipping(false);
        }
  }, [editingAddress, customer]);

    const isFormValid = () => 
        firstName.trim() 
    && lastName.trim() 
    && streetName.trim() 
    && city.trim() 
    && postalCode.trim() 
    && country
    && (isBilling || isShipping)
    && !firstNameError
    && !lastNameError
    && !streetNameError
    && !cityError
    && !postalCodeError;

    const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setFirstName(event.target.value);
        const firstNameRegex = /^[A-Za-z\s-/]+$/;
        if(event.target.value.length === 0) setFirstNameError('Must contain at least one character');
        else if (firstNameRegex.test(event.target.value) === false) setFirstNameError('Must contain no special characters or numbers');
        else setFirstNameError(undefined);
    }

    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setLastName(event.target.value);
        const lastNameRegex = /^[A-Za-z\s-/]+$/;
        if(event.target.value.length === 0) setLastNameError('Must contain at least one character');
        else if (lastNameRegex.test(event.target.value) === false) setLastNameError('Must contain no special characters or numbers');
        else setLastNameError(undefined);
    }

    const handleStreetName = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setStreetName(event.target.value);
        if(event.target.value.length === 0) setStreetNameError('Must contain at least one character');
        else setStreetNameError(undefined);
    }

    const handleCity = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setCity(event.target.value);
        const cityRegex = /^[A-Za-z\s-/]+$/
        if(event.target.value.length === 0) setCityError('Must contain at least one character');
        else if (cityRegex.test(event.target.value) === false) setCityError('Must contain no special characters or numbers');
        else setCityError(undefined);
    }

    const handleCountry = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setCountry(event.target.value);
    }

    useEffect(() => {
        if(postalCode && postalCode.length > 0){
            checkPostalCode(country, postalCode, setPostalCodeError);
        }
    }, [postalCode, country])

    const handlePostalCode = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setPostalCode(event.target.value);
    }

    const onSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const addressData: BaseAddress = {
            firstName,
            lastName,
            streetName,
            city,
            country,
            postalCode
        }
        try{
            const version = +customer?.version;
            await updateAddress(customer?.id, version, addressData, isBilling, isShipping, dispatch, customer, editingAddress);
            dispatch(showToast({ status: 'success', text: editingAddress ? `Address updated successfully` : `New address added successfully` }));
            onClose();
        } catch (error){
            dispatch(showToast({ status: 'error', text: editingAddress ? `Failed to update address` : `Failed to add new address` }));
        }
    }

    return (
        <div className='modal_wrapper'>
            <div className='modal'>
                <div className='modal_header'>
                    <h3>{editingAddress ? 'Edit address' : 'Add address'}</h3>
                    <button type='button' onClick={onClose}>Close</button>
                </div>
                <form onSubmit={onSubmit} className='modal_body'>
                    <div className='modal-input_container'>
                        <label htmlFor='firstName'>
                            <span className='modal-input_label-text'>First Name</span>
                            <input
                                className='modal-input_label-field'
                                type="text"
                                name='firstName'
                                value={firstName}
                                onChange={(e) => handleFirstName(e)}
                            />
                        </label>
                        {firstNameError && <span className='modal-input_error'>{firstNameError}</span>}
                    </div>
                    <div className='modal-input_container'>
                        <label htmlFor='lastName'>
                            <span className='modal-input_label-text'>Last Name</span>
                            <input
                                className='modal-input_label-field'
                                type="text"
                                name='lastName'
                                value={lastName}
                                onChange={(e) => handleLastName(e)}
                            />
                        </label>
                        {lastNameError && <span className='modal-input_error'>{lastNameError}</span>}
                    </div>
                    <div className='modal-input_container'>
                        <label htmlFor='street'>
                            <span className='modal-input_label-text'>Street Name</span>
                            <input
                                className='modal-input_label-field'
                                type="text"
                                name='street'
                                value={streetName}
                                onChange={(e) => handleStreetName(e)}
                            />
                        </label>
                        {streetNameError && <span className='modal-input_error'>{streetNameError}</span>}
                    </div>
                    <div className='modal-input_container'>
                        <label htmlFor='city'>
                            <span className='modal-input_label-text'>City</span>
                            <input
                                className='modal-input_label-field'
                                type="text"
                                name='city'
                                value={city}
                                onChange={(e) => handleCity(e)}
                            />
                        </label>
                        {cityError && <span className='modal-input_error'>{cityError}</span>}
                    </div>
                    <div className='modal-input_container'>
                        <label htmlFor='country'>
                            <span className='modal-input_label-text'>Country</span>
                            <select className='modal-input_label-field' value={country} onChange={(e) => handleCountry(e)}>
                                <option value="DE" defaultChecked>Germany</option>
                                <option value="US">United States</option>
                                <option value="RU">Russia</option>
                                <option value="BY">Belarus</option>
                                <option value="FR">France</option>
                                <option value="ES">Spain</option>
                            </select>
                        </label>
                    </div>
                    <div className='modal-input_container'>
                        <label htmlFor='postalCode'>
                            <span className='modal-input_label-text'>Postal code</span>
                            <input
                                className='modal-input_label-field'
                                type="text"
                                name='postalCode'
                                value={postalCode}
                                onChange={(e) => handlePostalCode(e)}
                            />
                        </label>
                        {postalCodeError && <span className='modal-input_error'>{postalCodeError}</span>}
                    </div>
                    <label className='modal-checkbox_label'>
                        <input
                            type="checkbox"
                            checked={isBilling}
                            onChange={(e) => setIsBilling(e.target.checked)}
                        />
                            <span className='modal-checkbox_label-text'>Use as Billing Address</span>
                    </label>
                    <label className='modal-checkbox_label'>
                        <input
                        type="checkbox"
                        checked={isShipping}
                        onChange={(e) => setIsShipping(e.target.checked)}
                        />
                            <span className='modal-checkbox_label-text'>Use as Shipping Address</span>
                    </label>
                    <div className='modal_footer'>
                        <button type="submit" disabled={!isFormValid()}>
                            Save
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressModal;



function checkPostalCode(country: string, code: string, setError: (error: string|undefined) => void){
    console.log(country);
    console.log(code.length);
    if(code.length === 0) setError('Must contain at least one character');
    else if ((country === 'BY' || country === 'RU') && code.length !== 6) {
        setError('Must follow the format for the country (XXXXXX)');
    }
    else if ((country === 'FR' || country === 'DE' || country === 'ES' || country === 'US') && code.length !== 5) {
        setError('Must follow the format for the country (XXXXX)');
    }
    else setError(undefined);
}