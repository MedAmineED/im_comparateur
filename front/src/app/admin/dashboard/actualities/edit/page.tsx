"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, message, Spin } from 'antd';
import ActualitiesServices from '@/app/API/ActualitiesServices';
import ApiUrls from '@/app/API/ApiURLs/ApiURLs';
import { ActualityEntity } from '@/app/entities/ActualityEntity';

const EditActuality: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActuality = async () => {
      try {
        const actuality = await ActualitiesServices.GetAllActualities(`${ApiUrls.ACTUALITY}/${id}`);
        form.setFieldsValue(actuality);
      } catch (error) {
        console.error("Error fetching actuality:", error);
        message.error("Erreur lors du chargement de l'actualité");
      } finally {
        setLoading(false);
      }
    };

    fetchActuality();
  }, [id, form]);

  const onFinish = async (values: ActualityEntity) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      await ActualitiesServices.UpdateActuality(ApiUrls.ACTUALITY, Number(id), formData);
      message.success("Actualité mise à jour avec succès");
      router.push('/admin/dashboard/actualities');
    } catch (error) {
      console.error("Error updating actuality:", error);
      message.error("Erreur lors de la mise à jour de l'actualité");
    }
  };

  return (
    <div>
      <h1>Modifier l&apos;actualité</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Titre" rules={[{ required: true, message: 'Veuillez entrer le titre' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="excerpt" label="Extrait" rules={[{ required: true, message: 'Veuillez entrer un extrait' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Contenu" rules={[{ required: true, message: 'Veuillez entrer le contenu' }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Mettre à jour
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditActuality; 