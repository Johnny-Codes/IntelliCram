import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pdfsApi = createApi({
	reducerPath: 'pdfsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
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
				return {
					url: "/upload",
					method: "POST",
					credentials: 'include',
					body: formData,
				};
			},
			invalidatesTags: ["pdf_files"]
		}),
		getAllUsersFiles: builder.query({
			query: () => ({
				url: "/uploads",
				method: "GET",
				credentials: "include",
			}),
			providesTags: ["pdf_files"],
		})
	})
});

export const {
    useGetUploadFileQuery,
    useDeletePdfMutation,
    useCreatePdfMutation,
	useGetAllUsersFilesQuery,
} = pdfsApi;
