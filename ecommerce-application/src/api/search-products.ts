import type {  Category, ProductPagedSearchResponse, ProductSearchRequest } from "@commercetools/platform-sdk";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setProducts } from "../store/product-slice";
import type { Filters } from "../types/filters";

export const searchProducts = async (
  limit: number,
  dispatch: Dispatch<UnknownAction>,
  filters: Filters,
  page?: number,
  category?: Category,
  queryString?: string,
): Promise<void> => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error('Invalid token');

  const searchQuery: ProductSearchRequest = {
    limit: limit,
    offset: page ? limit * page : 0,
    markMatchingVariants: true,
    productProjectionParameters: {
      staged: true,
    },
  };

  const queryConditions: unknown[] = [];

  if (queryString && queryString.length > 0) {
    queryConditions.push({
      fullText: {
        field: "name",
        language: "en-US",
        value: queryString,
        mustMatch: "any",
      },
    });
  }

  if (category && category.id) {
    queryConditions.push({
      exact: {
        field: "categories",
        value: category.id,
      },
    });
  }

  if ((filters.minPrice !== undefined) || (filters.maxPrice !== undefined)) {
    const rangeCondition: unknown = {
      range: {
        field: "variants.prices.centAmount",
        fieldType: "number",
      },
    };
    if (filters.minPrice !== undefined) {
      rangeCondition.range.gte = filters.minPrice * 100;
    }
    if (filters.maxPrice !== undefined) {
      rangeCondition.range.lte = filters.maxPrice * 100;
    }
    queryConditions.push(rangeCondition);
  }

  if (filters.material) {
    queryConditions.push({
      exact: {
        field: "variants.attributes.Material-01",
        fieldType: "text",
        value: filters.material,
      },
    });
  }

  if (filters.minWidth !== undefined || filters.maxWidth !== undefined) {
    const rangeCondition: unknown = {
      range: {
        field: "variants.attributes.Roll-width-02",
        fieldType: "number",
      },
    };
    if (filters.minWidth !== undefined) {
      rangeCondition.range.gte = filters.minWidth;
    }
    if (filters.maxWidth !== undefined) {
      rangeCondition.range.lte = filters.maxWidth;
    }
    queryConditions.push(rangeCondition);
  }

  if (queryConditions.length > 0) {
    searchQuery.query = queryConditions.length === 1 ? queryConditions[0] : { and: queryConditions };
  }

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
  const productData:ProductPagedSearchResponse = await response.json();
  dispatch(setProducts({response: productData}));
};