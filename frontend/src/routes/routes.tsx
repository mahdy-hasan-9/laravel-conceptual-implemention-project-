import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import Student from "../views/Student";
import LoginView from "../views/Authentication/LoginView";
import RegisterView from "../views/Authentication/RegisterView ";
import ForgetPassword from "../views/Authentication/ForgetPasswordView";
import ResetPassword from "../views/Authentication/ResetPasswordView";

export const routes = [
    {
        path: "/",
        element: Dashboard,
        layout: DashboardLayout,
    },
    {
        path: "/login",
        element: LoginView
    },
    {
        path: "/register",
        element: RegisterView
    },
    {
        path: "/forget-password",
        element: ForgetPassword
    },
    {
        path: "/reset-password",
        element: ResetPassword
    },
    {
        path: "/student",
        element: Student,
        layout: DashboardLayout,
    }
]




export const renderRoutes = (routes: any) => {
    return <Routes>
        {routes.map((route: any, index: any) => {
            const Component = route.element;
            const Layout = route.layout || React.Fragment;
            return <Route key={index} path={route.path}
                element={
                    <Layout>
                        <Component />
                    </Layout>
                } />
        })}
    </Routes>
}