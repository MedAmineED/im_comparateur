"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Modal, theme, message } from 'antd';
import styles from './Dashboard.module.css';
import AuthService from '../../API/AuthService';

const { Header, Sider, Content } = Layout;
const rootRoute = '/admin/dashboard';

const items = [
  {
    key: rootRoute,
    icon: <UserOutlined />,
    label: 'Clients',
  },
  {
    key: rootRoute + "/guides",
    icon: <VideoCameraOutlined />,
    label: 'Guides',
  },
  {
    key: rootRoute + "/actualities",
    icon: <VideoCameraOutlined />,
    label: 'Actualité',
  },
  {
    key: rootRoute + "/users",
    icon: <UploadOutlined />,
    label: 'Utilisateurs',
  },
];

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      message.success('Déconnexion réussie');
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Erreur lors de la déconnexion');
    }
  };

  const showLogoutConfirmation = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalVisible(false);
    handleLogout();
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[rootRoute]}
          items={items.map((item) => ({
            key: item.key,
            icon: item.icon,  
            label: <Link href={item.key}>{item.label}</Link>,
          }))}
          onSelect={({ key }) => router.push(key)}
        />
        <Button 
          type="text" 
          icon={<LogoutOutlined />} 
          onClick={showLogoutConfirmation}
          style={{ 
            width: '100%', 
            color: '#fff',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            paddingLeft: collapsed ? '24px' : '24px'
          }}
        >
          {!collapsed && 'Déconnexion'}
        </Button>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
      <Modal
        title="Confirmation de déconnexion"
        open={isLogoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        okText="Déconnexion"
        cancelText="Annuler"
      >
        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
      </Modal>
    </Layout>
  );
};

export default DashboardLayout;
