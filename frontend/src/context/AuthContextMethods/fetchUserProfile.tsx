import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/authService";
import { config } from "../../config/app";
import type { ProfileData } from "../types";

export const fetchUserProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        select: (response: any): ProfileData | null => {
            const profileData = Array.isArray(response?.data)
                ? response.data[0]
                : response?.data;
            if (!profileData) return null;

            const baseUrl = config.storageUrl || 'http://localhost:8000/storage/';
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
