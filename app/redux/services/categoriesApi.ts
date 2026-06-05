import { Category } from "@/app/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/categories",
    }),

    tagTypes: ["Categories"],

    endpoints: (builder) => ({
    
        getCategories: builder.query<{ data: Category[]}, void>({
            query: () => "/",
            providesTags: ["Categories"],
        }),
    
      }),
});

export const {
  useGetCategoriesQuery
} = categoriesApi;