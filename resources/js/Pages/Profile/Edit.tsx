import { Form, Input, Button, Card, Typography, DatePicker } from 'antd';
import dayjs from 'dayjs';
import FlashMessage from '@/Components/FlashMessage';
import AdminLayout from '@/Components/AdminLayout';
import { useProfileForm } from '@/hooks/useProfileForm';

const { Title } = Typography;

interface ProfileEditProps {
  user: {
    id: number;
    name: string;
    email: string;
    date_of_birth: string | null;
  };
}

export default function ProfileEdit({ user }: ProfileEditProps) {
  const { data, setData, processing, handleSubmit } = useProfileForm(user);

  return (
    <AdminLayout title="Profile Settings" selectedKey="profile">
      <FlashMessage flash={{}} />
      <div style={{ padding: '32px' }}>
        <Card style={{ background: '#0B1739', border: '1px solid #AEB9E1', borderRadius: 8 }}>
          <Title level={4} style={{ color: '#CB3CFF', marginBottom: 24 }}>Update Profile Information</Title>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              name: data.name,
              email: data.email,
              date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
            }}
          >
            <Form.Item
              label={<span style={{ color: '#AEB9E1' }}>Name</span>}
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input
                style={{ background: '#081028', border: '1px solid #AEB9E1', color: '#fff' }}
                placeholder="Enter your name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: '#AEB9E1' }}>Email</span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input
                style={{ background: '#081028', border: '1px solid #AEB9E1', color: '#fff' }}
                placeholder="Enter your email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: '#AEB9E1' }}>Date of Birth</span>}
              name="date_of_birth"
            >
              <DatePicker
                style={{ 
                  background: '#081028', 
                  border: '1px solid #AEB9E1', 
                  color: '#fff',
                  width: '100%'
                }}
                placeholder="Select date of birth"
                value={data.date_of_birth ? dayjs(data.date_of_birth) : null}
                onChange={date => setData('date_of_birth', date ? date.format('YYYY-MM-DD') : null)}
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
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  );
} 