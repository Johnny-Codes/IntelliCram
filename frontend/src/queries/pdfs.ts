import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pdfsApi = createApi({
	reducerPath: 'pdfsApi',
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
	tagTypes: [ 'quizzes', "pdf_files"],
	endpoints: (builder) => ({
        getUploadFile: builder.query({
            query: (file_id: number) => ({
                url: `/upload/${file_id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["pdf_files"],
        }),
		deletePdf: builder.mutation({
			query: (file_id: number) => {
				return {
					url: `/upload/${file_id}`,
					method: 'DELETE',
					credentials: 'include'
				};
			},
			invalidatesTags: [ 'pdf_files' ]
		}),
        createPdf: builder.mutation({
			query: (formData) => {
				console.log('query')
				for (let x of formData.entries()) {
					console.log('for loop key: ', x[0] + ', value :' + x[1], typeof x[1]);
				}
				// console.log('new form data: ', formData);
				// console.log('form data type', typeof formData);
				// console.log('form data name:', formData.name);
				// console.log('form data name:', typeof formData.name);
				// console.log('form data file:', formData.file);
				// console.log('form data file:', typeof formData.file);


				return {
					url: "/upload",
					method: "POST",
					credentials: 'include',
					body: formData,
					// headers: {
					// 	"Content-Type": "multipart/form-data"
					// }
					};
					},
					
					// invalidatesTags: ["pdf_files"],
		}),
	})
});

export const {
    useGetUploadFileQuery,
    useDeletePdfMutation,
    useCreatePdfMutation
} = pdfsApi;
