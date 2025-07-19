import { baseApi } from "../../api/baseApi";


const dashboardActiveReportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReports: builder.query({
            query: ({per_page,page}) => ({
                url: `/admin/get-reports?per_page=${per_page}&page=${page}`,
                method: "GET",
            }),
            invalidatesTags: ['report'],
        }),
        detailsReport: builder.query({
            query: (id) => ({
                url: `/admin/get-report?report_id=${id}`,
                method: "GET",
            }),
            invalidatesTags: ['report'],
        }),
     
    })
})


export const {useGetReportsQuery,useDetailsReportQuery} = dashboardActiveReportApi;