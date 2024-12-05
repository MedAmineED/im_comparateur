"use client"
import React, { useState } from 'react';
import { 
  Form, 
  Select, 
  Button, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Tag, 
  Divider,
  Statistic,
  Avatar,
  Badge,
  Input
} from 'antd';
import { 
  SafetyOutlined, 
  FileProtectOutlined, 
  CheckCircleOutlined, 
  StarOutlined 
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface InsuranceResult {
  name: string;
  logo: string;
  monthlyPremium: number;
  franchise: number;
  rating: number;
  benefits: string[];
  tag: string;
}

interface FormValues {
  typeAssurance: 'base' | 'complementaire';
  canton: string;
  age: string;
}

const Page: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [results] = useState<InsuranceResult[]>([
    {
      name: 'Assurance Helvetia Premium',
      logo: 'https://storage.googleapis.com/a1aa/image/3Ta9yvQwpeUYfUxmkeWHyEH7B4bgeydhKmRbRgxV9c6sZbaPB.jpg',
      monthlyPremium: 200,
      franchise: 300,
      rating: 4.5,
      benefits: ['Couverture globale', 'Assistance 24/7', 'Remboursement rapide'],
      tag: 'Meilleur rapport qualité-prix'
    },
    {
      name: 'Assurance Zurich Sécurité+',
      logo: 'https://storage.googleapis.com/a1aa/image/O1DYTcGi6I5NMldhVfineKLi0AoHX2Em6QHAg5gMZl1T2m2TA.jpg',
      monthlyPremium: 180,
      franchise: 500,
      rating: 5,
      benefits: ['Flexibilité maximale', 'Couverture digitale', 'Protection complète'],
      tag: 'Choix des experts'
    },
    {
      name: 'Assurance CSS Confort',
      logo: 'https://storage.googleapis.com/a1aa/image/MdffF2dOnfdVRoIBeHPLdQv36z6RdW68eAfbkODq6SILltp9E.jpg',
      monthlyPremium: 220,
      franchise: 1000,
      rating: 3.5,
      benefits: ['Protection étendue', 'Conseil personnalisé', 'Tarif préférentiel'],
      tag: 'Recommandation personnelle'
    }
  ]);

  const onFinish = (values: FormValues) => {
    console.log('Comparison form values:', values);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
      minHeight: '100vh', 
      padding: '2rem',
      marginTop: '70px' 
    }}>
      <Card 
        style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          borderRadius: 16, 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <Space direction="vertical" size="large">
              <Title level={2} style={{ color: '#1A3B5A', marginBottom: 0 }}>
                <SafetyOutlined style={{ marginRight: 10, color: '#4A90E2' }} />
                Comparateur d&apos;Assurances
              </Title>
              <Paragraph type="secondary" style={{ fontSize: 16 }}>
                Trouvez la protection idéale adaptée à vos besoins spécifiques. Comparez, analysez et choisissez en toute confiance.
              </Paragraph>
            </Space>
          </Col>
          <Col xs={24} md={14}>
            <Card 
              style={{ 
                background: '#f0f2f5', 
                borderRadius: 12 
              }}
            >
              <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item 
                      name="typeAssurance" 
                      label="Type d'Assurance"
                      rules={[{ required: true }]}
                    >
                      <Select 
                        placeholder="Sélectionnez"
                        suffixIcon={<FileProtectOutlined />}
                      >
                        <Option value="base">Assurance de Base</Option>
                        <Option value="complementaire">Assurance Complémentaire</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item 
                      name="canton" 
                      label="Canton"
                      rules={[{ required: true }]}
                    >
                      <Select 
                        placeholder="Votre région"
                        suffixIcon={<StarOutlined />}
                      >
                        <Option value="zurich">Zurich</Option>
                        <Option value="geneve">Genève</Option>
                        <Option value="vaud">Vaud</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item 
                      name="age" 
                      label="Age"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  icon={<CheckCircleOutlined />}
                >
                  Lancer la Comparaison
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        <Divider>Résultats de la Comparaison</Divider>

        <Row gutter={[16, 16]}>
          {results.map((insurance, index) => (
            <Col key={index} xs={24} md={8}>
              <Card
                hoverable
                style={{ 
                  borderRadius: 16, 
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)' 
                }}
                cover={
                  <div style={{ 
                    background: '#f0f2f5', 
                    padding: '20px', 
                    textAlign: 'center' 
                  }}>
                    <Badge count={insurance.rating} color="#4A90E2">
                      <Avatar 
                        src={insurance.logo} 
                        size={120} 
                        shape="square"
                        style={{ border: '4px solid white' }}
                      />
                    </Badge>
                  </div>
                }
              >
                <Card.Meta 
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Title level={4} style={{ margin: 0 }}>{insurance.name}</Title>
                      <Tag color="blue">{insurance.tag}</Tag>
                    </div>
                  }
                  description={
                    <Space direction="vertical">
                      <Row>
                        <Col span={12}>
                          <Statistic 
                            title="Prime Mensuelle" 
                            value={insurance.monthlyPremium} 
                            suffix="CHF" 
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic 
                            title="Franchise" 
                            value={insurance.franchise} 
                            suffix="CHF" 
                          />
                        </Col>
                      </Row>
                      <Divider style={{ margin: '12px 0' }} />
                      <Space direction="vertical">
                        {insurance.benefits.map((benefit, idx) => (
                          <Text key={idx}>
                            <CheckCircleOutlined style={{ color: '#4A90E2', marginRight: 8 }} />
                            {benefit}
                          </Text>
                        ))}
                      </Space>
                    </Space>
                  }
                />
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <Button 
                    type="primary" 
                    block 
                    style={{ background: '#4A90E2', borderColor: '#4A90E2' }}
                  >
                    Choisir cette Assurance
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Page;