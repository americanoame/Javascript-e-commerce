import { PRODUCTS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;


// The purpose of extending apiSlice with injectEndpoints to create productsApiSlice is to define specific 
// API endpoints for fetching product data (like all products and individual product details) while leveraging
 // Redux Toolkit's powerful caching and data fetching capabilities. This allows for cleaner, modular code and 
 // efficient state management in your application.