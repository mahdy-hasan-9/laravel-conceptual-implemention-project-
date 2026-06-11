
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    if(!isAuthenticated()){
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <>{children}</>;
}


export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};