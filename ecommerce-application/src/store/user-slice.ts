import { Cart, Customer } from "@commercetools/platform-sdk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    customer: Customer | null,
    cart: Cart | null,
}

const initialState: UserState = {
    customer: getStoredCustomer(),
    cart: getStoredCart()
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<{customer: Customer, cart?: Cart}>) => {
            state.customer = payload.customer;
            localStorage.setItem('customer', JSON.stringify(payload.customer));
            if(payload.cart){
                state.cart = payload.cart;
                localStorage.setItem('cart', JSON.stringify(payload.cart));
            }
        },
        clearUser: (state) => {
            state.customer = null;
            state.cart = null;
            localStorage.removeItem('customer');
            localStorage.removeItem('cart');
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


function getStoredCustomer(): Customer | null {
    const data: string | null = localStorage.getItem('customer');
    if(data) {
        return JSON.parse(data);
    }
    return null;
}

function getStoredCart(): Cart | null {
    const data: string | null = localStorage.getItem('cart');
    if(data) {
        return JSON.parse(data);
    }
    return null;
}