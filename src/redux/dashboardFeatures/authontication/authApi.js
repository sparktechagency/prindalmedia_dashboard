import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginApi: builder.mutation({
            query: (loginInfo) => ({
                url: `/login`,
                method: "POST",
                body: loginInfo
            }),
            invalidatesTags: ['auth'],
        }),
        forgotApi: builder.mutation({
            query: (forgotInfo) => ({
                url: `/forgot-password`,
                method: "POST",
                body: forgotInfo
            }),
            invalidatesTags: ['auth'],
        }),
        verifyOtpApi: builder.mutation({
            query: (verifyInfo) => ({
                url: `/verify-otp`,
                method: "POST",
                body: verifyInfo
            }),
            invalidatesTags: ['auth'],
        }),
        resendApi: builder.mutation({
            query: (resendInfo) => ({
                url: `/resend-otp`,
                method: "POST",
                body: resendInfo
            }),
            invalidatesTags: ['auth'],
        }),
        changePasswordApi: builder.mutation({
            query: (changePasswordInfo) => ({
                url: `/change-password`,
                method: "POST",
                body: changePasswordInfo
            }),
            invalidatesTags: ['auth'],
        }),
    })
})


export const {useLoginApiMutation,useForgotApiMutation,useVerifyOtpApiMutation,useResendApiMutation,useChangePasswordApiMutation} = authApi;