import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quizzesApi = createApi({
	reducerPath: 'quizzesApi',
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

				console.log('new headers', headersObject);

				return newHeaders;
			}
			return headers;
		}
	}),
	tagTypes: [ 'quizzes', "questions", "answers"],
	endpoints: (builder) => ({
        getAllDeckQuizzes: builder.query({
            query: (args: {class_id: number; deck_id: number}) => ({
                url: `/classrooms/${args.class_id}/decks/${args.deck_id}/quizzes`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["quizzes"],
        }),
        getAllUserQuizzes: builder.query({
            query: () => ({
                url: "/quizzes",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["quizzes"],
        }),
        getOneQuiz: builder.query({
            query: (args: {class_id: number; deck_id: number; quiz_id: number}) => ({
                url: `/classrooms/${args.class_id}/decks/${args.deck_id}/quizzes/${args.quiz_id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["quizzes"],
        }),
		deleteQuiz: builder.mutation({
			query: (args: {class_id: number; deck_id: number; quiz_id: number}) => {
				return {
					url: `/classrooms/${args.class_id}/decks/${args.deck_id}/quizzes/${args.quiz_id}`,
					method: 'DELETE',
					credentials: 'include'
				};
			},
			invalidatesTags: [ 'quizzes' ]
		}),
		getAllQuizQuestions: builder.query({
			query: (quiz_id: number) => ({
				url: `/quizzes/${quiz_id}/questions`,
				method: 'GET',
				credentials: 'include'
			}),
			providesTags: [ 'questions' ]
		}),
		getQuizQuestion: builder.query({
			query: (args: {quiz_id: number; question_id: number}) => ({
				url: `/quizzes/${args.quiz_id}/questions/${args.question_id}`,
				method: 'GET',
				credentials: 'include'
			}),
			providesTags: [ 'questions' ]
		}),
		deleteOneQuestion: builder.mutation({
			query: (args: {quiz_id: number; question_id: number}) => ({
				url: `/quizzes/${args.quiz_id}/questions/${args.question_id}`,
				method: 'DELETE',
				credentials: 'include'
			}),
			invalidatesTags: [ 'questions' ]
		}),
		getQuestionAnswers: builder.query({
			query: (args: {quiz_id: number; question_id: number}) => ({
				url: `/quizzes/${args.quiz_id}/questions/${args.question_id}/answers`,
				method: 'GET',
				credentials: 'include'
			}),
			providesTags: [ 'answers' ]
		}),
	})
});

export const {
    useGetAllDeckQuizzesQuery,
    useGetAllUserQuizzesQuery,
    useGetOneQuizQuery,
    useDeleteQuizMutation,
    useGetAllQuizQuestionsQuery,
    useGetQuizQuestionQuery,
    useDeleteOneQuestionMutation,
    useGetQuestionAnswersQuery
} = quizzesApi;
