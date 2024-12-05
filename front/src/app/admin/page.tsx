"use client";
import React, { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import styles from './Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AuthService from '../API/AuthService';

interface ApiError {
    response?: {
        data?: {
            message?: string;
        } | string[];
        status?: number;
    };
    message: string;
}

const { Title } = Typography;

const Page: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: { user_name: string; password: string }) => {
        setLoading(true);
        try {
            const response = await AuthService.login({
                user_name: values.user_name,
                password: values.password
            });
            
            if (response?.token) {
                message.success('Login successful!');
                router.push('/admin/dashboard');
            }
        } catch (error: unknown) {
            console.error('Login error:', error);
            const apiError = error as ApiError;
            const errorMessage = 
                typeof apiError.response?.data === 'object' && apiError.response?.data && 'message' in apiError.response.data 
                    ? apiError.response.data.message 
                    : Array.isArray(apiError.response?.data) 
                        ? apiError.response.data[0] 
                        : 'Login failed';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <a aria-label="Go to homepage" href="/">
                    <Image 
                        src="/images/logo-dark.png" 
                        alt="Logo" 
                        className={styles.logo}
                        width={100}
                        height={40}
                    />
                </a>
                <div className={styles.card}>
                    <Title level={4}>Login to your account</Title>
                    <Form 
                        form={form}
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark={false}
                    >
                        <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input 
                                size="large"
                                placeholder="Username"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password 
                                size="large"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading}
                                block
                                size="large"
                            >
                                Login
                            </Button>
                        </Form.Item>
                        
                        <Button 
                            type="link" 
                            onClick={() => router.push('/admin/register')}
                            block
                        >
                            Register new user
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default Page;