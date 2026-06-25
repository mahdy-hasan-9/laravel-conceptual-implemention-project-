
import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../../context/AuthContext';




interface RequireRoleProps {
    role: string;
    children: ReactNode;
    fallback?: ReactNode;
}

export const RequireRole = ({ role, children, fallback = null }: RequireRoleProps) => {
    const { hasRole } = useContext(AuthContext);

    if (!hasRole(role)) {
        return fallback;
    }
    return children;
};


interface RequireAnyRoleProps {
    roles: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export const RequireAnyRole = ({
    roles,
    children,
    fallback = null
}: RequireAnyRoleProps) => {
    const { hasRole } = useContext(AuthContext);

    const hasAnyRole = roles.some((role) => hasRole(role));

    if (!hasAnyRole) {
        return fallback;
    }
    return children;
};

interface RequireAllRolesProps {
    roles: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export const RequireAllRoles = ({
    roles,
    children,
    fallback = null
}: RequireAllRolesProps) => {
    const { hasRole } = useContext(AuthContext);

    const hasAllRoles = roles.every((role) => hasRole(role));

    if (!hasAllRoles) {
        return fallback;
    }
    return children;
};

interface RequirePermissionProps {
    permission: string;
    children: ReactNode;
    fallback?: ReactNode;
}

export const RequirePermission = ({
    permission,
    children,
    fallback = null
}: RequirePermissionProps) => {
    const { hasPermission } = useContext(AuthContext);

    if (!hasPermission(permission)) {
        return fallback;
    }
    return children;
};


interface RequireAnyPermissionProps {
    permissions: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export const RequireAnyPermission = ({
    permissions,
    children,
    fallback = null
}: RequireAnyPermissionProps) => {
    const { hasAnyPermission } = useContext(AuthContext);

    if (!hasAnyPermission(permissions)) {
        return fallback;
    }
    return children;
};


interface RequireAllPermissionsProps {
    permissions: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export const RequireAllPermissions = ({
    permissions,
    children,
    fallback = null
}: RequireAllPermissionsProps) => {
    const { hasAllPermissions } = useContext(AuthContext);

    if (!hasAllPermissions(permissions)) {
        return fallback;
    }
    return children;
};