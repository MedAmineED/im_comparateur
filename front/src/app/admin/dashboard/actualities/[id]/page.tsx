"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Form, Input, Button, message, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ActualitiesServices from '@/app/API/ActualitiesServices';
import ApiUrls from '@/app/API/ApiURLs/ApiURLs';
import { ActualityEntity } from '@/app/entities/ActualityEntity';
import type { UploadFile } from 'antd/es/upload/interface';

const EditActuality: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const fetchActuality = async () => {
      try {
        const actualities = await ActualitiesServices.GetAllActualities(`${ApiUrls.ACTUALITY}/${id}`);
        const actuality = Array.isArray(actualities) ? actualities[0] : actualities;
        
        if (actuality) {
          form.setFieldsValue(actuality);
          if (actuality.image) {
            setFileList([{ 
              uid: '-1',
              name: 'image',
              status: 'done',
              url: actuality.image 
            }]);
          }
        }
      } catch (error) {
        console.error("Error fetching actuality:", error);
        message.error("Erreur lors du chargement de l&apos;actualité");
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

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      await ActualitiesServices.UpdateActuality(ApiUrls.ACTUALITY, Number(id), formData);
      message.success("Actualité mise à jour avec succès");
      router.push('/admin/dashboard/actualities');
    } catch (error) {
      console.error("Error updating actuality:", error);
      message.error("Erreur lors de la mise à jour de l'actualité");
    }
  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
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
          <Form.Item label="Image">
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
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