import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { UserOutlined, DashboardOutlined, LogoutOutlined, SettingOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  selectedKey: string;
}

export default function AdminLayout({ children, title, selectedKey }: AdminLayoutProps) {
  const menuItems = [
    { 
      key: 'dashboard', 
      icon: <DashboardOutlined />, 
      label: <Link href="/" preserveScroll>Dashboard</Link> 
    },
    { 
      key: 'users', 
      icon: <UserOutlined />, 
      label: <Link href="/users" preserveScroll>Users</Link> 
    },
    { 
      key: 'profile', 
      icon: <SettingOutlined />, 
      label: <Link href="/profile" preserveScroll>Profile</Link> 
    },
    { 
      key: 'password', 
      icon: <LockOutlined />, 
      label: <Link href="/profile/password" preserveScroll>Change Password</Link> 
    },
    { 
      key: 'logout', 
      icon: <LogoutOutlined />, 
      label: <Link href="/logout" method="post" as="button">Logout</Link> 
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#081028' }}>
      <Sider width={220} style={{ background: '#0B1739' }}>
        <div style={{ height: 64, margin: 16, color: '#CB3CFF', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          style={{ background: '#0B1739', color: '#AEB9E1' }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#0B1739', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ color: '#CB3CFF', margin: 0, flex: 1 }}>{title}</Title>
        </Header>
        <Content style={{ margin: '32px', background: '#0B1739', borderRadius: 12, boxShadow: '0 4px 32px #0008' }}>
          {children}
        </Content>
        <Footer style={{ background: '#0B1739', color: '#AEB9E1', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Admin Dashboard
        </Footer>
      </Layout>
    </Layout>
  );
} 