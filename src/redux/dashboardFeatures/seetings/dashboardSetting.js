import { baseApi } from "../../api/baseApi";


const dashboardSetting = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSetting: builder.query({
            query: () => ({
                url: `/admin/get-settings`,
                method: "GET",
            }),
            invalidatesTags: ['setting'],
        }),
        updateSetting: builder.mutation({
            query: (updateInfo) => ({
                url: `/admin/update-settings`,
                method: "POST",
                body:updateInfo,
            }),
            invalidatesTags: ['setting'],
        }),
    })
})


export const {useGetSettingQuery,useUpdateSettingMutation} = dashboardSetting;