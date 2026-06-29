import React, { useState, useEffect, useMemo, useContext } from 'react';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Spin } from 'antd';
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { getMenuOptions } from './sidebar/menuOption';
import ProfileAndNotification from './profileAndNotification';
import { AuthContext } from '../context/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const { profile, isProfileLoading, logoutHandler, permissions, roleNames } = useContext(AuthContext);

  const { menuOptions, menuPaths } = useMemo(() => {
    return getMenuOptions(permissions, roleNames);
  }, [permissions, roleNames, profile]);

  const selectedKey = useMemo(() => {
    const match = menuPaths.find((item) =>
      item.path === location.pathname || location.pathname.startsWith(item.path + '/')
    );
    return match?.key || '1';
  }, [location.pathname, menuPaths]);


  useEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (mobile) setCollapsed(true);
  }, [mobile]);


  const profileItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link to='/profile'>
          <span>
            <UserOutlined /> {profile?.name || "User"}
          </span>
        </Link>
      ),
    },
    {
      key: 'settings',
      label: (
        <span>
          <UploadOutlined /> Settings
        </span>
      ),
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: (
        <span>
          <MenuFoldOutlined /> Logout
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
        <div className="demo-logo-vertical" style={{ padding: '20px', textAlign: 'center' }}>
          {/* Logo here */}
        </div>
        <div style={{ overflow: 'auto', height: 'calc(100vh - 120px)' }}>

          {!isProfileLoading && profile ? (
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              items={menuOptions}
              style={{ height: '100%' }}
            />
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <Spin size="large" />
              <p className='text-white'>Loading...</p>
            </div>
          )}
        </div>
      </Sider>

      <Layout style={{
        marginLeft: collapsed || mobile ? 0 : 200,
        transition: 'margin-left 0.2s',
        minHeight: '100vh',
      }}>
        <Header style={{
          padding: 0,
          background: colorBgContainer,
          position: 'fixed',
          zIndex: 1001,
          width: `calc(100% - ${collapsed || mobile ? 0 : 200}px)`,
          left: collapsed || mobile ? 0 : 200,
          transition: 'all 0.2s',
        }}>
          <div className='flex items-center justify-between' style={{ padding: '0 16px' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <ProfileAndNotification
              profileItems={profileItems}
              logoutHandler={logoutHandler}
              userProfile={{ avatar: '/assets/imgs/avatar.png' }}
            />
          </div>
        </Header>

        <Content style={{
          margin: '64px 16px 16px',
          overflow: 'auto',
          height: 'calc(100vh - 64px)',
        }}>
          <div style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            marginTop: '20px',
          }}>
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