import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginView from "../views/Authentication/LoginView";
import RegisterView from "../views/Authentication/RegisterView ";
import ForgetPassword from "../views/Authentication/ForgetPasswordView";
import ResetPassword from "../views/Authentication/ResetPasswordView";
import { ProtectedRoute, PublicRoute, RequirePermission, RequireRole } from "./RouteGuards";
import StudentView from "../views/Student/StudentView";
import ProfileView from "../views/Profile/ProfileView";
import Forbidden403 from "../views/Errors/Forbidden403";
import NotFound404 from "../views/Errors/NotFound404";

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
        protected: true,
        requiredRoles: ['admin', 'manager', 'staff'],
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
    {
        path: "/403",
        element: Forbidden403,
        // public: true,
    },
    {
        path: "/*",
        element: NotFound404,
        // public: true,
    },
]



// src/routes/index.tsx (continued)

export const renderRoutes = (routes: any[]) => {
    return (
        <Routes>
            {routes.map((route, index) => {
                const Component = route.element;
                const Layout = route.layout || React.Fragment;
                let wrappedElement = <Component />;

                // Step 1: Public route guard
                if (route.public) {
                    wrappedElement = (
                        <PublicRoute>
                            <Component />
                        </PublicRoute>
                    );
                }

                // Step 2: Protected route guard (login required)
                else if (route.protected) {
                    wrappedElement = (
                        <ProtectedRoute>
                            {/* Step 3: Role guard (if specified) */}
                            {route.requiredRoles ? (
                                <RequireRole roles={route.requiredRoles}>
                                    {/* Step 4: Permission guard (if specified) */}
                                    {route.requiredPermissions ? (
                                        <RequirePermission permissions={route.requiredPermissions}>
                                            <Component />
                                        </RequirePermission>
                                    ) : (
                                        <Component />
                                    )}
                                </RequireRole>
                            ) : route.requiredPermissions ? (
                                <RequirePermission permissions={route.requiredPermissions}>
                                    <Component />
                                </RequirePermission>
                            ) : (
                                <Component />
                            )}
                        </ProtectedRoute>
                    );
                }

                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                {wrappedElement}
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
};