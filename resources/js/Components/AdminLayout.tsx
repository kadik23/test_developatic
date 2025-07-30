import React, { useState } from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { UserOutlined, DashboardOutlined, LogoutOutlined, SettingOutlined, LockOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  selectedKey: string;
}

export default function AdminLayout({ children, title, selectedKey }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

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
    <Layout className="min-h-screen bg-[#081028]">
      <Sider 
        width={220} 
        collapsedWidth={80}
        collapsible 
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="bg-[#0B1739]"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
      >
        <div className={`h-16 m-4 text-primary font-bold text-center flex items-center justify-center ${collapsed ? 'text-base' : 'text-2xl'}`}>
          {collapsed ? 'A' : 'Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          className="bg-[#0B1739] text-[#AEB9E1]"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="bg-[#0B1739] px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-primary text-base block lg:hidden"
            />
            <Title level={3} className="text-primary m-0 text-lg sm:text-xl md:text-2xl">
              {title}
            </Title>
          </div>
        </Header>
        <Content className="m-2 sm:m-4 md:m-6 lg:m-8 bg-[#0B1739] rounded-xl shadow-lg overflow-auto">
          {children}
        </Content>
        <Footer className="bg-[#0B1739] text-[#AEB9E1] text-center px-4 py-2 sm:px-6">
          &copy; {new Date().getFullYear()} Admin Dashboard
        </Footer>
      </Layout>
    </Layout>
  );
} 