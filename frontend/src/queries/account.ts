import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getAccessToken} from "@/slices/account/AccountSlice";


export const accountApi = createApi({
    
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        prepareHeaders: (headers, { getState }) => {
            const accessToken = getAccessToken(getState());
          
            if (accessToken) {
              headers.set("Authorization", `Bearer ${accessToken}`);
            }
          
            return headers;
          },
    }),
    tagTypes: ["token"],
    endpoints: (builder) => ({
        createNewUser: builder.mutation({
            query: (credentials) => ({
                url: '/users/create',
                method: 'POST',
                body: credentials
            })
        }),
        loginUser: builder.mutation({
            query: (formData) => {
              let loginData = null;
              if (formData instanceof HTMLElement) {
                loginData = new FormData(formData);
              } else {
                loginData = new FormData();
                loginData.append("username", formData.username);
                loginData.append("password", formData.password);
              }
              return {
                url: "/users/login",
                method: "POST",
                body: loginData,
              };
            },
            invalidatesTags: ["token"],
          }),
        getUsersClasses: builder.query({
            query: () => ({
                url: "/classrooms",
                method: "GET",
                credentials: "include",
            }),
        }),
        getToken: builder.query({
            query: () => ({
                url: "/users/token",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["token"],
        }),
    })
})

export const {
    useCreateNewUserMutation,
    useLoginUserMutation,
    useGetUsersClassesQuery,
    useGetTokenQuery,
} = accountApi

