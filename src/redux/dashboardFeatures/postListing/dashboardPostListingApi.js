import { baseApi } from "../../api/baseApi";


const dashboardPostListingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPostListing: builder.query({
            query: ({per_page,search="",page}) => ({
                url: `/admin/get-posts?per_page=${per_page}&search=${search}&page=${page}`,
                method: "GET",
            }),
            providesTags: ['postList'],
        }),
        detailsPostListing: builder.query({
            query: (detailsId) => ({
                url: `/admin/get-post?post_id=${detailsId}`,
                method: "GET",
            }),
            providesTags: ['postList'],
        }),
        deletePostListing: builder.mutation({
            query: (id) => ({
                url: `/admin/delete-post?post_id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['postList'],
        }),
    })
})


export const {useGetPostListingQuery,useDetailsPostListingQuery,useDeletePostListingMutation} = dashboardPostListingApi;