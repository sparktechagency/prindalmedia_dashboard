import { baseApi } from "../../api/baseApi";


const dashboardManageUsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({per_page,search="",page}) => ({
                url: `/admin/get-users?per_page=${per_page}&search=${search}&page=${page}`,
                method: "GET",
            }),
            invalidatesTags: ['user'],
        }),
        deleteUser: builder.mutation({
            query: (deleteId) => ({
                url: `/admin/delete-user?user_id=${deleteId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['user'],
        }),
        statusChangeUser: builder.mutation({
            query: (id) => ({
                url: `/admin/verified-unverified/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['user'],
        })
    })
})


export const {useGetUsersQuery,useDeleteUserMutation,useStatusChangeUserMutation} = dashboardManageUsersApi;