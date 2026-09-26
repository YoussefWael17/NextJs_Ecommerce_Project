import { GetPrommBannersResponse } from "@/app/types/promo-banners";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const promoBannerApi = createApi({
  reducerPath: "promoBannerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/promo-banners",
    }),

    tagTypes: ["PromoBanners"],

    endpoints: (builder) => ({
    
        getPromoBanners: builder.query< GetPrommBannersResponse, void>({
            query: () => "/",
            providesTags: ["PromoBanners"],
        }),
    
      }),
});

export const {
   useGetPromoBannersQuery
} = promoBannerApi;