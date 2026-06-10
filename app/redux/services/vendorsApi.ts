import { Product } from "@/app/types/product";
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
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZjQzZmUwNS1mODI0LTRjYzItOTA5Ni1hZDBjMDUzMDY5OTUiLCJyb2xlIjoiVkVORE9SIiwiaWF0IjoxNzgxMDk0MzY2LCJleHAiOjE3ODE2OTkxNjZ9.-YDRcOpKFBP1UcHeic1v3hmmRXD5rfwCVSEQRmZljr4`
        );

        return headers;
    },
  }),

    tagTypes: ["Vendors"],
  
    endpoints: (builder) => ({
        getProducts: builder.query<{ success: Boolean, data:Product[]}, void>({
            query: () => "products",
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

        

    }),
});
      
export const {
    useGetProductsQuery,
    useGetSingleProductQuery,
    useAddProductMutation,
    
} = vendorsApi;