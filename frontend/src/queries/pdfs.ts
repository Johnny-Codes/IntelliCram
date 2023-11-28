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
			  console.log('new form data: ', formData);
			  console.log('form data name:', formData.name);
			  console.log('form data file:', formData.file);

			//   const body = new FormData();
			//   body.append('name', formData.name);
			//   body.append('file', formData.file);
			//   console.log('body', body);
			//   console.log('body type', body);
			  return {
				url: "/upload",
				method: "POST",
				credentials: 'include',
				body: formData,
				headers: {
					"Content-Type": "multipart/form-data"
				}
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
