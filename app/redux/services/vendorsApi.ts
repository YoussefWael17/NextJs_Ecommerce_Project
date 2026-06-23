import { Product } from "@/app/types/product";
import { ProductsResponse } from "@/app/types/products-response";
import { UpdateVariantPayload, Variant } from "@/app/types/variant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorsApi = createApi({
  reducerPath: "vendorsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/vendor/",
    
    prepareHeaders: (headers) => {
        // const token =
        // typeof window !== "undefined"
        //     ? localStorage.getItem("token")
        //     : null;

        // if (token) {
        // headers.set(
        //     "authorization",
        //     `Bearer ${token}`
        // );
        // }

        headers.set(
            "authorization",
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmM2OWNkMi02N2QwLTQ0ODktYmMyZS03NDI1YTg3MjY4NTMiLCJyb2xlIjoiVkVORE9SIiwiaWF0IjoxNzgxOTU4MTMxLCJleHAiOjE3ODI1NjI5MzF9.C0BzD9GYiD8bAaFsa6EXIhiyHpmgmzywE5hme1y-HOU`
        );

        return headers;
    },
  }),

    tagTypes: ["Vendors"],
  
    endpoints: (builder) => ({
        getProducts: builder.query <ProductsResponse ,{ page?: number, limit?: number}> ({
            query: ({ page, limit }) => `products?page=${page}&limit=${limit}`,
            providesTags: ["Vendors"],
        }),

        getSingleProduct: builder.query<{ success: Boolean, data:Product}, string>({
            query: (id) => `products/${id}`,
            providesTags: ["Vendors"],
        }),

        addProduct: builder.mutation< Product, FormData >({
            query: (data) => ({
                url: "products/",
                method: "POST",
                body: data,
        }),
            invalidatesTags: ["Vendors"],
        }),

        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Vendors"],
        }),

        addProductVariant: builder.mutation<Variant, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `products/${id}/variants`,
                method: "POST",
                body: data,
        }),
            invalidatesTags: ["Vendors"],
        }),

        updateProductVariant: builder.mutation<Variant, UpdateVariantPayload>({
            query: ({ id, data }) => ({
                url: `variants/${id}`,
                method: "PATCH",
                body: data,
            }),

            invalidatesTags: ["Vendors"],
        }),

        deleteProductVariant: builder.mutation<void, string>({
            query: (id) => ({
                url: `variants/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Vendors"],
        }),

        

    }),
});
      
export const {
    useGetProductsQuery,
    useGetSingleProductQuery,
    useAddProductMutation,
    useAddProductVariantMutation,
    useDeleteProductVariantMutation,
    useUpdateProductVariantMutation,
    useDeleteProductMutation,
    
} = vendorsApi;