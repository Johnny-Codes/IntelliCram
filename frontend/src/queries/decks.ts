import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const decksApi = createApi({
    reducerPath: 'decksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
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
    tagTypes: ["decks"],
    endpoints: (builder) => ({
        getClassDecks: builder.query({
            query: (class_id: number) => ({
                url: `/classrooms/${class_id}/decks`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["decks"],
        }),
        createDeck: builder.mutation({
          query: (formData) => {
            return {
              url: `/classrooms/${formData.class_id}/decks`,
              method: "POST",
              body: formData,
            };
          },
          invalidatesTags: ["decks"],
        }),
        getOneDeck: builder.query({
          query: (class_id: number, deck_id: number) => ({
              url: `/classrooms/${class_id}/decks/${deck_id}`,
              method: "GET",
              credentials: "include",
          }),
          providesTags: ["decks"],
      }),
        deleteOneDeck: builder.mutation({
          query: (args: {class_id: number, deck_id: number}) => ({
              url: `/classrooms/${args.class_id}/decks/${args.deck_id}`,
              method: "DELETE",
              credentials: "include",
          }),
          invalidatesTags: ["decks"],
      }),
      updateDeck: builder.mutation({
        query: (formData) => {
          return {
            url: `/classrooms/${formData.class_id}/decks/${formData.deck_id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["decks"],
      }),
    })
})

export const {
    useGetClassDecksQuery,
    useCreateDeckMutation,
    useGetOneDeckQuery,
    useDeleteOneDeckMutation,
    useUpdateDeckMutation,
} = decksApi
