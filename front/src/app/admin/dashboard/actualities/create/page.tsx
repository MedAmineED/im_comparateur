"use client";
import React from 'react';
import { Button, Form, Input, DatePicker, Upload, Card, Space } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import styles from './CreateActuality.module.css';
import ActualitiesServices from '@/app/API/ActualitiesServices';
import { ActualityEntity } from '@/app/entities/ActualityEntity';
import ApiUrls from '@/app/API/ApiURLs/ApiURLs';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;

interface FormValues extends Omit<ActualityEntity, 'date_creation' | 'image'> {
  date_creation: Dayjs;
  image: UploadFile[];
}

// Define form layout based on screen size
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 18 } },
};

const Page: React.FC = () => {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = async (values: FormValues) => {
    console.log("Form Values:", values);

    // Create FormData to handle image upload
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('excerpt', values.excerpt);
    formData.append('content', values.content);
    formData.append('date_creation', values.date_creation.format("YYYY-MM-DD HH:mm:ss"));
    formData.append('user_id', values.user_id.toString());
    if (values.image?.[0]?.originFileObj) {
      formData.append('image', values.image[0].originFileObj);
    }

    try {
      await ActualitiesServices.CreateActuality(ApiUrls.ACTUALITY, formData);
      console.log("Added successfully");
    } catch (err) {
      console.error("Error creating actuality:", err);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <Card title="Créer une Actualité" className={styles.card}>
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className={styles.form}
        >
          {/* Title */}
          <Form.Item
            name="title"
            label="Titre de l'actualité"
            rules={[{ required: true, message: "Veuillez entrer un titre" }]}
          >
            <Input placeholder="Entrez le titre de l'actualité" />
          </Form.Item>

          {/* Excerpt */}
          <Form.Item
            name="excerpt"
            label="Extrait"
            rules={[{ required: true, message: "Veuillez entrer un extrait" }]}
          >
            <Input placeholder="Entrez l'extrait de l'actualité" />
          </Form.Item>

          {/* Content */}
          <Form.Item
            name="content"
            label="Contenu de l'actualité"
            rules={[{ required: true, message: "Veuillez entrer le contenu" }]}
          >
            <TextArea
              placeholder="Rédigez le contenu ici..."
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Form.Item>

          {/* Image Upload */}
          <Form.Item
            name="image"
            label="Image de l'actualité"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
            rules={[{ required: true, message: "Veuillez ajouter une image" }]}
          >
            <Upload.Dragger name="files" listType="picture" maxCount={1}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Glissez une image ou cliquez pour sélectionner</p>
              <p className="ant-upload-hint">Image d’actualité (format JPG/PNG)</p>
            </Upload.Dragger>
          </Form.Item>

          {/* User ID (Hidden as default 1) */}
          <Form.Item name="user_id" initialValue={1} noStyle>
            <Input type="hidden" />
          </Form.Item>

            {/* Date of Creation */}
            <Form.Item
            name="date_creation"
            label="Date de création"
            rules={[{ required: true, message: "Veuillez sélectionner une date" }]}
          >
            <DatePicker
              defaultValue={dayjs()}
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              style={{ width: '100%' }}
            />
          </Form.Item>

          {/* User ID (Hidden as default 1) */}
          <Form.Item name="user_id" initialValue={1} noStyle>
            <Input type="hidden" />
          </Form.Item>


          {/* Action Buttons */}
          <Form.Item wrapperCol={{ xs: { span: 24 }, sm: { span: 18, offset: 6 } }}>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="default" htmlType="reset">
                Réinitialiser
              </Button>
              <Button type="primary" htmlType="submit">
                Enregistrer
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Page;
