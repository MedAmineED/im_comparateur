import { useState, useEffect } from 'react';
import axios from 'axios';
import ApiUrls from '../API/ApiURLs/ApiURLs';
import Cookies from 'js-cookie';

interface User {
    id: number;
    user_name: string;
    role: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get('auth_token');
                if (!token) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${ApiUrls.BASE_URL}api/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
