import { baseApi } from "../../api/baseApi";


const dashboardProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (profileInfo) => ({
                url: `/admin/update-admin-profile`,
                method: "POST",
                body:profileInfo,
            }),
            invalidatesTags: ['profile'],
        }),
        getProfile: builder.query({
            query: () => ({
                url: `/profile`,
                method: "GET",
            }),
            invalidatesTags: ['profile'],
        }),
     
    })
})


export const {useUpdateProfileMutation,useGetProfileQuery} = dashboardProfileApi;