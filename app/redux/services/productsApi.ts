import { Product } from "@/app/types/product";
import { ProductsResponse } from "@/app/types/products-response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/products`,
    }),

    tagTypes: ["Products"],

    endpoints: (builder) => ({
            getProducts: builder.query<ProductsResponse, void>({
                query: () => `/`,
                providesTags: ["Products"],
            }),
        })
})


export const {
    useGetProductsQuery
} = productsApi;
