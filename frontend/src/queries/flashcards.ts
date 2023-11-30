import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const flashcardsApi = createApi({
	reducerPath: 'flashcardsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8000',
		prepareHeaders: (headers) => {
			const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, '$1');

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
		}
	}),
	tagTypes: [ 'flashcards' ],
	endpoints: (builder) => ({
		getDeckFlashcards: builder.query({
			query: (args: { class_id: number; deck_id: number }) => {
				return {
					url: `/classrooms/${args.class_id}/decks/${args.deck_id}/cards`,
					method: 'GET',
					credentials: 'include'
				};
			},
			providesTags: [ 'flashcards' ]
		}),
		createFlashcard: builder.mutation({
			query: (args: {class_id: number; deck_id: number; formData: {}}) => {
				return {
					url: `/classrooms/${args.class_id}/decks/${args.deck_id}/cards`,
					method: 'POST',
					body: args.formData,
					credentials: 'include'
				};
			},
			invalidatesTags: [ 'flashcards' ]
		}),
		getOneFlashcard: builder.query({
			query: (class_id: number, deck_id: number, card_id: number) => ({
				url: `/classrooms/${class_id}/decks/${deck_id}/cards/${card_id}`,
				method: 'GET',
				credentials: 'include'
			}),
			providesTags: [ 'flashcards' ]
		}),
		deleteOneFlashcard: builder.mutation({
			query: (class_id: number, deck_id: number, card_id: number) => ({
				url: `/classrooms/${class_id}/decks/${deck_id}/cards/${card_id}`,
				method: 'DELETE',
				credentials: 'include'
			}),
			invalidatesTags: [ 'flashcards' ]
		}),
		updateFlashcard: builder.mutation({
			query: (args: {class_id: number, formData: {}, card_id: number, deck_id: number}) => {
				return {
					url: `/classrooms/${args.class_id}/decks/${args.deck_id}/cards/${args.card_id}`,
					method: 'PUT',
					body: args.formData
				};
			},
			invalidatesTags: [ 'flashcards' ]
		}),
		createQuizAI: builder.mutation({
			query: (args: {class_id: number; deck_id: number; formData: {}}) => {
				return {
					url: `/classrooms/${args.class_id}/decks/${args.deck_id}/cards/quiz`,
					method: 'POST',
					body: args.formData
				};
			},
			invalidatesTags: [ 'flashcards' ]
		}),
		createFlashcardsFromFile: builder.mutation({
			query: (formData) => {
				return {
					url: `/deck/${formData.deck_id}/cards/new_cards_from_file/${formData.file_id}`,
					method: 'POST',
					body: formData,
					credentials: 'include'
				};
			},
			invalidatesTags: [ 'flashcards' ]
		})
	})
});

export const {
	useCreateFlashcardMutation,
	useGetDeckFlashcardsQuery,
	useDeleteOneFlashcardMutation,
	useGetOneFlashcardQuery,
	useUpdateFlashcardMutation,
	useCreateQuizAIMutation,
	useCreateFlashcardsFromFileMutation,
} = flashcardsApi;
