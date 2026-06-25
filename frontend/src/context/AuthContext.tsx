
import { createContext } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType } from './types';
import { fetchUserProfile } from './AuthContextMethods/fetchUserProfile';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const {
        data: profile,
        isLoading: isProfileLoading,
        refetch: refetchProfile,
    } = fetchUserProfile();


    // const login = async () => { ... }


    return (
        <AuthContext.Provider
            value={{ profile, isProfileLoading, refetchProfile }
            }
        >
            {children}
        </AuthContext.Provider>
    );
};
