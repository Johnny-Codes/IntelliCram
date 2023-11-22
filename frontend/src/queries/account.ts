import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getAccessToken} from "@/slices/account/accountSlice";
import type { RootState } from './store'
import { useSelector } from "react-redux";
import { sign } from 'crypto';


export const accountApi = createApi({
    
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        prepareHeaders: (headers, { getState }) => {
          const token = getAccessToken(getState() as RootState);
        
          // If we have a token set in state, let's assume that we should be passing it.
          if (token.payload.account.accessToken) {
            const newHeaders = new Headers(headers);
            newHeaders.set('authorization', `Bearer ${token.payload.account.accessToken}`);
        
            // Convert Headers object to plain object for logging
            const headersObject = {};
            newHeaders.forEach((value, key) => {
              headersObject[key] = value;
            });
        
            return newHeaders;
          }
          return headers;
        },
    }),
    tagTypes: ["token"],
    endpoints: (builder) => ({
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
        signupUser: builder.mutation({
            query: (formData) => {
              return {
                url: "/users/create",
                method: "POST",
                body: formData,
              };
            },
            invalidatesTags: ["token"],
          }),
        getUsersClasses: builder.query({
            query: () => ({
                url: "/classrooms",
                method: "GET",
                // credentials: "include",
            }),
            // providesTags: (result) => result ? [...result, 'token'] : ['token'],
            providesTags: ["token"],
        }),
        getToken: builder.query({
            query: () => ({
                url: "/users/token",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["token"],
            // invalidatesTags: ["token"],
        }),
    })
})

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useGetUsersClassesQuery,
    useGetTokenQuery,
} = accountApi