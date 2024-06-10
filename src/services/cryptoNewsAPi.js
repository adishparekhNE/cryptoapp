import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "c6d685ea50msh8b4cb6984f2806cp172313jsnc0c7606863fd",
  "X-RapidAPI-Host": "google-api31.p.rapidapi.com",
};

const baseUrl = "https://google-api31.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      Object.entries(cryptoNewsHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchCryptoNews: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFetchCryptoNewsMutation } = cryptoNewsApi;
