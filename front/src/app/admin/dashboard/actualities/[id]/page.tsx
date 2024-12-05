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
import { IMAGES_STORE } from '@/app/API/ApiURLs/ImagesUrls';

const EditActuality: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
 
  useEffect(() => {
    const fetchActuality = async () => {
      try {
        const actualities = await ActualitiesServices.GetActualityById(`${ApiUrls.ACTUALITES}`,parseInt(id as string));
        const actuality = Array.isArray(actualities) ? actualities[0] : actualities;
        
        if (actuality) {
          form.setFieldsValue({
            title: actuality.title,
            excerpt: actuality.excerpt,
            content: actuality.content,
          });
          
          // If there's an image, create a file list entry for it
          if (actuality.image) {
            const imageUrl =  IMAGES_STORE + actuality.image;
              
            setFileList([{
              uid: '-1',
              name: actuality.image.split('/').pop() || 'image',
              status: 'done',
              url: imageUrl,
            }]);
          }
        }
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
      console.log('Form values:', values);
      const formData = new FormData();
      
      // Add form fields to FormData
      formData.append('title', values.title);
      formData.append('excerpt', values.excerpt);
      formData.append('content', values.content);
      formData.append('_method', 'PUT'); // Laravel/Symfony style method override

      // Only append image if a new file is selected
      if (fileList.length > 0) {
        if (fileList[0].originFileObj) {
          console.log('Uploading new image');
          formData.append('image', fileList[0].originFileObj);
        } else if (fileList[0].url) {
          console.log('Keeping existing image');
          const existingImage = fileList[0].url.split('/').pop();
          formData.append('existing_image', existingImage || '');
        }
      }

      // Log FormData contents
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await ActualitiesServices.UpdateActuality(ApiUrls.ACTUALITES, Number(id), formData);
      console.log('Update response:', response);
      
      message.success("Actualité mise à jour avec succès");
      router.push('/admin/dashboard/actualities');
    } catch (error) {
      console.error("Error updating actuality:", error);
      message.error("Erreur lors de la mise à jour de l'actualité");
    }
  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    // Only keep the latest file
    setFileList(newFileList.slice(-1));
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Vous pouvez uniquement télécharger des images!');
        return false;
      }
      return false; // Prevent auto upload
    },
    maxCount: 1,
    fileList,
    onChange: handleUploadChange,
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
          <Form.Item
            label="Image"
            name="image"
          >
            <Upload 
              {...uploadProps}
              listType="picture"
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Sélectionner une image</Button>
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