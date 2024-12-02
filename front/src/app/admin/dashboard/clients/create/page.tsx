'use client';

import React from 'react';
import { Form, Input, Button, message, InputNumber } from 'antd';
import { useRouter } from 'next/navigation';
import ClientService from '@/app/API/ClientService';
import type { ClientEntity } from '@/app/API/ClientService';

const CreateClient = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: Omit<ClientEntity, 'id'>) => {
    try {
      await ClientService.createClient(values);
      message.success('Client créé avec succès');
      router.push('/admin/dashboard/clients');
    } catch (error) {
      console.error('Error creating client:', error);
      message.error('Erreur lors de la création du client');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Créer un nouveau client</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="firstname"
          label="Prénom"
          rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Nom"
          rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Veuillez entrer l\'email' },
            { type: 'email', message: 'Veuillez entrer un email valide' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tel"
          label="Téléphone"
          rules={[
            { required: true, message: 'Veuillez entrer le numéro de téléphone' },
            { pattern: /^[0-9+\s-]{8,}$/, message: 'Veuillez entrer un numéro de téléphone valide' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Âge"
          rules={[{ required: true, message: 'Veuillez entrer l\'âge' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Adresse"
          rules={[{ required: true, message: 'Veuillez entrer l\'adresse' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Créer le client
          </Button>
          <Button 
            style={{ marginLeft: 8 }} 
            onClick={() => router.push('/admin/dashboard/clients')}
          >
            Annuler
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateClient;
