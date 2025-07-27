import { Layout, Typography, Card, Row, Col, Button, Space } from 'antd';
import { GithubOutlined, HeartOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function Welcome() {
    return (
        <Layout className="min-h-screen">
            <Header className="bg-white shadow-sm">
                <div className="flex items-center justify-between">
                    <Title level={3} className="mb-0" style={{ color: 'white' }}>
                        Laravel + Inertia + React + Ant Design
                    </Title>
                    <Space>
                        <Button type="primary" icon={<GithubOutlined />}>
                            GitHub
                        </Button>
                    </Space>
                </div>
            </Header>

            <Content className="p-6">
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} lg={16}>
                        <Card>
                            <Title level={2} className="text-center mb-6" style={{ color: 'white' }}>
                                Welcome to Your Laravel Application
                            </Title>
                            
                            <Paragraph className="text-lg text-center mb-8">
                                This is a Laravel application with Inertia.js, React, TypeScript, 
                                Ant Design, and Tailwind CSS all working together!
                            </Paragraph>

                            <Row gutter={[16, 16]} justify="center">
                                <Col xs={24} sm={8}>
                                    <Card size="small" className="text-center">
                                        <HeartOutlined className="text-red-500 text-2xl mb-2" />
                                        <Title level={4} style={{ color: 'white' }}>Laravel</Title>
                                        <Paragraph>
                                            The PHP framework for web artisans
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Card size="small" className="text-center">
                                        <HeartOutlined className="text-blue-500 text-2xl mb-2" />
                                        <Title level={4} style={{ color: 'white' }}>Inertia.js</Title>
                                        <Paragraph>
                                            Build single-page apps without building an API
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={8}>
                                    <Card size="small" className="text-center">
                                        <HeartOutlined className="text-green-500 text-2xl mb-2" />
                                        <Title level={4} style={{ color: 'white' }}>React + TypeScript</Title>
                                        <Paragraph>
                                            Modern UI library with type safety
                                        </Paragraph>
                                    </Card>
                                </Col>
                            </Row>

                            <div className="text-center mt-8">
                                <Space size="large">
                                    <Button type="primary" size="large">
                                        Get Started
                                    </Button>
                                    <Button size="large">
                                        Learn More
                                    </Button>
                                </Space>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Content>

            <Footer className="text-center">
                <Paragraph>
                    Built with <HeartOutlined className="text-red-500" /> using Laravel, Inertia.js, React, TypeScript, and Ant Design
                </Paragraph>
            </Footer>
        </Layout>
    );
} 