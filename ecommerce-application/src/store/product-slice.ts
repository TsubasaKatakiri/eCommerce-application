import type { Category, Product,  ProductPagedSearchResponse, ProductProjection } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: ProductProjection[];
  total: number,
  offset: number,
  limit: number,
  searchTerm: string,
  categories: Category[],
  currentCategory: Category | undefined,
  currentProduct: Product | undefined;
}

const initialState: ProductState = {
  products: [],
  total: 0,
  offset: 0,
  limit: 10,
  searchTerm: '',
  categories: [],
  currentCategory: undefined,
  currentProduct: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<{response: ProductPagedSearchResponse}>) => {
      state.total = payload.response.total ?? 0;
      state.offset = payload.response.offset;
      state.limit = payload.response.limit;
      const products = payload.response.results
        .map((item) => item.productProjection)
        .filter((product) => product !== undefined);
      state.products = products;
    },
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
        state.searchTerm = payload;  
    },
    setCategories: (state, { payload }: PayloadAction<{categories: Category[]}>) => {
        state.categories = payload.categories;  
    },
    setCurrentCategory: (state, { payload }: PayloadAction<Category | undefined>) => {
        state.currentCategory = payload;
    },
    setCurrentProduct: (state, { payload }: PayloadAction<{currentProduct: Product}>) => {
        state.currentProduct = payload.currentProduct;  
    },
    unsetCurrentProduct: (state) => {
        state.currentProduct = undefined;  
    },
  },
});

export const { setProducts, setSearchTerm, setCategories, setCurrentCategory, setCurrentProduct, unsetCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
