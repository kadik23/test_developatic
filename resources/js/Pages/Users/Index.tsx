import { Table, Button, Popconfirm, Card, Input, Select, Row, Col, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
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
      render: (text: string) => <span className="text-white">{text}</span>,
      sorter: true,
      sortOrder: filters.sort_by === 'name' ? (filters.sort_order === 'asc' ? 'ascend' : 'descend') : null,
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email', 
      render: (text: string) => <span className="text-[#AEB9E1]">{text}</span>,
      responsive: ['md' as const],
    },
    { 
      title: 'Date of Birth', 
      dataIndex: 'date_of_birth', 
      key: 'date_of_birth', 
      render: (text: string) => <span className="text-[#AEB9E1]">{text || 'N/A'}</span>,
      sorter: true,
      sortOrder: filters.sort_by === 'date_of_birth' ? (filters.sort_order === 'asc' ? 'ascend' : 'descend') : null,
      responsive: ['lg' as const],
    },
    { 
      title: 'Type', 
      dataIndex: 'user_type', 
      key: 'user_type', 
      render: (text: string) => <span className={text === 'ADMIN' ? 'text-primary' : 'text-[#AEB9E1]'}>{text}</span>,
      responsive: ['sm' as const],
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
            className="bg-primary border-primary text-white text-xs sm:text-sm"
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Head title="Users Management - Admin Panel" />
      <AdminLayout title="Users Management" selectedKey="users">
        <FlashMessage flash={{}} />
        <div className="p-4 sm:p-6">
          {/* Search and Filters */}
          <Card className="bg-[#0B1739] border border-[#AEB9E1] rounded-lg mb-4">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={8}>
                <Search
                  placeholder="Search by name..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={handleSearch}
                  className="w-full"
                  enterButton={<SearchOutlined />}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  value={filters.sort_by}
                  onChange={(value) => handleSort(value, filters.sort_order)}
                  className="w-full"
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
                  className="w-full"
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
                  className="w-full"
                  placeholder="Per page"
                >
                  <Option value={10}>10 per page</Option>
                  <Option value={15}>15 per page</Option>
                  <Option value={25}>25 per page</Option>
                  <Option value={50}>50 per page</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <span className="text-[#AEB9E1] text-xs sm:text-sm">
                  Total: {users.total} users
                </span>
              </Col>
            </Row>
          </Card>
          <Card className="bg-[#0B1739] border border-[#AEB9E1] rounded-lg">
            <Table
              columns={columns}
              dataSource={users.data}
              rowKey="id"
              className="bg-[#0B1739] text-white"
              pagination={false}
              scroll={{ x: true }}
              onChange={(pagination, filters, sorter: any) => {
                if (sorter.field) {
                  handleSort(sorter.field, sorter.order === 'ascend' ? 'asc' : 'desc');
                }
              }}
            />
            <div className="mt-4 text-center">
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
                className="text-[#AEB9E1]"
              />
            </div>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
} 