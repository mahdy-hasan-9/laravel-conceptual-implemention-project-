
export interface User {
    id: number;
    name: string;
    email: string;
    // add any extra fields returned by `/api/user`
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
}

export interface AuthContextType {
    profile: ProfileData | null;
    isProfileLoading: boolean;
    refetchProfile: () => void;
}
