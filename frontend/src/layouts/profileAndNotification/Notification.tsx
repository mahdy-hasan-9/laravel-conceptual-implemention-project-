import { Badge } from "antd"
import { BellOutlined } from '@ant-design/icons';


const Notification = ({ notifRef, toggleNotif, unreadCount, notifOpen, notificationCard }: any) => {
    return (
        <div ref={notifRef} style={{ position: 'relative' }}>
            <div
                onClick={toggleNotif}
                style={{
                    cursor: 'pointer',
                    padding: 8,
                    borderRadius: 8,
                    transition: 'background 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                }
            >
                <Badge count={unreadCount} size="small" overflowCount={99}>
                    <BellOutlined style={{ fontSize: 20, color: '#262626' }} />
                </Badge>
            </div>

            {notifOpen && notificationCard}
        </div>
    )
}

export default Notification