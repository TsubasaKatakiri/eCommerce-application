import type { Category, Product } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
  categories: Category[];
  currentProduct: Product | undefined;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  currentProduct: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<{products: Product[]}>) => {
      state.products = payload.products;
    },
    setCategories: (state, { payload }: PayloadAction<{categories: Category[]}>) => {
        state.categories = payload.categories;  
    },
    setCurrentProduct: (state, { payload }: PayloadAction<{currentProduct: Product}>) => {
        state.currentProduct = payload.currentProduct;  
    },
    unsetCurrentProduct: (state) => {
        state.currentProduct = undefined;  
    },
  },
});

export const { setProducts, setCategories, setCurrentProduct, unsetCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
