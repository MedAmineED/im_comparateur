"use client";
import React, { useState, useRef } from 'react';
import { Form, Button, Typography, Modal, Input, Row, Col } from 'antd';
import { CloseOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './RegisterForm.module.css';
import VerificationCodeInputs from './VerificationCodeInputs';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type { InputRef } from 'antd';

interface RegisterFormProps {
  onCompare: () => void;
  children: React.ReactNode;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ children, onCompare }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [form] = Form.useForm();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const [steps, setSteps] = useState<number>(1);
  const [modal, ] = Modal.useModal();

  const toggleForm = () => {
    setIsVisible(!isVisible);
    setSteps(1);
  };

  const onFinish = async (values: Record<string, unknown>) => {
    console.log('Success:', values);
    setIsVisible(false);
    setIsVerificationVisible(true);
  };
 
  const onFinishFailed = (errorInfo: ValidateErrorEntity<Record<string, unknown>>) => {
    console.log('Failed:', errorInfo);
  };

  const handleVerificationCancel = () => {
    setIsVerificationVisible(false);
  };

  const handleVerificationOk = async () => {
    console.log('Verification code submitted:', verificationCode.join(''));
    console.log(verificationCode.join('').length)
    const validate = verificationCode.join('').length == 6;
    if(validate){
      setIsVerificationVisible(false);
      await onCompare();
    }
  };
  const submitData = () => {
    modal.confirm({});
    form.submit();

  }
  const validateStep = async () => {
    try {
      await form.validateFields();
      setSteps((prv) => { return prv + 1 });
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <>
      <div onClick={toggleForm}>{children}</div>

      {isVisible && (
        <div className={styles.overlay} onClick={toggleForm}>
          <div className={styles.card} onClick={(e) => e.stopPropagation()}>
            <CloseOutlined className={styles.closeIcon} onClick={toggleForm} />
            <Typography.Title level={2} className={styles.title}>
              Rejoignez-nous! <SmileOutlined />
            </Typography.Title>
            <Form
              form={form}
              name="registerForm"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
            {steps === 1 && (
<>
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12}>
      <Form.Item
        name="firstname"
        label="Nom"
        rules={[{ required: true, message: 'Veuillez saisir votre nom!' }]}
      >
        <Input placeholder="Ex : Name" />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12}>
      <Form.Item
        name="lastname"
        label="Prénom"
        rules={[{ required: true, message: 'Veuillez saisir votre prénom!' }]}
      >
        <Input placeholder="Ex : LastName" />
      </Form.Item>
    </Col>
  </Row>

  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12}>
      <Form.Item
        name="age"
        label="Âge"
        rules={[
          { required: true, message: 'Veuillez saisir votre âge!' },
          { pattern: /^[0-9]+$/, message: 'Veuillez entrer un âge valide' },
        ]}
      >
        <Input placeholder="Entrez votre âge (18+)" />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12}>
      <Form.Item
        name="address"
        label="Adresse"
        rules={[{ required: true, message: 'Veuillez saisir votre adresse!' }]}
      >
        <Input placeholder="Ex : 221B Baker Street" />
      </Form.Item>
    </Col>
  </Row>
  <Form.Item style={{ textAlign: 'center' }}>
    <Button type="primary" onClick={validateStep}>
      Suivant
    </Button>
  </Form.Item>
</>
)}
{steps === 2 && (
<>
  <Form.Item
    name="email"
    label="Email"
    rules={[
      { required: true, message: 'Veuillez saisir votre email!' },
      { type: 'email', message: 'Entrez un email valide' },
    ]}
  >
    <Input placeholder="Ex : exemple@domain.com" />
  </Form.Item>
  <Typography.Paragraph 
    style={{ 
      textAlign: 'center', 
      color: '#d48806',  // A bold color to catch attention
      fontWeight: 'bold', 
      fontSize: '1.1rem',
      margin: '16px 0' 
    }}
  >
    🎉 Vous recevrez un email avec un code pour participer à notre roulette et tenter de gagner des cadeaux incroyables ! Assurez-vous de vérifier votre boîte de réception !
  </Typography.Paragraph>
  <Form.Item style={{ textAlign: 'center' }}>
    <Button type="primary" onClick={validateStep}>
      Suivant
    </Button>
  </Form.Item>
</>
)}
{steps === 3 && (
<>
  <Form.Item
    name="tel"
    label="Numéro de téléphone"
    rules={[
      { required: true, message: 'Veuillez saisir votre numéro de téléphone!' },
      { pattern: /^\d{10}$/, message: 'Entrez un numéro valide à 10 chiffres' },
    ]}
  >
    <Input placeholder="Ex : 0612345678" />
  </Form.Item>
  <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => { submitData() }}>
          S&apos;inscrire
        </Button>
  </Form.Item>
</>
)}
              
            </Form>
          </div>
        </div>
      )}

      <Modal
        title="Code de verification"
        visible={isVerificationVisible}
        onOk={handleVerificationOk}
        onCancel={handleVerificationCancel}
        footer={[
          <Button key="back" onClick={handleVerificationCancel}>
            Annuler
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleVerificationOk}
          >
            Confirmer
          </Button>,
        ]}
        maskClosable={false} 
      >
        <VerificationCodeInputs
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          inputRefs={inputRefs}
        />
      </Modal>
    </>
  );
};

export default RegisterForm;