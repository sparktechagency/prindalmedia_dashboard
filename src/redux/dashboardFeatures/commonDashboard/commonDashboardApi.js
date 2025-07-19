import { baseApi } from "../../api/baseApi";


const commonDashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCommonDashboard: builder.query({
            query: () => ({
                url: `/admin/user-analytics`,
                method: "GET",
            }),
            invalidatesTags: ['commonDashboard'],
        })
    })
})


export const {useGetCommonDashboardQuery} = commonDashboardApi;