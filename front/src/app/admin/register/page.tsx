"use client";
import React, { useState } from 'react';
import { Button, Form, Input, Select, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../Login.module.css';
import AuthService from '../../API/AuthService';

interface ApiError {
    response?: {
        data?: {
            message?: string;
            [key: string]: unknown;
        };
    };
}



const { Title } = Typography;
const { Option } = Select;

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: { user_name: string; password: string; role: string }) => {
        setLoading(true);
        try {
            const response = await AuthService.register({
                user_name: values.user_name,
                password: values.password,
                role: values.role
            });
            
            if (response?.data?.message) {
                message.success('User created successfully!');
                router.push('/admin');
            }
        } catch (error: unknown) {
            console.error('Registration error:', error);
            
            // Type guard to check if error is an object with a response property
            const isApiError = (err: unknown): err is ApiError => 
                err !== null && 
                typeof err === 'object' && 
                'response' in err;

            const getErrorMessage = (error: unknown): string => {
                if (isApiError(error)) {
                    // First, try to get message from response data
                    if (error.response?.data?.message) {
                        return error.response.data.message;
                    }

                    // If no message, check if first value of response data is an array
                    const firstValue = error.response?.data ? Object.values(error.response.data)[0] : null;
                    if (Array.isArray(firstValue) && firstValue.length > 0) {
                        return firstValue[0];
                    }

                    return 'Registration failed';
                } else if (error instanceof Error) {
                    return error.message;
                }

                return 'An unexpected error occurred';
            };

            message.error(getErrorMessage(error));
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
                    <Title level={4}>Create New User</Title>
                    <Form 
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark={false}
                    >
                        <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Please input username!' }]}
                        >
                            <Input 
                                size="large"
                                placeholder="Username"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input password!' }]}
                        >
                            <Input.Password 
                                size="large"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Please select a role!' }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select role"
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="editor">Editor</Option>
                                <Option value="viewer">Viewer</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading}
                                block
                                size="large"
                            >
                                Create User
                            </Button>
                        </Form.Item>
                        
                        <Button 
                            type="link" 
                            onClick={() => router.push('/admin')}
                            block
                        >
                            Back to Login
                        </Button>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
