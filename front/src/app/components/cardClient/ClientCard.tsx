// components/ClientCard.tsx
"use client";
import React from 'react';
import { Card, Descriptions, Button, Modal } from 'antd';
import styles from './ClientCard.module.css'

interface ClientData {
  key: string;
  nom: string;
  âge: number;
  adresse: string;
  email: string;
  numéroDeTel: string;
}

interface ClientCardProps {
  isVisible: boolean;
  client: ClientData | null;
  onClose: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  isVisible,
  client,
  onClose,
}) => {
  if (!client) return null;

  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Fermer
        </Button>,
      ]}
      width={600}
    >
      <Card 
        title="Détails du Client"
        bordered={false}
        className={styles.clientCard}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Nom">{client.nom}</Descriptions.Item>
          <Descriptions.Item label="Âge">{client.âge} ans</Descriptions.Item>
          <Descriptions.Item label="Adresse">{client.adresse}</Descriptions.Item>
          <Descriptions.Item label="Email">{client.email}</Descriptions.Item>
          <Descriptions.Item label="Téléphone">{client.numéroDeTel}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Modal>
  );
};

export default ClientCard;