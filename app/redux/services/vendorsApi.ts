import { BannerRequest, BannerRequestsResponse } from "@/app/types/banner-request";
import { Order, OrdersResponse } from "@/app/types/orders-response";
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
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmM2OWNkMi02N2QwLTQ0ODktYmMyZS03NDI1YTg3MjY4NTMiLCJyb2xlIjoiVkVORE9SIiwiaWF0IjoxNzkwMDE2MjEyLCJleHAiOjE3OTA2MjEwMTJ9.oEyCJ5RNKL3SAYpN_CDIgqP5RMDN8frwXUlqAIgokbI`
            // `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmM2OWNkMi02N2QwLTQ0ODktYmMyZS03NDI1YTg3MjY4NTMiLCJyb2xlIjoiVkVORE9SIiwiaWF0IjoxNzg0NTcwMzI4LCJleHAiOjE3ODUxNzUxMjh9.axTPZo03URc285d_L1iFa97WtySW65N_yPhmwlSC3L8`
        );

        return headers;
    },
  }),

    tagTypes: ["Vendors"],
  
    endpoints: (builder) => ({
        getProducts: builder.query <ProductsResponse ,{ page?: number, limit?: number, search?: string}> ({
            query: ({ page, limit, search = "" }) => `products?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
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

        getOrders: builder.query <OrdersResponse ,{ page?: number, limit?: number, search: string}> ({
            query: ({ page, limit, search = "" }) => `orders?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ["Vendors"],
        }),

        getSingleOrder: builder.query<{ success: Boolean, data:Order}, string>({
            query: (id) => `orders/${id}`,
            providesTags: ["Vendors"],
        }),

        createBannerRequest: builder.mutation< BannerRequest, { productId: string; icon?: string; offerPercentage?: number; note?: string;} >({
            query: (data) => ({
                url: "banner-requests/",
                method: "POST",
                body: data,
        }),
            invalidatesTags: ["Vendors"],
        }),

        getBannerReqHistory: builder.query <BannerRequestsResponse ,{ page?: number, limit?: number, search?: string}> ({
            query: ({ page=1, limit=10, search = "" }) => `banner-requests/history?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ["Vendors"],
        }),

        getSingleBannerRequest: builder.query<{ success: Boolean, data: BannerRequest}, string>({
            query: (id) => `banner-requests/history/${id}`,
            providesTags: ["Vendors"],
        }),

        deleteSingleBannerRequest: builder.mutation<void, string>({
            query: (id) => ({
                url: `banner-requests/history/${id}`,
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
    useGetOrdersQuery,
    useGetSingleOrderQuery,
    useCreateBannerRequestMutation,
    useGetBannerReqHistoryQuery,
    useGetSingleBannerRequestQuery,
    useDeleteSingleBannerRequestMutation
    
} = vendorsApi;