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
        postReadNotification: builder.mutation({
            query: (id) => ({
                url: `/read?notification_id=${id}`,
                method: "POST",
            }),
            invalidatesTags: ['notification'],
        }),
        readAllNotification: builder.mutation({
            query: () => ({
                url: `/read-all`,
                method: "POST",
            }),
            invalidatesTags: ['notification'],
        }),
        totalGetNotification: builder.query({
            query: () => ({
                url: `/notification-status`,
                method: "GET",
            }),
            invalidatesTags: ['notification'],
        }),
    })
})


export const {useGetNotificationQuery,usePostReadNotificationMutation,useReadAllNotificationMutation,useTotalGetNotificationQuery} = dashboardNotificationApi;