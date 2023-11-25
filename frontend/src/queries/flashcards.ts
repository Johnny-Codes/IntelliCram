import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
    reducerPath: 'flashcardsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
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

            console.log('new headers', headersObject);

            return newHeaders;
          }
          return headers;
        },
    }),
    tagTypes: ["decks"],
    endpoints: (builder) => ({
        getDeckFlashcards: builder.query({
            query: (class_id: number, deck_id: number) => ({
                url: `/classrooms/${class_id}/decks/${deck_id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["flashcards"],
        }),
        createFlashcard: builder.mutation({
          query: (class_id, formData) => {
            return {
              url: `/classrooms/${class_id}/decks/${formData.deck_id}`,
              method: "POST",
              body: formData,
            };
          },
          invalidatesTags: ["flashcards"],
        }),
        getOneFlashcard: builder.query({
          query: (class_id: number, deck_id: number) => ({
              url: `/classrooms/${class_id}/decks/${deck_id}`,
              method: "GET",
              credentials: "include",
          }),
          providesTags: ["flashcards"],
      }),
        deleteOneFlashcard: builder.mutation({
          query: (class_id: number, deck_id: number) => ({
              url: `/classrooms/${class_id}/decks/${deck_id}`,
              method: "DELETE",
              credentials: "include",
          }),
          invalidatesTags: ["flashcards"],
      }),
      updateFlashcard: builder.mutation({
        query: (class_id, formData) => {
          return {
            url: `/classrooms/${class_id}/decks/${formData.deck_id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ["flashcards"],
      }),
    })
})

export const {
  useCreateFlashcardMutation,
  useGetDeckFlashcardsQuery,
  useDeleteOneFlashcardMutation,
  useGetOneFlashcardQuery,
  useUpdateFlashcardMutation
} = flashcardsApi
