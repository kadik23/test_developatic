import { Form, Input, Button, Card, Typography } from 'antd';
import FlashMessage from '@/Components/FlashMessage';
import AdminLayout from '@/Components/AdminLayout';
import { usePasswordForm } from '@/hooks/usePasswordForm';

const { Title } = Typography;

export default function ChangePassword() {
  const { data, setData, processing, errors, handleSubmit } = usePasswordForm();

  return (
    <AdminLayout title="Change Password" selectedKey="password">
      <FlashMessage flash={{}} />
      <div style={{ padding: '32px' }}>
        <Card style={{ background: '#0B1739', border: '1px solid #AEB9E1', borderRadius: 8 }}>
          <Title level={4} style={{ color: '#CB3CFF', marginBottom: 24 }}>Change Your Password</Title>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={data}
          >
            <Form.Item
              label={<span style={{ color: '#AEB9E1' }}>Current Password</span>}
              name="current_password"
              rules={[{ required: true, message: 'Please enter your current password' }]}
              validateStatus={errors.current_password ? 'error' : ''}
              help={errors.current_password}
            >
              <Input.Password
                style={{ background: '#081028', border: '1px solid #AEB9E1', color: '#fff' }}
                placeholder="Enter your current password"
                value={data.current_password}
                onChange={e => setData('current_password', e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: '#AEB9E1' }}>New Password</span>}
              name="new_password"
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
              validateStatus={errors.new_password ? 'error' : ''}
              help={errors.new_password}
            >
              <Input.Password
                style={{ background: '#081028', border: '1px solid #AEB9E1', color: '#fff' }}
                placeholder="Enter your new password"
                value={data.new_password}
                onChange={e => setData('new_password', e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: '#AEB9E1' }}>Confirm New Password</span>}
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
                style={{ background: '#081028', border: '1px solid #AEB9E1', color: '#fff' }}
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
                style={{
                  background: '#CB3CFF',
                  borderColor: '#CB3CFF',
                  color: '#fff',
                  height: 40,
                  width: 120
                }}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  );
} 