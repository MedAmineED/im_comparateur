import axios, { AxiosError } from 'axios';
import ApiUrls from './ApiURLs/ApiURLs';
import Cookies from 'js-cookie';

export interface ClientEntity {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    tel: string;
    age: number;
    address: string;
}

class ClientService {
    private getAuthHeaders() {
        const token = Cookies.get('auth_token');
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        };
    }

    private handleAxiosError(error: any, message: string): never {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            throw new Error(`${message}: ${axiosError.response?.data?.error || axiosError.message}`);
        }
        throw error;
    }

    // Public endpoints (no authentication required)
    async createPublicClient(client: Omit<ClientEntity, 'id'>): Promise<ClientEntity> {
        try {
            const response = await axios.post<ClientEntity>(`${ApiUrls.CLIENT}/public`, client, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, 'Erreur lors de la création du client');
            throw error;
        }
    }

    // Admin endpoints (authentication required)
    async getAllClients(): Promise<ClientEntity[]> {
        try {
            const response = await axios.get<ClientEntity[]>(ApiUrls.CLIENT, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, 'Erreur lors de la récupération des clients');
            return [];
        }
    }

    async createClient(client: Omit<ClientEntity, 'id'>): Promise<ClientEntity> {
        try {
            const response = await axios.post<ClientEntity>(`${ApiUrls.CLIENT}/public`, client, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, 'Erreur lors de la création du client');
            throw error;
        }
    }

    async updateClient(id: number, client: Partial<ClientEntity>): Promise<ClientEntity> {
        try {
            const response = await axios.put<ClientEntity>(`${ApiUrls.CLIENT}/${id}`, client, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, `Erreur lors de la mise à jour du client avec l'ID ${id}`);
            throw error;
        }
    }

    async deleteClient(id: number): Promise<void> {
        try {
            await axios.delete(`${ApiUrls.CLIENT}/${id}`, {
                headers: this.getAuthHeaders()
            });
        } catch (error) {
            this.handleAxiosError(error, `Erreur lors de la suppression du client avec l'ID ${id}`);
            throw error;
        }
    }

    async getClientById(id: number): Promise<ClientEntity> {
        try {
            const response = await axios.get<ClientEntity>(`${ApiUrls.CLIENT}/${id}`, {
                headers: this.getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(error, `Erreur lors de la récupération du client avec l'ID ${id}`);
            throw error;
        }
    }
}

const clientService = new ClientService();
export default clientService;
