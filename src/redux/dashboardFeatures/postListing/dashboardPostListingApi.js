import { baseApi } from "../../api/baseApi";


const dashboardPostListingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPostListing: builder.query({
            query: ({per_page,search="",page}) => ({
                url: `/admin/get-posts?per_page=${per_page}&search=${search}&page=${page}`,
                method: "GET",
            }),
            invalidatesTags: ['postList'],
        }),
        detailsPostListing: builder.query({
            query: (detailsId) => ({
                url: `/admin/get-post?post_id=${detailsId}`,
                method: "GET",
            }),
            invalidatesTags: ['postList'],
        }),
    })
})


export const {useGetPostListingQuery,useDetailsPostListingQuery} = dashboardPostListingApi;