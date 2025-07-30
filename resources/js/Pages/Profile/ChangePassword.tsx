import { Form, Input, Button, Card, Typography } from 'antd';
import { Head } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import AdminLayout from '@/Components/AdminLayout';
import { usePasswordForm } from '@/hooks/usePasswordForm';

const { Title } = Typography;

export default function ChangePassword() {
  const { data, setData, processing, errors, handleSubmit } = usePasswordForm();

  return (
    <>
      <Head title="Change Password - Admin Panel" />
      <AdminLayout title="Change Password" selectedKey="password">
        <FlashMessage flash={{}} />
        <div className="p-4 sm:p-6 md:p-8">
          <Card className="bg-[#0B1739] border border-[#AEB9E1] rounded-lg">
            <Title level={4} className="text-primary mb-6 text-base sm:text-lg md:text-xl">
              Change Your Password
            </Title>
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={data}
            >
              <Form.Item
                label={<span className="text-[#AEB9E1]">Current Password</span>}
                name="current_password"
                rules={[{ required: true, message: 'Please enter your current password' }]}
                validateStatus={errors.current_password ? 'error' : ''}
                help={errors.current_password}
              >
                <Input.Password
                  className="bg-[#081028] border border-[#AEB9E1] text-white h-9 sm:h-10"
                  placeholder="Enter your current password"
                  value={data.current_password}
                  onChange={e => setData('current_password', e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#AEB9E1]">New Password</span>}
                name="new_password"
                rules={[
                  { required: true, message: 'Please enter your new password' },
                  { min: 8, message: 'Password must be at least 8 characters' }
                ]}
                validateStatus={errors.new_password ? 'error' : ''}
                help={errors.new_password}
              >
                <Input.Password
                  className="bg-[#081028] border border-[#AEB9E1] text-white h-9 sm:h-10"
                  placeholder="Enter your new password"
                  value={data.new_password}
                  onChange={e => setData('new_password', e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#AEB9E1]">Confirm New Password</span>}
                name="new_password_confirmation"
                rules={[
                  { required: true, message: 'Please confirm your new password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
                validateStatus={errors.new_password_confirmation ? 'error' : ''}
                help={errors.new_password_confirmation}
              >
                <Input.Password
                  className="bg-[#081028] border border-[#AEB9E1] text-white h-9 sm:h-10"
                  placeholder="Confirm your new password"
                  value={data.new_password_confirmation}
                  onChange={e => setData('new_password_confirmation', e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={processing}
                  className="bg-primary border-primary text-white h-9 sm:h-10 w-full sm:w-30 text-sm sm:text-base"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
} 