

import { useState, useCallback, useRef, useEffect, useContext } from 'react';
import { Avatar, List, Button, Empty, Typography, Spin } from 'antd';
import { UserOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import Notification from './Notification';
import { AuthContext } from '../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';



const { Text } = Typography;

interface ProfileAndNotificationProps {
    profileItems: any;
    logoutHandler: () => void;
    userProfile: any;
}

const ProfileAndNotification = ({
    profileItems,
    logoutHandler,
    userProfile,
}: ProfileAndNotificationProps) => {
    const { profile } = useContext(AuthContext);
    const {
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        clearAll,
    } = useNotifications(profile?.id);

    const [notifOpen, setNotifOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const toggleNotif = useCallback(() => {
        setNotifOpen((prev) => !prev);
        setProfileOpen(false);
    }, []);

    const toggleProfile = useCallback(() => {
        setProfileOpen((prev) => !prev);
        setNotifOpen(false);
    }, []);

    // Click outside close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };

        if (notifOpen || profileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [notifOpen, profileOpen]);

    // 🔔 Notification Card UI
    const notificationCard = (
        <div
            style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 380,
                maxHeight: 480,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                zIndex: 1050,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderBottom: '1px solid #f0f0f0',
                    background: '#fafafa',
                }}
            >
                <Text strong style={{ fontSize: 16 }}>
                    🔔 Notifications {unreadCount > 0 && `(${unreadCount} unread)`}
                </Text>
                <div style={{ display: 'flex', gap: 8 }}>
                    {unreadCount > 0 && (
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

            {/* List */}
            <div style={{ maxHeight: 380, overflow: 'auto' }}>
                {loading ? (
                    <div style={{ padding: 40, textAlign: 'center' }}>
                        <Spin size="small" />
                        <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                            Loading...
                        </Text>
                    </div>
                ) : notifications.length === 0 ? (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No notifications yet"
                        style={{ padding: 40 }}
                    />
                ) : (
                    <List
                        dataSource={notifications}
                        renderItem={(item) => (
                            <List.Item
                                style={{
                                    padding: '14px 18px',
                                    cursor: 'pointer',
                                    background: item.read_at ? 'transparent' : '#e6f7ff',
                                    transition: 'all 0.2s',
                                    borderBottom: '1px solid #f0f0f0',
                                }}
                                onClick={() => !item.read_at && markAsRead(item.id)}
                                onMouseEnter={(e) => {
                                    if (!item.read_at) {
                                        e.currentTarget.style.background = '#bae7ff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = item.read_at
                                        ? 'transparent'
                                        : '#e6f7ff';
                                }}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            size="small"
                                            icon={<UserOutlined />}
                                            style={{
                                                backgroundColor: item.read_at ? '#bfbfbf' : '#1890ff',
                                            }}
                                        />
                                    }
                                    title={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Text
                                                strong={!item.read_at}
                                                style={{
                                                    fontSize: 14,
                                                    color: item.read_at ? '#8c8c8c' : '#262626',
                                                }}
                                            >
                                                {item.heading}
                                            </Text>
                                            {!item.read_at && (
                                                <span
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        background: '#ff4d4f',
                                                        display: 'inline-block',
                                                        flexShrink: 0,
                                                        animation: 'pulse 2s infinite',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <Text
                                                type="secondary"
                                                style={{
                                                    fontSize: 13,
                                                    color: item.read_at ? '#bfbfbf' : '#595959',
                                                }}
                                            >
                                                {item.description}
                                            </Text>
                                            <div style={{ marginTop: 6 }}>
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    {new Date(item.created_at).toLocaleString('bn-BD', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        day: 'numeric',
                                                        month: 'short',
                                                    })}
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

    // Profile menu (unchanged)
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
            {profileItems?.map((item: any) => {
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
                return (
                    <div
                        key={item.key}
                        onClick={() => {
                            if (isLogout) logoutHandler();
                            setProfileOpen(false);
                        }}
                        style={{
                            padding: '10px 16px',
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
                        {item.label}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* 🔔 Notification Bell */}
            <Notification
                notifRef={notifRef}
                toggleNotif={toggleNotif}
                unreadCount={unreadCount}
                notifOpen={notifOpen}
                notificationCard={notificationCard}
            />

            {/* 👤 Profile */}
            <div ref={profileRef} style={{ position: 'relative' }}>
                <div
                    onClick={toggleProfile}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        cursor: 'pointer',
                        padding: '4px 8px',
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
                    <Text strong style={{ fontSize: 14 }}>
                        {profile?.name || 'User'}
                    </Text>
                </div>
                {profileOpen && profileMenu}
            </div>
        </div>
    );
};

export default ProfileAndNotification;