"use client";
import React, { useEffect, useState } from 'react';
import { Space, Spin, Table, Modal, message } from 'antd';
import type { TableProps } from 'antd';
import HeaderCST from '@/app/components/headerCST/HeaderCST';
import { useRouter } from 'next/navigation';
import { ActualityEntity } from '@/app/entities/ActualityEntity';
import ActualitiesServices from '@/app/API/ActualitiesServices';
import ApiUrls from '@/app/API/ApiURLs/ApiURLs';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface DataType extends ActualityEntity {
  key: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [actualities, setActualities] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Titre',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Extrait',
      dataIndex: 'excerpt',
      key: 'excerpt',
    },
    {
      title: 'Date de création',
      dataIndex: 'date_creation',
      key: 'date_creation',
    },
    {
      title: 'Créateur',
      dataIndex: 'utilisateur',
      key: 'utilisateur',
      render: (utilisateur) => utilisateur?.firstname,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => record.id && handleEdit(record.id)}>Modifier</a>
          <a onClick={() => record.id && showDeleteConfirm(record.id)}>Supprimer</a>
        </Space>
      ),
    },
  ];

  const getAllActualities = async () => {
    try {
      const response = await ActualitiesServices.GetAllActualities(ApiUrls.ACTUALITES);
      const dataWithKeys = response.map(item => ({
        ...item,
        key: item.id?.toString() || Math.random().toString()
      }));
      setActualities(dataWithKeys);
    } catch (error) {
      console.error("Error fetching actualities:", error);
      message.error("Erreur lors du chargement des actualités");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/dashboard/actualities/${id}`);
  };

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: 'Êtes-vous sûr de vouloir supprimer cette actualité?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cette action est irréversible',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      async onOk() {
        try {
          await ActualitiesServices.DeleteActuality(ApiUrls.ACTUALITES, id);
          message.success('Actualité supprimée avec succès');
          getAllActualities();
        } catch (error) {
          console.error("Error deleting actuality:", error);
          message.error('Erreur lors de la suppression');
        }
      },
    });
  };

  const navigate = () => {
    router.push('/admin/dashboard/actualities/create');
  };

  useEffect(() => {
    getAllActualities();
  }, []);

  return (
    <div>
      <HeaderCST onButtonClick={navigate} buttonText='Créer' title="Actualités de l'assurance" />
      {loading ? (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <Table columns={columns} dataSource={actualities} />
      )}
    </div>
  );
};

export default Page;
