"use client";
import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: '20px' }}>
        Détails du Client
      </Header>
      <Content style={{ padding: '20px' }}>
        <Title level={2}>amine</Title>
        <Paragraph><strong>Âge:</strong> 25</Paragraph>
        <Paragraph><strong>Adresse:</strong> morneg</Paragraph>
        <Paragraph><strong>Numéro de Téléphone:</strong> 22682012</Paragraph>
        <Paragraph><strong>Email:</strong> medamine@gmail.com</Paragraph>
        <Button type="primary" onClick={() => router.push('/admin/dashboard')}>Retour</Button>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2024 Company Name</Footer>
    </Layout>
  );
};

export default Page;
