// Notification.tsx — Minor update for animation
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const Notification = ({ notifRef, toggleNotif, unreadCount, notifOpen, notificationCard }: any) => {
    return (
        <div ref={notifRef} style={{ position: 'relative' }}>
            <div
                onClick={toggleNotif}
                style={{
                    cursor: 'pointer',
                    padding: 10,
                    borderRadius: 10,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: notifOpen ? 'rgba(24,144,255,0.1)' : 'transparent',
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.background = notifOpen ? 'rgba(24,144,255,0.1)' : 'transparent')
                }
            >
                <Badge
                    count={unreadCount}
                    size="small"
                    overflowCount={99}
                    offset={[0, 2]}
                >
                    <BellOutlined
                        style={{
                            fontSize: 22,
                            color: notifOpen ? '#1890ff' : '#262626',
                            transition: 'color 0.2s',
                        }}
                    />
                </Badge>
            </div>

            {notifOpen && notificationCard}
        </div>
    );
};

export default Notification;