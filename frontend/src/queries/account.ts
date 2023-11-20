import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers, { getState }) => {
          const token = getAuthToken();
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        },
        credentials: 'include',
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
    })
})

const getAuthToken = () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='));

    console.log('token: ', token)

    if (token) {
        console.log("tokens from getAuthToken:", token)
        return token.split('=')[1];
    }

    return null;
  };


export const {
    useGetAccountTokenMutation,
    useCreateNewUserMutation,
    useLoginUserMutation,
    useGetUsersClassesQuery,
} = accountApi
