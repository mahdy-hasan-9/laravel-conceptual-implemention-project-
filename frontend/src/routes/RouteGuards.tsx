// src/routes/RouteGuards.tsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// ========== AUTH CHECK ==========
const isAuthenticated = () => !!localStorage.getItem('token');

// ========== PROTECTED ROUTE (Login required) ==========
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// ========== PUBLIC ROUTE (Login থাকলে redirect) ==========
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// ========== ROLE GUARD ==========
interface RequireRoleProps {
  roles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RequireRole = ({ roles, children, fallback }: RequireRoleProps) => {
  const { roleNames, isProfileLoading } = useContext(AuthContext);

  if (isProfileLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>Loading...</div>;
  }

  const hasRole = roles.some((role) => roleNames?.includes(role));

  if (!hasRole) {
    return fallback || <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

// ========== PERMISSION GUARD ==========
interface RequirePermissionProps {
  permissions: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RequirePermission = ({ permissions, children, fallback }: RequirePermissionProps) => {
  const { permissions: userPermissions, isProfileLoading } = useContext(AuthContext);

  if (isProfileLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>Loading...</div>;
  }

  const hasPermission = permissions.some((perm) => userPermissions?.includes(perm));

  if (!hasPermission) {
    return fallback || <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};