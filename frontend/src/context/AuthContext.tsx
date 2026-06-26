import { createContext, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType } from './types';
import { fetchUserProfile } from './AuthContextMethods/fetchUserProfile';
import { logoutMutation } from './AuthContextMethods/userAuth';
import toast from 'react-hot-toast';
import { loginService, registerService } from '../services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';


interface Permission {
    name: string;
}

interface Role {
    name: string;
    permissions?: Permission[];
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


const handleMutationError = (error: any) => {
    if (error?.status !== 422) {
        toast.error(error?.message || 'Something went wrong');
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: profile,
        isLoading: isProfileLoading,
        refetch: refetchProfile,
    } = fetchUserProfile();

    const permissions = useMemo(() => {
        if (!profile?.roles) return [];

        const allPerms = profile.roles.flatMap((role: Role) =>
            role.permissions?.map((p) => p.name).filter(Boolean) || []
        );

        return Array.from(new Set(allPerms));
    }, [profile?.roles]);

    const roleNames = useMemo(() => {
        if (!profile?.roles) return [];
        return profile.roles.map((role: Role) => role.name);
    }, [profile?.roles]);


    const hasPermission = useCallback((permission: string) => permissions.includes(permission), [permissions]);
    const hasRole = useCallback((role: string) => roleNames.includes(role), [roleNames]);
    const hasAnyPermission = useCallback((perms: string[]) => perms.some((p) => permissions.includes(p)), [permissions]);
    const hasAllPermissions = useCallback((perms: string[]) => perms.every((p) => permissions.includes(p)), [permissions]);

    const logoutHandlerMutation = logoutMutation();

    const logoutHandler = useCallback(() => {
        logoutHandlerMutation.mutate(undefined, {
            onSuccess: (resp) => {
                if (resp.status === 200 && resp.success) {
                    localStorage.removeItem('token');
                    queryClient.clear();
                    navigate('/login', { replace: true });
                    toast.success(resp.message || 'Logged out successfully');
                } else {
                    toast.error(resp.message || 'Something went wrong');
                }
            },
            onError: (error: any) => {
                toast.error(error.message || 'Something went wrong');
            }
        });
    }, [logoutHandlerMutation, queryClient, navigate]);

    const loginHandlerMutation = useMutation({
        mutationFn: loginService,
        onSuccess: (resp) => {
            if (resp.status === 200) {
                localStorage.setItem('token', resp.token);
                queryClient.invalidateQueries();
                navigate('/', { replace: true });
                toast.success(resp.message || 'Logged In Successfully');
            } else {
                toast.error(resp.message || 'Login failed');
            }
        },
        onError: handleMutationError,
    });

    const registerHandlerMutation = useMutation({
        mutationFn: registerService,
        onSuccess: (resp) => {
            if (resp.status === 201) {
                navigate('/login', { replace: true });
                toast.success(resp.message || 'Account Created Successfully');
            } else {
                toast.error(resp.message || 'Registration failed');
            }
        },
        onError: handleMutationError,
    });

    return (
        <AuthContext.Provider
            value={{
                profile,
                isProfileLoading,
                refetchProfile,
                logoutHandler,
                loginHandlerMutation,
                registerHandlerMutation,
                permissions,
                roleNames,
                hasPermission,
                hasRole,
                hasAnyPermission,
                hasAllPermissions,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};