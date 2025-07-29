import { Card, Row, Col, Statistic, Table, Progress, Tag } from 'antd';
import { TeamOutlined, UserOutlined, CalendarOutlined, BarChartOutlined } from '@ant-design/icons';
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
      render: (text: string) => <span style={{ color: '#fff', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      render: (count: number) => (
        <Tag color="#CB3CFF" style={{ fontSize: '14px', fontWeight: 'bold' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Progress 
              percent={parseFloat(percentage)} 
              size="small" 
              strokeColor="#CB3CFF"
              trailColor="#AEB9E1"
              showInfo={false}
              style={{ flex: 1 }}
            />
            <span style={{ color: '#AEB9E1', minWidth: '40px' }}>{percentage}%</span>
          </div>
        );
      },
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
    <AdminLayout title="Dashboard Overview" selectedKey="dashboard">
      <div style={{ padding: '24px' }}>
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#081028', border: '1px solid #AEB9E1', borderRadius: 8 }}>
              <Statistic
                title={<span style={{ color: '#AEB9E1' }}>Total Users</span>}
                value={statistics.total_users}
                valueStyle={{ color: '#CB3CFF', fontSize: '32px', fontWeight: 'bold' }}
                prefix={<TeamOutlined style={{ color: '#CB3CFF' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#081028', border: '1px solid #AEB9E1', borderRadius: 8 }}>
              <Statistic
                title={<span style={{ color: '#AEB9E1' }}>Standard Users</span>}
                value={statistics.standard_users}
                valueStyle={{ color: '#4CAF50', fontSize: '32px', fontWeight: 'bold' }}
                prefix={<UserOutlined style={{ color: '#4CAF50' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#081028', border: '1px solid #AEB9E1', borderRadius: 8 }}>
              <Statistic
                title={<span style={{ color: '#AEB9E1' }}>Average Age</span>}
                value={statistics.average_age}
                valueStyle={{ color: '#FF9800', fontSize: '32px', fontWeight: 'bold' }}
                prefix={<UserOutlined style={{ color: '#FF9800' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: '#081028', border: '1px solid #AEB9E1', borderRadius: 8 }}>
              <Statistic
                title={<span style={{ color: '#AEB9E1' }}>Recent Users (30d)</span>}
                value={statistics.recent_users}
                valueStyle={{ color: '#2196F3', fontSize: '32px', fontWeight: 'bold' }}
                prefix={<CalendarOutlined style={{ color: '#2196F3' }} />}
              />
            </Card>
          </Col>
        </Row>
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChartOutlined style={{ color: '#CB3CFF' }} />
              <span style={{ color: '#CB3CFF', fontSize: '18px', fontWeight: 'bold' }}>
                Age Distribution
              </span>
            </div>
          }
          style={{ background: '#081028', border: '1px solid #AEB9E1', borderRadius: 8 }}
        >
          <Table
            columns={ageDistributionColumns}
            dataSource={getAgeDistributionData()}
            pagination={false}
            style={{ background: '#081028' }}
          />
        </Card>
      </div>
    </AdminLayout>
  );
} 