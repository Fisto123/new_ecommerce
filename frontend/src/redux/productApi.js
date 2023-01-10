import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/products" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "api/getProduct",
    }),
  }),
});
export const { useGetAllProductsQuery } = productsApi;

//finished

