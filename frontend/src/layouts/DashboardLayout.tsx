import React, { useState, useEffect, useMemo } from 'react';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menuOptions, menuPaths } from './sidebar/menuOption';
import ProfileAndNotification from './profileAndNotification';
import toast from 'react-hot-toast';
import { getProfile, isAuthenticated, logoutService } from '../services/authService';
import { email } from 'zod';

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const [user , setUser] = useState({
    name : '',
    email : '',
  })
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userProfile = {
    name: 'Mahedy Hasan',
    email: 'mahedy@example.com',
    avatar: '/assets/imgs/avatar.png',
  };

  const selectedKey = useMemo(() => {
    const match = menuPaths.find((item) =>
      item.path === location.pathname || location.pathname.startsWith(item.path + '/')
    );
    return match?.key || '1';
  }, [location.pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (mobile) {
      setCollapsed(true);
    }
  }, [mobile]);


   useEffect(() => {
  
    const profile = async () => {
        try {
            const resp = await getProfile();
            if(resp.status == 200 && resp.success == true){
              setUser({
                name : resp.data.name,
                email : resp.data.email
              })
            }
        } catch (error: any) {
          toast.error(error.message || 'Something went wrong');
        } 
    }
    profile();
  },[])

  const logoutHandler = async () => {
      setLoading(true);
        try {
            const resp = await logoutService();
            console.log(resp);
            
            if(resp.status == 200 && resp.success == true){
              localStorage.removeItem('token');
              navigate('/login', { replace: true });
              toast.success(resp.message || 'Something went wrong');
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
  };

  const profileItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link to="/profile" style={{ color: 'black', textDecoration: 'none' }}>
          <UserOutlined /> {user.name}
        </Link>
      ),
    },
    {
      key: 'settings',
      label: (
        <Link to="/settings" style={{ color: 'black', textDecoration: 'none' }}>
          <UploadOutlined /> Settings
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <span style={{ color: '#ff4d4f' }} onClick={() => logoutHandler()}>
          <MenuFoldOutlined /> Logout
        </span>
      ),
    },
  ];

  const headerStyle: React.CSSProperties = {
    padding: 0,
    background: colorBgContainer,
    position: 'fixed',
    zIndex: 1001,
    width: `calc(100% - ${collapsed || mobile ? 0 : 200}px)`,
    left: collapsed || mobile ? 0 : 200,
    transition: 'all 0.2s',
  };

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        className="custom-sider"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          paddingTop: '30px',
        }}
        width={200}
      >
        <div className="demo-logo-vertical" style={{ padding: '20px', textAlign: 'center', flexShrink: 0 }}>
          {/* Logo here */}
        </div>
        <div style={{ overflow: 'auto', height: 'calc(100vh - 120px)', flex: 1 }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}   // <-- controlled active state
            items={menuOptions}
            style={{ height: '100%' }}
          />
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed || mobile ? 0 : 200,
          transition: 'margin-left 0.2s',
          minHeight: '100vh',
        }}
      >
        <Header style={headerStyle}>
          <div className='flex items-center justify-between' style={{ padding: '0 16px' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />

            <ProfileAndNotification user={user} profileItems={profileItems} logoutHandler={logoutHandler} userProfile={userProfile} onMouseEnter={onmouseenter} onMouseLeave={onmouseleave} />

          </div>
        </Header>

        <Content style={{ margin: '64px 16px 16px' }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: '20px',
            }}
          >
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Created by Mahedy Hasan ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;