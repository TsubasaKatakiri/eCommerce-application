import type { BaseAddress, Customer, CustomerUpdateAction } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setUser } from "../store/user-slice";

export const updateAddress = async (id: string, version: number, addressData: BaseAddress, isBilling: boolean, isShipping: boolean, dispatch: Dispatch<UnknownAction>, customer: Customer, editingAddress?: BaseAddress): Promise<void> => {
    const apiHost = import.meta.env.VITE_API_HOST;
    const projectKey = import.meta.env.VITE_PROJECT_KEY;
  
    const token = localStorage.getItem('accessToken');
    if(!token) throw new Error('Invalid access token');

    const actions: CustomerUpdateAction[] = [];

    if(editingAddress){
        actions.push({
            action: 'changeAddress',
            addressId: editingAddress.id,
            address: addressData,
        });
        if(customer && customer.billingAddressIds && editingAddress.id){
            const wasBilling = customer.billingAddressIds.includes(editingAddress.id);
            if (isBilling && !wasBilling) {
                actions.push({ action: 'addBillingAddressId', addressId: editingAddress.id });
            } else if (!isBilling && wasBilling) {
                actions.push({ action: 'removeBillingAddressId', addressId: editingAddress.id });
            }
        }
        if(customer && customer.shippingAddressIds && editingAddress.id){
            const wasShipping = customer.shippingAddressIds.includes(editingAddress.id);
            if (isShipping && !wasShipping) {
                actions.push({ action: 'addShippingAddressId', addressId: editingAddress.id });
            } else if (!isShipping && wasShipping) {
                actions.push({ action: 'removeShippingAddressId', addressId: editingAddress.id });
            }
        }
    } else {
        const addressKey = `address-${Date.now()}`;
        actions.push({
            action: 'addAddress',
            address: { ...addressData, key: addressKey },
        });
        if (isBilling) {
            actions.push({ action: 'addBillingAddressId', addressKey });
        }
        if (isShipping) {
            actions.push({ action: 'addShippingAddressId', addressKey });
        }
    }

    const url = `${apiHost}${projectKey}/customers/${id}`
    const parameters = {
      version: version,
      actions: actions,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update user address');
    }
    const customerData: Customer = await response.json();
    dispatch(setUser({ customer: customerData }));
};