"use client";
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import GuideService from '@/app/API/GuideService';
import type { GuideEntity, GuideFormData } from '@/app/entities/GuideEntity';
import type { UploadFile } from 'antd/es/upload/interface';

const GuidesManagement: React.FC = () => {
    const [guides, setGuides] = useState<GuideEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingGuide, setEditingGuide] = useState<GuideEntity | null>(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const fetchGuides = async () => {
        setLoading(true);
        try {
            const data = await GuideService.getAllGuides();
            setGuides(data);
        } catch {
            message.error('Failed to fetch guides');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchGuides();
    }, []);

    const handleAdd = () => {
        setEditingGuide(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEdit = (record: GuideEntity) => {
        console.log(record)
        setEditingGuide(record);
        form.setFieldsValue(record);
        
        if (record.icon_image) {
            setFileList([
                {
                    uid: '-1',
                    name: record.icon_image.split('/').pop() || 'image',
                    status: 'done',
                    url: `http://localhost:8000/storage/${record.icon_image}`,
                }
            ]);
        } else {
            setFileList([]);
        }
        
        setModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        Modal.confirm({
            title: 'Êtes-vous sûr de vouloir supprimer ce guide ?',
            content: 'Cette action est irréversible.',
            okText: 'Oui, supprimer',
            cancelText: 'Annuler',
            okType: 'danger',
            async onOk() {
                try {
                    await GuideService.deleteGuide(id);
                    message.success('Guide supprimé avec succès');
                    fetchGuides();
                } catch {
                    message.error('Échec de la suppression du guide');
                }
            },
        });
    };

    const handleSubmit = async (values: GuideFormData) => {
        try {
            const formData = new FormData();
            (Object.keys(values) as Array<keyof GuideFormData>).forEach(key => {
                if (key !== 'icon_image' && key !== 'steps') {
                    formData.append(key, values[key]);
                }
            });

            // Append steps as JSON string
            formData.append('steps', JSON.stringify(values.steps));

            // Append icon image if exists
            if (fileList[0]?.originFileObj) {
                formData.append('icon_image', fileList[0].originFileObj);
            }

            if (editingGuide) {
                console.log(values)
                await GuideService.updateGuide(editingGuide.id!, formData);
                message.success('Guide mis à jour avec succès');
            } else {
                await GuideService.createGuide(formData);
                message.success('Guide créé avec succès');
            }
            setModalVisible(false);
            fetchGuides();
        } catch (error) {
            console.error('Error:', error);
            message.error('Échec de la sauvegarde du guide');
        }
    };

    const columns = [
        {
            title: 'Titre',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Auteur',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: GuideEntity) => (
                <Space>
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)}
                        title="Modifier"
                    />
                    <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record.id!)}
                        title="Supprimer"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ marginBottom: 16 }}
            >
                Ajouter un guide
            </Button>

            <Table
                columns={columns}
                dataSource={guides}
                loading={loading}
                rowKey="id"
            />

            <Modal
                title={editingGuide ? 'Modifier le guide' : 'Ajouter un guide'}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setFileList([]);
                }}
                onOk={() => form.submit()}
                width={800}
                okText="Confirmer"
                cancelText="Annuler"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ steps: [] }}
                >
                    <Form.Item
                        name="title"
                        label="Titre"
                        rules={[{ required: true, message: 'Le titre est requis' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'La description est requise' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="icon_image"
                        label="Image d'icône"
                        rules={[{ required: !editingGuide, message: "L'image est requise" }]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={({ fileList }) => setFileList(fileList)}
                            maxCount={1}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Télécharger</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="introduction"
                        label="Introduction"
                        rules={[{ required: true, message: "L'introduction est requise" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="author"
                        label="Auteur"
                        rules={[{ required: true, message: "L'auteur est requis" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.List name="steps">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item
                                            {...field}
                                            label={`Étape ${index + 1} - Titre`}
                                            name={[field.name, 'title']}
                                            rules={[{ required: true, message: 'Le titre est requis' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="Contenu"
                                            name={[field.name, 'content']}
                                            rules={[{ required: true, message: 'Le contenu est requis' }]}
                                        >
                                            <Input.TextArea />
                                        </Form.Item>
                                        <Button onClick={() => remove(field.name)}>Supprimer</Button>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        Ajouter une étape
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </div>
    );
};

export default GuidesManagement; 