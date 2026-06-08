import { useState, useCallback, useRef, useEffect } from 'react';
import { Avatar, List, Button, Empty, Typography } from 'antd';
import { UserOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Notification from './Notification';

const { Text } = Typography;

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
}

interface UserProfile {
    name: string;
    email: string;
    avatar: string;
}

interface ProfileAndNotificationProps {
    profileItems: MenuProps['items'];
    logoutHandler: () => void;
    userProfile: UserProfile;
}

const notificationData = [
    {
        id: '1',
        title: 'New message received',
        description: 'You have a new message from the support team.',
        time: '5 min ago',
        read: false,
    },
    {
        id: '2',
        title: 'System update',
        description: 'The system will undergo maintenance tonight.',
        time: '1 hour ago',
        read: false,
    },
    {
        id: '3',
        title: 'Welcome aboard',
        description: 'Thanks for joining our platform.',
        time: '2 days ago',
        read: true,
    },
];

const ProfileAndNotification = ({
    profileItems,
    logoutHandler,
    userProfile,
}: ProfileAndNotificationProps) => {

    const [notifOpen, setNotifOpen] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState<NotificationItem[]>(notificationData);

    const unreadCount = notifications.filter((n) => !n.read).length;
    const hasUnread = unreadCount > 0;

    const markAsRead = useCallback((id: string) => {
        setNotifications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    }, []);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    const toggleNotif = useCallback(() => {
        setNotifOpen((prev) => !prev);
        setProfileOpen(false);
    }, []);

    const toggleProfile = useCallback(() => {
        setProfileOpen((prev) => !prev);
        setNotifOpen(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notifRef.current &&
                !notifRef.current.contains(event.target as Node)
            ) {
                setNotifOpen(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        };

        if (notifOpen || profileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [notifOpen, profileOpen]);

    const notificationCard = (
        <div
            style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 360,
                maxHeight: 420,
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                overflow: 'hidden',
                zIndex: 1050,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                }}
            >
                <Text strong>Notifications {hasUnread && `(${unreadCount})`}</Text>
                <div style={{ display: 'flex', gap: 8 }}>
                    {hasUnread && (
                        <Button
                            type="text"
                            size="small"
                            icon={<CheckOutlined />}
                            onClick={markAllAsRead}
                        >
                            Read all
                        </Button>
                    )}
                    {notifications.length > 0 && (
                        <Button
                            type="text"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={clearAll}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <div style={{ maxHeight: 340, overflow: 'auto' }}>
                {notifications.length === 0 ? (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No notifications"
                        style={{ padding: 24 }}
                    />
                ) : (
                    <List
                        dataSource={notifications}
                        renderItem={(item) => (
                            <List.Item
                                style={{
                                    padding: '12px 16px',
                                    cursor: 'pointer',
                                    background: item.read ? 'transparent' : '#e6f7ff',
                                    transition: 'background 0.2s',
                                    borderBottom: '1px solid #f0f0f0',
                                }}
                                onClick={() => markAsRead(item.id)}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size="small"
                                            icon={<UserOutlined />}
                                            style={{ backgroundColor: '#1890ff' }}
                                        />
                                    }
                                    title={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Text strong={!item.read} style={{ fontSize: 14 }}>
                                                {item.title}
                                            </Text>
                                            {!item.read && (
                                                <span
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        background: '#ff4d4f',
                                                        display: 'inline-block',
                                                        flexShrink: 0,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                {item.description}
                                            </Text>
                                            <div style={{ marginTop: 4 }}>
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    {item.time}
                                                </Text>
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    );

    const profileMenu = (
        <div
            style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: 200,
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                overflow: 'hidden',
                zIndex: 1050,
            }}
        >
            {profileItems?.map((item) => {
                if (!item) return null;

                if (item.type === 'divider') {
                    return (
                        <div
                            key={item.key || 'divider'}
                            style={{ borderTop: '1px solid #f0f0f0', margin: '4px 0' }}
                        />
                    );
                }

                const isLogout = item.key === 'logout';
                const label = item.label as React.ReactNode;

                return (
                    <div
                        key={item.key}
                        onClick={() => {
                            if (isLogout) logoutHandler();
                            setProfileOpen(false);
                        }}
                        style={{
                            padding: '0px 16px',
                            cursor: 'pointer',
                            color: isLogout ? '#ff4d4f' : 'rgba(0,0,0,0.88)',
                            transition: 'background 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = 'rgba(0,0,0,0.04)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = 'transparent')
                        }
                    >
                        {label}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            <Notification notifRef={notifRef} toggleNotif={toggleNotif} unreadCount={unreadCount} notifOpen={notifOpen} notificationCard={notificationCard} />

            <div ref={profileRef} style={{ position: 'relative' }}>
                <div
                    onClick={toggleProfile}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        cursor: 'pointer',
                        padding: '2px 6px',
                        borderRadius: 8,
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = 'transparent')
                    }
                >
                    <Avatar
                        src={userProfile.avatar}
                        icon={<UserOutlined />}
                        size={36}
                        style={{ backgroundColor: '#1890ff' }}
                    />
                </div>

                {profileOpen && profileMenu}
            </div>
        </div>
    );
};

export default ProfileAndNotification;