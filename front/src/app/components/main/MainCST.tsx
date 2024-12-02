'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button as AntButton, Drawer as AntDrawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import styles from './MainCST.module.css';
import FooterCST from '../footerCST/FooterCST';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;

const items = [
  { key: '/', label: 'Accueil' },
  { key: '/guide', label: 'Guide' },
  { key: '/actuality', label: 'Actualités' },
  { key: '/comparator', label: 'Comparateur' },
  { key: '/contact', label: 'Contact' },
  { key: '/signup', label: <button className= {'border-btn'}>Inscription</button> },
]; 

interface MainCSTProps {
  children: React.ReactNode;
}

const MainCST: React.FC<MainCSTProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    const currentIsDashboard = pathname.includes("admin");
    setIsDashboard(currentIsDashboard);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [pathname]);

  useEffect(()=> {
    console.log("is dash :  "+ isDashboard)
  }, [isDashboard])

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
    onClose();
  };
  
  return (
    <Layout className="layout">
      {!isDashboard && <>
      <Header className="header containerCST">
        <div className="logo">Logo</div>
        {isLargeScreen ? (
          <Menu
            theme="dark" 
            mode="horizontal"
            selectedKeys={[pathname]}
            items={items.map((item) => ({
              key: item.key,
              label: <Link className={styles.itemClass} href={item.key}>{item.label}</Link>,
            }))}
            onClick={handleMenuClick}
            className="desktop-menu"
          />
        ) : (
          <AntButton
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className="menu-button"
          />
        )}
      </Header>
      <AntDrawer
        title={<div className="drawer-title">Menu</div>}
        placement="right"
        onClose={onClose}
        open={visible}
        closeIcon={<CloseOutlined style={{ fontSize: '18px' }} />}
        width={280}
      >
        <Menu
          theme="light"
          mode="vertical"
          selectedKeys={[pathname]}
          items={items.map((item) => ({
            key: item.key,
            label: item.label,
          }))}
          onClick={handleMenuClick}
          className="mobile-menu"
        />
      </AntDrawer>
      </>}
      <Content className="content">
        {children}
      </Content>
      {!isDashboard && <FooterCST />}
      <style jsx global>{`
        .layout {
          min-height: 100vh;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: fixed;
          width: 100%;
          z-index: 1000;
          background-color: white;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #133115;
        }
        .desktop-menu {
          flex: 1;
          min-width: 0;
          color: #133115;
          justify-content: flex-end;
          background-color: transparent;
        }
        .desktop-menu :global(.ant-menu-item) {
          color: black !important;
        }
        .desktop-menu :global(.ant-menu-item-selected) {
          background-color: transparent !important;
        }
        .desktop-menu :global(.ant-menu-item-selected a) {
          color: #4CAF50 !important;
        }
        .desktop-menu :global(.ant-menu-item a) {
          color: black !important;
        }
        .desktop-menu :global(.ant-menu-item:hover) {
          color: #4CAF50 !important;
        }
        .menu-button {
          color: black;
          font-size: 18px;
        }
        .drawer-title {
          font-size: 20px;
          font-weight: bold;
        }
        .mobile-menu {
          border-right: none;
        }
        .mobile-menu :global(.ant-menu-item) {
          color: #133115 !important;
        }
        .content {
          padding: 0;
        }
        .footer {
          text-align: center;
          background: white;
          color: rgba(255, 255, 255, 0.65);
        }
        @media (max-width: 767px) {
          .header {
            padding: 0 16px;
          }
          .content {
            padding: 16px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default MainCST;