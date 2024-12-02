/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import styles from './Contact.module.css';
import Image from 'next/image';


const Page: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Succès :', values);
    };
    const { Title } = Typography;

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <a aria-label="Aller à la page d'accueil" >
                    <Image width={100} height={40} src="/images/lgcompany.jpg" alt="Logo" className={styles.logo} />
                </a>
                <div className={styles.card}>
                    <Title level={4}>Contact</Title>
                    <Form 
                        onFinish={onFinish}
                        name="name" 
                        layout="vertical"
                        style={{ width: '100%' }}
                    >
                        <Form.Item
                            name="name"
                            label="Nom"
                            rules={[{ required: true, message: 'Veuillez saisir votre nom!' }]}
                        >
                            <Input type="email" placeholder="Entrez votre nom" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[{ required: true, message: 'Veuillez saisir votre E-mail' }]}
                        >
                            <Input type="email" placeholder="Entrez votre E-mail" />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            label="Message"
                            rules={[{ required: true, message: 'Veuillez saisir votre Message' }]}
                        >
                            <Input.TextArea className={styles.inputAreaCST} placeholder="Entrez votre Message" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.submitButton}>
                                Envoyer
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default Page;