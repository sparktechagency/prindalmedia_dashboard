import { baseApi } from "../../api/baseApi";


const dashboardNotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => ({
                url: `/get-notifications`,
                method: "GET",
            }),
            invalidatesTags: ['notification'],
        }),
    })
})


export const {useGetNotificationQuery} = dashboardNotificationApi;