import { Table, Button, Popconfirm, Card, Input, Select, Row, Col, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import FlashMessage from '@/Components/FlashMessage';
import AdminLayout from '@/Components/AdminLayout';
import { useUserForm } from '@/hooks/useUserForm';

const { Search } = Input;
const { Option } = Select;

interface UsersIndexProps {
  users: {
    data: User[];
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
  };
  filters: {
    search: string | null;
    sort_by: string;
    sort_order: string;
    per_page: number;
  };
}

export default function UsersIndex({ users, filters }: UsersIndexProps) {
  const {
    loading,
    searchValue,
    setSearchValue,
    handleDelete,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePerPageChange,
  } = useUserForm(users, filters);

  const columns: ColumnsType<User> = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name', 
      render: (text: string) => <span style={{ color: '#fff' }}>{text}</span>,
      sorter: true,
      sortOrder: filters.sort_by === 'name' ? (filters.sort_order === 'asc' ? 'ascend' : 'descend') : null,
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email', 
      render: (text: string) => <span style={{ color: '#AEB9E1' }}>{text}</span> 
    },
    { 
      title: 'Date of Birth', 
      dataIndex: 'date_of_birth', 
      key: 'date_of_birth', 
      render: (text: string) => <span style={{ color: '#AEB9E1' }}>{text || 'N/A'}</span>,
      sorter: true,
      sortOrder: filters.sort_by === 'date_of_birth' ? (filters.sort_order === 'asc' ? 'ascend' : 'descend') : null,
    },
    { 
      title: 'Type', 
      dataIndex: 'user_type', 
      key: 'user_type', 
      render: (text: string) => <span style={{ color: text === 'ADMIN' ? '#CB3CFF' : '#AEB9E1' }}>{text}</span> 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <Popconfirm 
          title="Delete user?" 
          onConfirm={() => handleDelete(record.id)} 
          okText="Yes" 
          cancelText="No"
        >
          <Button 
            danger 
            size="small" 
            loading={loading} 
            icon={<DeleteOutlined />}
            style={{ 
              background: '#CB3CFF', 
              borderColor: '#CB3CFF', 
              color: '#fff' 
            }}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout title="Users Management" selectedKey="users">
      <FlashMessage flash={{}} />
      <div style={{ padding: '24px' }}>
        {/* Search and Filters */}
        <Card style={{ background: '#0B1739', border: '1px solid #AEB9E1', borderRadius: 8, marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Search by name..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
                style={{ width: '100%' }}
                enterButton={<SearchOutlined />}
              />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                value={filters.sort_by}
                onChange={(value) => handleSort(value, filters.sort_order)}
                style={{ width: '100%' }}
                placeholder="Sort by"
              >
                <Option value="name">Name</Option>
                <Option value="email">Email</Option>
                <Option value="date_of_birth">Date of Birth</Option>
                <Option value="created_at">Created Date</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                value={filters.sort_order}
                onChange={(value) => handleSort(filters.sort_by, value)}
                style={{ width: '100%' }}
                placeholder="Order"
              >
                <Option value="asc">Ascending</Option>
                <Option value="desc">Descending</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                value={filters.per_page}
                onChange={handlePerPageChange}
                style={{ width: '100%' }}
                placeholder="Per page"
              >
                <Option value={10}>10 per page</Option>
                <Option value={15}>15 per page</Option>
                <Option value={25}>25 per page</Option>
                <Option value={50}>50 per page</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <span style={{ color: '#AEB9E1' }}>
                Total: {users.total} users
              </span>
            </Col>
          </Row>
        </Card>
        {/* Users Table */}
        <Card style={{ background: '#0B1739', border: '1px solid #AEB9E1', borderRadius: 8 }}>
          <Table
            columns={columns}
            dataSource={users.data}
            rowKey="id"
            style={{ background: '#0B1739', color: '#fff' }}
            pagination={false}
            onChange={(pagination, filters, sorter: any) => {
              if (sorter.field) {
                handleSort(sorter.field, sorter.order === 'ascend' ? 'asc' : 'desc');
              }
            }}
          />
          {/* Custom Pagination */}
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Pagination
              current={users.current_page}
              total={users.total}
              pageSize={users.per_page}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => 
                `${range[0]}-${range[1]} of ${total} users`
              }
              style={{ color: '#AEB9E1' }}
            />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
} 