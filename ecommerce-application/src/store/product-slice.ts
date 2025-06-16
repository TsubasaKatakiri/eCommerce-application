import type { Category, DiscountCode, Product,  ProductPagedSearchResponse, ProductProjection } from '@commercetools/platform-sdk';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Filters } from '../types/filters';

interface ProductState {
  products: ProductProjection[];
  discountCodes: DiscountCode[];
  total: number,
  offset: number,
  limit: number,
  searchTerm: string,
  filters: Filters,
  categories: Category[],
  currentCategory: Category | undefined,
  currentProduct: Product | undefined;
}

const initialState: ProductState = {
  products: [],
  discountCodes: [],
  total: 0,
  offset: 0,
  limit: 10,
  searchTerm: '',
  filters: {
    minPrice: undefined,
    maxPrice: undefined,
    material: undefined,
    minWidth: undefined,
    maxWidth: undefined,
  },
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
    setDiscountCodes: (state, { payload }: PayloadAction<DiscountCode[]>) => {
        state.discountCodes = payload;  
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
    setFilters: (state, { payload }: PayloadAction<Filters>) => {
      state.filters = payload;
    },
    setCurrentProduct: (state, { payload }: PayloadAction<{currentProduct: Product}>) => {
        state.currentProduct = payload.currentProduct;  
    },
    unsetCurrentProduct: (state) => {
        state.currentProduct = undefined;  
    },
  },
});

export const { setProducts, setDiscountCodes, setSearchTerm, setCategories, setCurrentCategory, setFilters, setCurrentProduct, unsetCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
