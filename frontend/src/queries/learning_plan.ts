import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const learningPlanApi = createApi({
    reducerPath: 'learningPlanApi',
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
    tagTypes: [ 'learning_plan' ],
    endpoints: (builder) => ({
        createLearningPlan: builder.mutation({
            query: (formData) => ({
                url: '/learning_plans',
                method: 'POST',
                body: formData,
                credentials: 'include'
            }),
            invalidatesTags: [ 'learning_plan' ]
        })
    })
});

export const {
    useCreateLearningPlanMutation,
} = learningPlanApi;
