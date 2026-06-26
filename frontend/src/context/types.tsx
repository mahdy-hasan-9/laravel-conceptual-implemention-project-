import type { UseMutationResult } from "@tanstack/react-query";

export interface User {
    id: number;
    name: string;
    email: string;
    // add any extra fields returned by `/api/user`
}


export interface Permission {
    name: string;
}

export interface Role {
    name: string;
    permissions?: Permission[];
}

export interface ProfileData {
    email: string;
    id: number;
    name: string;
    role: string;
    is_active: boolean;
    image_url: string | null;
    imageFileList: Array<{
        uid: string;
        name: string;
        status: string;
        url: string;
        thumbUrl: string;
    }>;
    roles?: Role[];
}

export interface AuthContextType {
    profile: ProfileData | null;
    isProfileLoading: boolean;
    refetchProfile: () => void;
    logoutHandler: () => void;
    loginHandlerMutation: UseMutationResult<any, unknown, any, unknown>;
    registerHandlerMutation: UseMutationResult<any, unknown, any, unknown>;
    permissions: string[];
    roleNames: string[];
    hasPermission: (permission: string) => boolean;
    hasRole: (role: string) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
}
