import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import RegisterPage from "./Register.jsx";
import DashboardPage from "./Dashboard.jsx";
import LoginPage from "./Login.jsx";
import MediaDetailsPage from "./MediaDetails.jsx";
import MylistPage from "./MyList.jsx";
import ProfilePage from "./Profile.jsx";
import ChangePasswordPage from "./ChangePassword.jsx";
import ChangeDetailsPage from "./ChangeDetails.jsx";
import AdminPanelPage from "./AdminPanel.jsx";
import AdminMediaPage from "./AdminMedia.jsx";


const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage />,
    } ,
    {
        path: "/login",
        element: <LoginPage />,
    } ,
    {
        path: "/dashboard",
        element: <DashboardPage />
    } ,
    {
        path: "/my-list",
        element: <MylistPage />
    } ,
    {
        path: "/media-details/:id",
        element: <MediaDetailsPage />
    } ,
    {
        path: "/profile",
        element: <ProfilePage />
    } ,
    {
        path: "/profile/change-password",
        element: <ChangePasswordPage />
    } ,
    {
        path: "/profile/change-details",
        element: <ChangeDetailsPage />
    } ,
    {
        path: "/admin-panel",
        element: <AdminPanelPage />
    } ,
    {
        path: "/admin-media",
        element: <AdminMediaPage />
    } ,
    {
        path: "/admin-media/:id",
        element: <AdminMediaPage />
    } ,
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)