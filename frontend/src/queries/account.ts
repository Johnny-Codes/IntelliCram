import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        prepareHeaders: (headers, { getState }) => {
            const selector = accountApi.endpoints.getToken.select();
            console.log('selector: ', selector)
            const { data: tokenData } = selector(getState());
            console.log("tokenData", tokenData)
            if (tokenData && tokenData.access_token) {
                headers.set("Authorization", `Bearer ${tokenData.access_token}`);
            }
            console.log("headers: ", headers.access_token)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAccountToken: builder.mutation({
            query: () => ({
                url: "/token",
                method: "POST",
                credentials: "include"
            })
        }),
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
                    console.log("login data", loginData)
                }
                return {
                    url: "/token",
                    method: "POST",
                    body: loginData
                };
            }}),
        getUsersClasses: builder.query({
            query: () => ({
                url: "/classrooms",
                method: "GET",
                credentials: "include",
            }),
        }),
        getToken: builder.query({
            query: () => ({
                url: "/token",
                // credentials: "include",
            }),
        }),
    })
})

export const {
    useGetAccountTokenMutation,
    useCreateNewUserMutation,
    useLoginUserMutation,
    useGetUsersClassesQuery,
    useGetTokenQuery,
} = accountApi
