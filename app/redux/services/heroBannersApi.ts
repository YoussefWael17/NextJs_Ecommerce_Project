import { Category } from "@/app/types/category";
import { GetHeroBannersResponse } from "@/app/types/hero-banners";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroBannersApi = createApi({
  reducerPath: "heroBannersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/hero-banners",
    }),

    tagTypes: ["HeroBanners"],

    endpoints: (builder) => ({
    
        getHeroBanners: builder.query<{ data: GetHeroBannersResponse}, void>({
            query: () => "/",
            providesTags: ["HeroBanners"],
        }),
    
      }),
});

export const {
   useGetHeroBannersQuery
} = heroBannersApi;