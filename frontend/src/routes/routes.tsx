import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import Student from "../views/Student/StudentView";
import LoginView from "../views/Authentication/LoginView";
import RegisterView from "../views/Authentication/RegisterView ";
import ForgetPassword from "../views/Authentication/ForgetPasswordView";
import ResetPassword from "../views/Authentication/ResetPasswordView";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";
import StudentView from "../views/Student/StudentView";
import ProfileView from "../views/Profile/ProfileView";

export const routes = [
    {
        path: "/",
        element: Dashboard,
        layout: DashboardLayout,
        protected: true,
    },
    {
        path: "/student",
        element: StudentView,
        layout: DashboardLayout,
        protected: true
    },
    {
        path: "/profile",
        element: ProfileView,
        layout: DashboardLayout,
        protected: true
    },
    {
        path: "/login",
        element: LoginView,
        public: true,
    },
    {
        path: "/register",
        element: RegisterView,
        public: true,
    },
    {
        path: "/forget-password",
        element: ForgetPassword,
        public: true,
    },
    {
        path: "/reset-password",
        element: ResetPassword,
        public: true,
    },
]




export const renderRoutes = (routes: any) => {
    return <Routes>
        {routes.map((route: any, index: any) => {
            const Component = route.element;
            const Layout = route.layout || React.Fragment;
            let wrappedElement = <Component />;

            if (route.protected) {
                wrappedElement = (
                    <ProtectedRoute>
                        <Component />
                    </ProtectedRoute>
                );
            } else if (route.public) {
                wrappedElement = (
                    <PublicRoute>
                        <Component />
                    </PublicRoute>
                );
            }

            return <Route key={index} path={route.path}
                element={
                    <Layout>
                        {wrappedElement}
                    </Layout>
                } />
        })}
    </Routes>
}