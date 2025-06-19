import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './addresses.css'
import { BaseAddress } from '@commercetools/platform-sdk';
import AddressCard from '../address-card/address-card';
import AddressModal from '../address-modal/address-modal';
import { setDefaultAddress } from '../../api/set-default-address';
import { deleteAddress } from '../../api/delete-address';
import { showToast } from '../../store/toast-slice';

const Addresses: React.FC = () => {
    const customer = useAppSelector((state) => state.user.customer);
    const dispatch = useAppDispatch();

    const [addresses, setAddresses] = useState<BaseAddress[]>([]);
    const [billingAddressIds, setBillingAddressIds] = useState<string[] | undefined>();
    const [shippingAddressIds, setShippingAddressIds] = useState<string[] | undefined>();
    const [defaultBillingAddressId, setDefaultBillingAddressId] = useState<string | undefined>();
    const [defaultShippingAddressId, setDefaultShippingAddressId] = useState<string | undefined>();

    const [billingAddresses, setBillingAddresses] = useState<BaseAddress[]>([]);
    const [shippingAddresses, setShippingAddresses] = useState<BaseAddress[]>([]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editingAddress, setEditingAddress] = useState<BaseAddress | undefined>();

    useEffect(() => {
        if(customer) {
            setAddresses(customer.addresses);
            setBillingAddressIds(customer.billingAddressIds);
            setShippingAddressIds(customer.shippingAddressIds);
            setDefaultBillingAddressId(customer.defaultBillingAddressId);
            setDefaultShippingAddressId(customer.defaultShippingAddressId);
        }
    }, [customer])

    useEffect(() => {
        if(addresses){
            setBillingAddresses(addresses.filter(item => {
                if(item.id) return billingAddressIds?.includes(item.id);
            }));
            setShippingAddresses(addresses.filter(item => {
                if(item.id) return shippingAddressIds?.includes(item.id);
            }));
        }
    }, [addresses, billingAddressIds, shippingAddressIds])

    const handleAddAddress = (): void => {
        setEditingAddress(undefined);
        setModalOpen(true);
    }

    const handleEditAddress = (address: BaseAddress): void => {
        setEditingAddress(address);
        setModalOpen(true);
    }

    const handleDeleteAddress = async (addressId: string): Promise<void> => {
        if(customer){
            try{
                const version = +customer?.version;
                await deleteAddress(customer?.id, version, addressId, dispatch);
                dispatch(showToast({ status: 'success', text: 'Address deleted successfully' }));
            } catch (error){
                dispatch(showToast({ status: 'error', text: 'Error: Failed to delete address' }));
            }
        }
    }

    const handleSetDefault = async (addressId: string, type: 'billing' | 'shipping', ): Promise<void> => {
        if(customer){
            try{
                const version = +customer?.version;
                await setDefaultAddress(customer?.id, version, type, addressId, dispatch);
                dispatch(showToast({ status: 'success', text: 'Set default address successfully' }));
            } catch (error){
                dispatch(showToast({ status: 'error', text: 'Error: Failed to set default address' }));
            } finally {
                console.log('process finished');
            }
        }
    }

    return (
        <div className='addresses_wrapper'>
            <div className='addresses_header'>
                <h2 className='addresses_title'>User Addresses</h2>
                <button className='addresses_button' onClick={handleAddAddress}>Add...</button>
            </div>
            <div className='addresses_container'>
                <div className='addresses_column'>
                    <h4 className='addresses_column-title'>Billing addresses</h4>
                    <div className='addresses_column-content'>
                        {billingAddresses.map(address => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                type="billing"
                                isDefault={address.id === defaultBillingAddressId}
                                onEdit={handleEditAddress}
                                onDelete={handleDeleteAddress}
                                onSetDefault={handleSetDefault}
                            />
                        ))}
                    </div>
                </div>
                <div className='addresses_column'>
                    <h4 className='addresses_column-title'>Shipping addresses</h4>
                    <div className='addresses_column-content'>
                        {shippingAddresses.map(address => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                type="shipping"
                                isDefault={address.id === defaultShippingAddressId}
                                onEdit={handleEditAddress}
                                onDelete={handleDeleteAddress}
                                onSetDefault={handleSetDefault}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {customer && modalOpen && <AddressModal onClose={() => setModalOpen(false)} editingAddress={editingAddress} customer={customer}/>}
        </div>
    );
};

export default Addresses;