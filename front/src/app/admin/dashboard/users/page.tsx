"use client";
import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import HeaderCST from '@/app/components/headerCST/HeaderCST';
import { useAuth } from '@/app/hooks/useAuth';
import useServices, { User } from '@/app/API/UserService';

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const { user: currentUser } = useAuth();

  const handleEdit = (record: User) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await useServices.deleteUser(id);
      message.success('Utilisateur supprimé avec succès');
      fetchUsers();
    } catch (error: Error | unknown) {
      message.error(error instanceof Error ? error.message : 'Erreur lors de la suppression');
    }
  };

  const getRoleOptions = () => {
    if (currentUser?.role === 'super_admin') {
      return [
        { label: 'Administrateur', value: 'admin' },
        { label: 'Utilisateur', value: 'user' }
      ];
    } else if (currentUser?.role === 'admin') {
      return [
        { label: 'Utilisateur', value: 'user' }
      ];
    }
    return [];
  };

  const columns: TableProps<User>['columns'] = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        switch (role) {
          case 'super_admin':
            return 'Super Administrateur';
          case 'admin':
            return 'Administrateur';
          case 'user':
            return 'Utilisateur';
          default:
            return role;
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const canEdit = currentUser?.role === 'super_admin' || 
                       (currentUser?.role === 'admin' && record.role === 'user');
        
        return (
          <Space size="middle">
            {canEdit && (
              <Button onClick={() => handleEdit(record)}>Modifier</Button>
            )}
            {currentUser?.role === 'super_admin' && record.id !== currentUser.id && (
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
                onConfirm={() => handleDelete(record.id)}
                okText="Oui"
                cancelText="Non"
              >
                <Button danger>Supprimer</Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await useServices.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      message.error('Échec du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await useServices.updateUser(editingId, values);
        message.success('Utilisateur modifié avec succès');
      } else {
        await useServices.createUser(values);
        message.success('Utilisateur créé avec succès');
      }
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
      message.error('Échec de l\'enregistrement de l\'utilisateur');
    }
  };

  const showAddButton = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  return (
    <div>
      {showAddButton && (
        <HeaderCST 
          buttonText="Ajouter un Utilisateur" 
          title="Liste des utilisateurs"
          onButtonClick={handleAdd}
        />
      )}
      
      <Table<User>
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingId ? "Modifier l'Utilisateur" : "Ajouter un Utilisateur"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Confirmer"
        cancelText="Annuler"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Nom"
            rules={[{ required: true, message: 'Le nom est requis' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Rôle"
            rules={[{ required: true, message: 'Le rôle est requis' }]}
          >
            <Select options={getRoleOptions()} />
          </Form.Item>
          {!editingId && (
            <Form.Item
              name="password"
              label="Mot de passe"
              rules={[{ required: true, message: 'Le mot de passe est requis' }, { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
          {editingId && (
            <Form.Item
              name="password"
              label="Nouveau mot de passe (optionnel)"
              rules={[{ min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Page;
