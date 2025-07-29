import { Form, Input, Button, Card, Typography, Layout } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import FlashMessage from '@/Components/FlashMessage';
import { useLoginForm } from '@/hooks/useLoginForm';

const { Content } = Layout;
const { Title, Text } = Typography;

interface LoginProps {
  errors?: {
    email?: string;
    password?: string;
  };
  status?: string;
}

export default function Login({ errors, status }: LoginProps) {
  const { data, setData, processing, handleSubmit } = useLoginForm(errors, status);

  return (
    <Layout style={{ minHeight: '100vh', background: '#081028' }}>
      <FlashMessage flash={{}} />
      <Content style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
            <Card 
                style={{ 
                background: '#0B1739', 
                border: '1px solid #AEB9E1', 
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
            >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ 
                    fontSize: '48px', 
                    color: '#CB3CFF', 
                    marginBottom: '16px',
                    fontWeight: 'bold'
                }}>
                    Admin
                </div>
                <Title level={2} style={{ color: '#CB3CFF', margin: 0 }}>
                    Welcome Back
                </Title>
                <Text style={{ color: '#AEB9E1', fontSize: '16px' }}>
                    Sign in to your admin account
                </Text>
            </div>

            <Form
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
                initialValues={data}
            >
              <Form.Item
                label={<span style={{ color: '#AEB9E1' }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input
                    prefix={<UserOutlined style={{ color: '#AEB9E1' }} />}
                    placeholder="Enter your email"
                    style={{ 
                        background: '#081028', 
                        border: '1px solid #AEB9E1', 
                        color: '#fff',
                        height: '48px'
                    }}
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />
                </Form.Item>

                <Form.Item
                    label={<span style={{ color: '#AEB9E1' }}>Password</span>}
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#AEB9E1' }} />}
                        placeholder="Enter your password"
                        style={{ 
                            background: '#081028', 
                            border: '1px solid #AEB9E1', 
                            color: '#fff',
                            height: '48px'
                        }}
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={processing}
                        style={{
                            background: '#CB3CFF',
                            borderColor: '#CB3CFF',
                            color: '#fff',
                            height: '48px',
                            width: '100%',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                        icon={<LoginOutlined />}
                    >
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
            </Card>
            </div>
        </Content>
    </Layout>
  );
} 