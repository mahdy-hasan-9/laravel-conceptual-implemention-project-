// src/types/notification.ts
export interface NotificationData {
    id: string;
    heading: string;
    description: string;
    student_id?: number;
    read_at: string | null;
    created_at: string;
}

export interface ApiNotification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}