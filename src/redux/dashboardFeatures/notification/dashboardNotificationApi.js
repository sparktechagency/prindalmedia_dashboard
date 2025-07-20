import { baseApi } from "../../api/baseApi";


const dashboardNotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: ({per_page,page}) => ({
                url: `/get-notifications?per_page=${per_page}&page=${page}`,
                method: "GET",
            }),
            invalidatesTags: ['notification'],
        }),
    })
})


export const {useGetNotificationQuery} = dashboardNotificationApi;