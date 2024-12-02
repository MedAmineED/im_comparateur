// app/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import type { TableProps } from 'antd';
import { ClientEntity } from '@/app/entities/ClientEntity';
import HeaderCST from '@/app/components/headerCST/HeaderCST';
import ClientService from '@/app/API/ClientService';

const DashboardPage: React.FC = () => {
    const [clients, setClients] = useState<ClientEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const data = await ClientService.getAllClients();
            setClients(data);
        } catch {
            message.error('Échec de la récupération des clients');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingId(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: ClientEntity) => {
        setEditingId(record.id!);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        Modal.confirm({
            title: 'Êtes-vous sûr de vouloir supprimer ce client ?',
            content: 'Cette action est irréversible.',
            okText: 'Oui',
            okType: 'danger',
            cancelText: 'Non',
            onOk: async () => {
                try {
                    await ClientService.deleteClient(id);
                    message.success('Client supprimé avec succès');
                    fetchClients();
                } catch {
                    message.error('Échec de la suppression du client');
                }
            },
        });
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingId) {
                await ClientService.updateClient(editingId, values);
                message.success('Client modifié avec succès');
            } else {
                await ClientService.createClient(values);
                message.success('Client créé avec succès');
            }
            setIsModalVisible(false);
            fetchClients();
        } catch {
            message.error('Échec de l\'enregistrement du client');
        }
    };

    const columns: TableProps<ClientEntity>['columns'] = [
        {
            title: 'Prénom',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Nom',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Téléphone',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Modifier</Button>
                    <Button danger onClick={() => handleDelete(record.id!)}>Supprimer</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <HeaderCST 
                title="Tableau de Bord" 
                buttonText="Ajouter un Client"
                onButtonClick={handleAdd}
            />
            
            <Table
                columns={columns}
                dataSource={clients}
                loading={loading}
                rowKey="id"
            />

            <Modal
                title={editingId ? "Modifier le Client" : "Ajouter un Client"}
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
                        name="firstname"
                        label="Prénom"
                        rules={[{ required: true, message: 'Le prénom est requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label="Nom"
                        rules={[{ required: true, message: 'Le nom est requis' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="Âge"
                        rules={[
                            { required: true, message: 'L\'âge est requis' },
                            { type: 'string',  message: 'Veuillez entrer un âge valide' }
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'L\'email est requis' },
                            { type: 'email', message: 'Veuillez entrer un email valide' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tel"
                        label="Téléphone"
                        rules={[
                            { required: true, message: 'Le numéro de téléphone est requis' },
                            { pattern: /^\d{10}$/, message: 'Veuillez entrer un numéro à 10 chiffres' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Adresse"
                        rules={[{ required: true, message: 'L\'adresse est requise' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DashboardPage;