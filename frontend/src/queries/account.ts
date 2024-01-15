import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
    
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
          const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        
          // If we have an access token cookie, let's assume that we should be passing it.
          if (accessToken) {
            console.log('vite api url', import.meta.env.VITE_API_URL)
            const newHeaders = new Headers(headers);
            newHeaders.set('authorization', `Bearer ${accessToken}`);
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
              };``
            },
            providesTags: ["user"],
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
                credentials: "include",
            }),
            providesTags: ["user"],
            invalidatesTags: ["token"],
        }),
        logoutUser: builder.mutation({
            query: () => ({
              // this is actually not the correct endpoint, this deletes a user entirely from the database.
              // we need to make a delete token endpoint 
                url: "/users/me", 
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["token", "user"],
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
    useLogoutUserMutation,
} = accountApi