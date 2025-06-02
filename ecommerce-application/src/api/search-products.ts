import type { ProductPagedQueryResponse, ProductSearchRequest } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setProducts } from "../store/product-slice";

export const searchProducts = async (dispatch: Dispatch<UnknownAction>, queryString?: string): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');

  let searchQuery: ProductSearchRequest  = {
    "limit": 50,
    "offset": 0
  };

  if(queryString && queryString.length > 0) searchQuery = {query: {fullText: {field: "name", language: "en", value: queryString}}, ...searchQuery};

  const url = `${apiHost}${projectKey}/products/search`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(searchQuery),
  });

  if (!response.ok) {
    throw new Error('Failed to get products');
  }
  const productData:ProductPagedQueryResponse = await response.json();
  console.log(productData);
  dispatch(setProducts({ products: productData.results }));
};