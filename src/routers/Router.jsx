import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout"
import CommonDashboard from "../pages/dashboardPages/commonDashboard/CommonDashboard";
import ManageUsers from "../pages/dashboardPages/manageUsers/ManageUsers";
import PostListing from "../pages/dashboardPages/postListing/PostListing";
import MyProfile from "../pages/dashboardPages/myProfile/MyProfile";
import ErrorPage from "../pages/error/ErrorPage";
import DashboardLogin from "../pages/dashboardPages/authentication/DashboardLogin";
import DashboardForgetPassword from "../pages/dashboardPages/authentication/DashboardForgetPassword";
import DashboardOtp from "../pages/dashboardPages/authentication/DashboardOtp";
import DashboardCreateNewPassword from "../pages/dashboardPages/authentication/DashboardCreateNewPassword";
import Report from "../pages/dashboardPages/report/Report";
import TramsAandCondition from "../pages/dashboardPages/tramsAandCondition/TramsAandCondition";
import PrivacyPolicy from "../pages/dashboardPages/privacyPolicy/PrivacyPolicy";
import Notification from "../pages/dashboardPages/notification/Notification";
import PrivatRoutes from "./PrivatRoutes";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />, // Redirect to /login
    },
    {
        path: "/",
        element: <PrivatRoutes>
            <DashboardLayout />
        </PrivatRoutes>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard",
                element: <PrivatRoutes>
                    <CommonDashboard />
                </PrivatRoutes>
            },
            {
                path: "/manage-users",
                element: <PrivatRoutes>
                    <ManageUsers />
                </PrivatRoutes>
            },
            {
                path: "/post-listing",
                element: <PrivatRoutes>
                    <PostListing />
                </PrivatRoutes>
            },
            {
                path: "/report",
                element: <PrivatRoutes>
                    <Report />
                </PrivatRoutes>
            },
            {
                path: "/profile",
                element: <PrivatRoutes>
                    <MyProfile />
                </PrivatRoutes>
            },
            {
                path: "/trams&condition",
                element: <PrivatRoutes>
                    <TramsAandCondition />
                </PrivatRoutes>
            },
            {
                path: "/privacy-policy",
                element: <PrivatRoutes>
                    <PrivacyPolicy />
                </PrivatRoutes>
            },
            {
                path: "/notification",
                element: <PrivatRoutes>
                    <Notification />
                </PrivatRoutes>
            },

        ]
    },

    {
        path: "/login",
        element: <DashboardLogin />
    },
    {
        path: "/forget-password",
        element: <DashboardForgetPassword />
    },
    {
        path: "/otp-code",
        element: <DashboardOtp />
    },
    {
        path: "/create-new-password",
        element: <DashboardCreateNewPassword />
    },
]);

export default router;