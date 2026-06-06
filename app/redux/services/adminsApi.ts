import { Category } from "@/app/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export interface Vendor {
  id: string;
  name: string;
  email: string;
}

export interface Size {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode?: string;
}

export interface Variant {
  id: string;
  sku: string;
  price: number;
  discountPrice: number;
  stock: number;

  productId: string;

  sizeId: string;
  colorId: string;

  createdAt: string;

  size?: Size;
  color?: Color;
}

export interface ProductImage {
  id: string;
  image: string;
  isPrimary: boolean;
  productId: string;
  createdAt: string;
}

export interface Product {
  id: string;

  title: string;
  slug: string;
  description: string;
  thumbnail: string;

  isActive: boolean;
  isSale: boolean;

  categoryId: string;
  category: Category;

  vendorId: string;
  vendor: Vendor;

  variants: Variant[];
  images: ProductImage[];

  createdAt: string;
  updatedAt: string;
}


export enum AuthProvider {
  CREDENTIALS = 'CREDENTIALS',
  GOOGLE = 'GOOGLE',
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
}


export const adminsApi = createApi({
  reducerPath: "adminsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/admin/",
    
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
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZTI3ZjgwMy1hOTJmLTRkMTQtOWQxOC04MTc4YzBjMDAxZmQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3ODA2NzcyODcsImV4cCI6MTc4MTI4MjA4N30.S5gdl2yn0aPuJVKXmjJyOJDhKSrCCJLBjAt8ak8LCAg`
        );

        return headers;
    },
  }),

  tagTypes: ["Admins"],

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
        query: () => "products",
        providesTags: ["Admins"],
    }),

    addProduct: builder.mutation< Product, FormData >({
        query: (data) => ({
            url: "products/",
            method: "POST",
            body: data,
    }),

    invalidatesTags: ["Admins"],
    }),

    updateProduct: builder.mutation<Product, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
            url: `products/${id}/`,
            method: "PATCH",
            body: data,
        }),

        invalidatesTags: ["Admins"],
    }),

    deleteProduct: builder.mutation<void, string>({
        query: (id) => ({
            url: `products/${id}`,
            method: "DELETE",
        }),

        invalidatesTags: ["Admins"],
    }),

    getUsers: builder.query<User[], void>({
        query: () => "users",
        providesTags: ["Admins"],
    }),

    updateRole: builder.mutation<User, { id: string; role: UserRole }>({
      query: ({ id, role }) => ({
        url: `users/${id}/role`,
        method: "PATCH",
        body: {
          role,
        },
      }),

      invalidatesTags: ["Admins"],
    }),

    createCategory: builder.mutation<Category, { data: FormData }>({
        query: ({ data }) => ({
            url: `categories/`,
            method: "POST",
            body: data,
        }),

        invalidatesTags: ["Admins"],
    }),

    updateCategory: builder.mutation<Category, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
            url: `categories/${id}/`,
            method: "PATCH",
            body: data,
        }),

        invalidatesTags: ["Admins"],
    }),

    deleteCategory: builder.mutation<Category, { id: string }>({
        query: ({ id }) => ({
            url: `categories/${id}/`,
            method: "DELETE"
        }),

        invalidatesTags: ["Admins"],
    }),

    

    

  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetUsersQuery,
  useUpdateRoleMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = adminsApi;