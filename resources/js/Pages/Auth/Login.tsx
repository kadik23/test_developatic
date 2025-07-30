import { Form, Input, Button, Card, Typography, Layout } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
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
    <>
      <Head title="Login - Admin Dashboard" />
      <Layout className="min-h-screen bg-[#081028]">
        <FlashMessage flash={{}} />
        <Content className="flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md">
              <Card className="bg-[#0B1739] border border-[#AEB9E1] rounded-xl shadow-2xl">
              <div className="text-center mb-6 sm:mb-8">
                  <div className="text-3xl sm:text-5xl text-primary mb-3 sm:mb-4 font-bold">
                      Admin
                  </div>
                  <Title level={2} className="text-primary m-0 text-xl sm:text-2xl">
                      Welcome Back
                  </Title>
                  <Text className="text-[#AEB9E1] text-sm sm:text-base">
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
                  label={<span className="text-[#AEB9E1]">Email</span>}
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input
                      prefix={<UserOutlined className="text-[#AEB9E1]" />}
                      placeholder="Enter your email"
                      className="bg-[#081028] border border-[#AEB9E1] text-white h-10 sm:h-12"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                  />
                  </Form.Item>

                  <Form.Item
                      label={<span className="text-[#AEB9E1]">Password</span>}
                      name="password"
                      rules={[{ required: true, message: 'Please enter your password' }]}
                  >
                      <Input.Password
                          prefix={<LockOutlined className="text-[#AEB9E1]" />}
                          placeholder="Enter your password"
                          className="bg-[#081028] border border-[#AEB9E1] text-white h-10 sm:h-12"
                          value={data.password}
                          onChange={e => setData('password', e.target.value)}
                      />
                  </Form.Item>

                  <Form.Item>
                      <Button
                          type="primary"
                          htmlType="submit"
                          loading={processing}
                          className="bg-primary border-primary text-white h-10 sm:h-12 w-full text-sm sm:text-base font-bold"
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
    </>
  );
} 