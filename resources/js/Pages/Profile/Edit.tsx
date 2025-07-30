import { Form, Input, Button, Card, Typography, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Head } from '@inertiajs/react';
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
    <>
      <Head title="Edit Profile - Admin Panel" />
      <AdminLayout title="Profile Settings" selectedKey="profile">
        <FlashMessage flash={{}} />
        <div className="p-4 sm:p-6 md:p-8">
          <Card className="bg-[#0B1739] border border-[#AEB9E1] rounded-lg">
            <Title level={4} className="text-primary mb-6 text-base sm:text-lg md:text-xl">
              Update Profile Information
            </Title>
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
                label={<span className="text-[#AEB9E1]">Name</span>}
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  className="bg-[#081028] border border-[#AEB9E1] text-white h-9 sm:h-10"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#AEB9E1]">Email</span>}
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input
                  className="bg-[#081028] border border-[#AEB9E1] text-white h-9 sm:h-10"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#AEB9E1]">Date of Birth</span>}
                name="date_of_birth"
              >
                <DatePicker
                  className="bg-[#081028] border border-[#AEB9E1] text-white w-full h-9 sm:h-10"
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
                  className="bg-primary border-primary text-white h-9 sm:h-10 w-full sm:w-30 text-sm sm:text-base"
                >
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
} 