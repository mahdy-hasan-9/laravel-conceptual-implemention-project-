

import { useState, useEffect, useCallback, useRef } from 'react';
import echo from '../lib/echo';
import { fetchNotifications, markNotificationAsRead } from '../services/notificationApi';
import type { ApiNotification, NotificationData } from '../types/notification';

interface UseNotificationsReturn {
    notifications: NotificationData[];
    unreadCount: number;
    loading: boolean;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => void;
    clearAll: () => void;
}

export const useNotifications = (userId: number | undefined): UseNotificationsReturn => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [loading, setLoading] = useState(true);
    const isSubscribed = useRef(false);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                setLoading(true);
                const response = await fetchNotifications();
                const formatted = response.data.map((item: ApiNotification) => ({
                    id: item.id,
                    heading: item.data.heading,
                    description: item.data.description,
                    student_id: item.data.student_id,
                    read_at: item.read_at,
                    created_at: item.created_at,
                }));
                setNotifications(formatted);
            } catch (error) {
                console.error('Failed to load notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    useEffect(() => {
        if (!userId || isSubscribed.current) return;

        isSubscribed.current = true;
        const channel = echo.private(`App.Models.User.${userId}`);

        channel.notification((notification: any) => {
            const newNotification: NotificationData = {
                id: notification.id,
                heading: notification.heading,
                description: notification.description,
                student_id: notification.student_id,
                read_at: null,
                created_at: notification.created_at,
            };
            setNotifications((prev) => [newNotification, ...prev]);
        });

        return () => {
            echo.leave(`App.Models.User.${userId}`);
            isSubscribed.current = false;
        };
    }, [userId]);

    const markAsRead = useCallback(async (id: string) => {
        try {
            await markNotificationAsRead(id);
            setNotifications((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, read_at: new Date().toISOString() } : item
                )
            );
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications((prev) =>
            prev.map((item) => ({ ...item, read_at: new Date().toISOString() }))
        );
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);
    const unreadCount = notifications.filter((n) => !n.read_at).length;

    return {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        clearAll,
    };
};