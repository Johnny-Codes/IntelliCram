import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const classesApi = createApi({

    reducerPath: 'classesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        // baseUrl: 'https://intellicram-1d23e81f0b1c.herokuapp.com/',
        prepareHeaders: (headers) => {
          const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1");

          // If we have an access token cookie, let's assume that we should be passing it.
          if (accessToken) {
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
    tagTypes: ["user", "token", "classes"],
    endpoints: (builder) => ({
        getUsersClasses: builder.query({
            query: () => ({
                url: "/classrooms",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["user", "classes"],
            invalidatesTags: ["token"],
        }),
        createClass: builder.mutation({
          query: (formData) => {
            return {
              url: "/classrooms",
              method: "POST",
              body: formData,
            };
          },
          providesTags: ["user"],
          invalidatesTags: ["classes"],
        }),
        getOneClasses: builder.query({
          query: (id) => ({
              url: `/classrooms/${id}`,
              method: "GET",
              credentials: "include",
          }),
          providesTags: ["user", "classes"],
      }),
        deleteOneClass: builder.mutation({
          query: (id) => ({
              url: `/classrooms/${id}`,
              method: "DELETE",
              credentials: "include",
          }),
          providesTags: ["user", "classes"],
      }),
      updateClass: builder.mutation({
        query: (formData, id) => {
          return {
            url: `/classrooms/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        providesTags: ["user"],
        invalidatesTags: ["classes"],
      }),
    })
})

export const {
    useGetUsersClassesQuery,
    useCreateClassMutation,
    useDeleteOneClassMutation,
    useUpdateClassMutation,
} = classesApi
