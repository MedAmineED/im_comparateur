"use client";
import React from 'react';
import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import HeaderCST from '@/app/components/headerCST/HeaderCST';

interface DataType {
  key: string;
  name: string;
  user_name: string;
  role: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Nom d\'utilisateur',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: 'Rôle',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a href="users/client-details">Modifier</a>
        <a>Supprimer</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Alice Dupont',
    user_name: 'alice.d',
    role: 'Administrateur',
  },
  {
    key: '2',
    name: 'Pierre Martin',
    user_name: 'pierre.m',
    role: 'Utilisateur',
  },
  {
    key: '3',
    name: 'Marie Durand',
    user_name: 'marie.d',
    role: 'Modérateur',
  },
];

const Page: React.FC = () => {
  return (
    <div>
      <HeaderCST buttonText='Ajouter' title='Liste des utilisateurs' />
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export default Page;
