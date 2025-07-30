import { Card, Row, Col, Statistic, Table, Progress, Tag } from 'antd';
import { TeamOutlined, UserOutlined, CalendarOutlined, BarChartOutlined } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Components/AdminLayout';

interface DashboardProps {
  statistics: {
    total_users: number;
    standard_users: number;
    average_age: number;
    recent_users: number;
    age_distribution: Array<{ age_range: string; count: number; }>;
  };
}

export default function Dashboard({ statistics }: DashboardProps) {
  const ageDistributionColumns = [
    {
      title: 'Age Range',
      dataIndex: 'age_range',
      key: 'age_range',
      render: (text: string) => <span className="text-white font-bold">{text}</span>,
      responsive: ['md' as const],
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      render: (count: number) => (
        <Tag color="#CB3CFF" className="text-sm font-bold">
          {count} users
        </Tag>
      ),
    },
    {
      title: 'Percentage',
      key: 'percentage',
      render: (record: any) => {
        const percentage = ((record.count / statistics.total_users) * 100).toFixed(1);
        return (
          <div className="flex items-center gap-2">
            <Progress 
              percent={parseFloat(percentage)} 
              size="small" 
              strokeColor="#CB3CFF"
              trailColor="#AEB9E1"
              showInfo={false}
              className="flex-1"
            />
            <span className="text-[#AEB9E1] min-w-10">{percentage}%</span>
          </div>
        );
      },
      responsive: ['md' as const],
    },
  ];

  const getAgeDistributionData = () => {
    return statistics.age_distribution.map((item, index) => ({
      ...item,
      key: index,
      percentage: ((item.count / statistics.total_users) * 100).toFixed(1),
    }));
  };

  return (
    <>
      <Head title="Dashboard - Admin Panel" />
      <AdminLayout title="Dashboard Overview" selectedKey="dashboard">
        <div className="p-4 sm:p-6">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-[#081028] border border-[#AEB9E1] rounded-lg">
                <Statistic
                  title={<span className="text-[#AEB9E1] text-xs sm:text-sm">Total Users</span>}
                  value={statistics.total_users}
                  valueStyle={{ color: '#CB3CFF', fontSize: '24px', fontWeight: 'bold' }}
                  prefix={<TeamOutlined className="text-primary" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-[#081028] border border-[#AEB9E1] rounded-lg">
                <Statistic
                  title={<span className="text-[#AEB9E1] text-xs sm:text-sm">Standard Users</span>}
                  value={statistics.standard_users}
                  valueStyle={{ color: '#4CAF50', fontSize: '24px', fontWeight: 'bold' }}
                  prefix={<UserOutlined className="text-[#4CAF50]" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-[#081028] border border-[#AEB9E1] rounded-lg">
                <Statistic
                  title={<span className="text-[#AEB9E1] text-xs sm:text-sm">Average Age</span>}
                  value={statistics.average_age}
                  valueStyle={{ color: '#FF9800', fontSize: '24px', fontWeight: 'bold' }}
                  prefix={<UserOutlined className="text-[#FF9800]" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="bg-[#081028] border border-[#AEB9E1] rounded-lg">
                <Statistic
                  title={<span className="text-[#AEB9E1] text-xs sm:text-sm">Recent Users (30d)</span>}
                  value={statistics.recent_users}
                  valueStyle={{ color: '#2196F3', fontSize: '24px', fontWeight: 'bold' }}
                  prefix={<CalendarOutlined className="text-[#2196F3]" />}
                />
              </Card>
            </Col>
          </Row>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <BarChartOutlined className="text-primary" />
                <span className="text-primary text-base sm:text-lg font-bold">
                  Age Distribution
                </span>
              </div>
            }
            className="bg-[#081028] border border-[#AEB9E1] rounded-lg"
          >
            <div className="overflow-hidden">
              <Table
                columns={ageDistributionColumns}
                dataSource={getAgeDistributionData()}
                pagination={false}
                className="bg-[#081028] no-scrollbar"
              />
            </div>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
} 