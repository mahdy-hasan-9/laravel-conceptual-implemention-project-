
import { createContext } from 'react';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/authService';

interface ProfileData {
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
}

interface AuthContextType {
    profile: ProfileData | null;
    isProfileLoading: boolean;
    refetchProfile: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const fetchUserProfile = () => {
        return useQuery({
            queryKey: ['profile'],
            queryFn: getProfile,
            select: (response: any): ProfileData | null => {
                const profileData = Array.isArray(response?.data)
                    ? response.data[0]
                    : response?.data;
                if (!profileData) return null;

                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/storage/';
                const fullImageUrl = profileData?.image_url ? `${baseUrl}${profileData.image_url}` : null;
                const imageFileList = fullImageUrl
                    ? [
                        {
                            uid: '-1',
                            name: profileData.image_url.split('/').pop() || 'image.jpg',
                            status: 'done',
                            url: fullImageUrl,
                            thumbUrl: fullImageUrl,
                        },
                    ]
                    : [];

                return { ...profileData, imageFileList };
            },
        });
    }

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
