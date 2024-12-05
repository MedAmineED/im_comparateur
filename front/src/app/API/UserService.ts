import axios from 'axios';
import ApiUrls from './ApiURLs/ApiURLs';
import Cookies from 'js-cookie';

export interface User {
    id: number;
    name: string;
    role: string;
}

interface CreateUserData {
    name: string;
    role: string;
    password: string;
}

interface UpdateUserData {
    name: string;
    role: string;
    password?: string;
}

class UserService {
    private getHeaders() {
        const token = Cookies.get('auth_token');
        return {
            'Authorization': `Bearer ${token}`
        };
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const response = await axios.get(`${ApiUrls.BASE_URL}api/users`, {
                headers: this.getHeaders(),
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async createUser(userData: CreateUserData): Promise<User> {
        try {
            const response = await axios.post(`${ApiUrls.BASE_URL}api/users`, userData, {
                headers: this.getHeaders()
            });
            return response.data.user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async updateUser(id: number, userData: UpdateUserData): Promise<User> {
        try {
            const response = await axios.put(`${ApiUrls.BASE_URL}api/users/${id}`, userData, {
                headers: this.getHeaders()
            });
            return response.data.user;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            await axios.delete(`${ApiUrls.BASE_URL}api/users/${id}`, {
                headers: this.getHeaders()
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}
const useServices = new UserService();
export default useServices;
