import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const meowyApi = createApi({
  reducerPath: 'meowyApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: () => ({}),
});

export const {} = meowyApi;
