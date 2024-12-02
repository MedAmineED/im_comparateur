"use client";
import React, { useState, useRef } from 'react';
import { Button, Form, Input, Typography, Row, Col, Modal } from 'antd';
import styles from './Signup.module.css';
import Image from 'next/image';
import RegisterServices from '../API/RegisterServices';
import ApiUrls from '../API/ApiURLs/ApiURLs';
import { RegisterEntity } from '../entities/RegisterEntity';
import VerificationCodeInputs from '../components/register/VerificationCodeInputs';
import type { InputRef } from 'antd';

const { Title } = Typography;

const Page: React.FC = () => {
    const [isVerificationVisible, setIsVerificationVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(InputRef | null)[]>([]);
    
    const onFinish = async (values: Record<string, unknown>) => {
        setIsVerificationVisible(true);
        console.log('Form submitted with values:', values);
        try {
            const registerData: RegisterEntity = {
                firstname: values.firstname as string,
                lastname: values.lastname as string,
                age: Number(values.age),
                tel: values.tel as string,
                address: values.address as string,
                email: values.email as string,
                password: values.password as string
            };

            const response = await RegisterServices.Register(ApiUrls.CLIENT, registerData);
            console.log(response)
            console.log("adding with success") 
        } catch(error){
            console.log(error)
        }
    };

    const onValuesChange = (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => {
        console.log('Field changed:', changedValues);
        console.log('Current form values:', allValues);
    };

    const handleVerificationCancel = () => {
        setIsVerificationVisible(false);
    };

    return (
        <>
        <div className={styles.container}>
            <main className={styles.main}>
                <a aria-label="Aller à la page d'accueil" href="/">
                    <Image width={100} height={40} src="" alt="Logo" className={styles.logo} />
                </a>
                <div className={styles.card}>
                    <Title level={4}>Créer un nouveau compte</Title>
                    <Form 
                        name="signup" 
                        layout="vertical" 
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                        style={{ width: '100%' }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="firstname"
                                    label="Nom"
                                    rules={[{ required: true, message: 'Veuillez saisir votre nom!' }]}
                                >
                                    <Input type="text" placeholder="Entrez votre nom" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="lastname"
                                    label="Prenom"
                                    rules={[{ required: true, message: 'Veuillez saisir votre prenom!' }]}
                                >
                                    <Input type="text" placeholder="Entrez votre prenom" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="age"
                                    label="Age"
                                    rules={[
                                        { required: true, message: 'Veuillez saisir votre age!' },
                                        { pattern: /^[0-9]+$/, message: 'Veuillez entrer un âge valide' },
                                    ]}
                                >
                                    <Input type="text" placeholder="Entrez votre age" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="address"
                                    label="Adresse"
                                    rules={[{ required: true, message: 'Veuillez saisir votre adresse!' }]}
                                >
                                    <Input placeholder="Entrez votre adresse" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name="tel"
                            label="Numero de telephone"
                            rules={[
                                { required: true, message: 'Veuillez saisir votre numero de telephone!' },
                                { pattern: /^\d{10}$/, message: 'Entrez un numéro valide à 10 chiffres' },
                            ]}
                            >
                            <Input type="text" placeholder="Entrez votre numero de telephone!" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Veuillez saisir votre email!' },
                                { type: 'email', message: 'Entrez un email valide' },
                            ]}
                            >
                            <Input type="email" placeholder="Entrez votre email" />
                        </Form.Item>
                            <Typography.Paragraph 
                                style={{ 
                                    textAlign: 'center', 
                                    color: '#d48806', 
                                    fontWeight: 'bold', 
                                    fontSize: '1.1rem',
                                    margin: '16px 0' 
                                }}
                                >
                                🎉 Vous recevrez un email avec un code pour participer à notre roulette et tenter de gagner des cadeaux incroyables ! Assurez-vous de vérifier votre boîte de réception !
                            </Typography.Paragraph>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.submitButton}>
                                Inscerription
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
            <Modal
                title="Code de verification"
                visible={isVerificationVisible}
                onOk={() => {}}
                onCancel={handleVerificationCancel}
                footer={[
                    <Button key="back" onClick={handleVerificationCancel}>
                    Annuler
                    </Button>,
                    <Button
                    key="submit"
                    type="primary"
                    onClick={() => {}}
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

export default Page;
