import axios from 'axios';
import ApiUrls from './ApiURLs/ApiURLs';
import { GuideEntity } from '../entities/GuideEntity';
import Cookies from 'js-cookie';

class GuideService {
    async getAllGuides(): Promise<GuideEntity[]> {
        const response = await axios.get(ApiUrls.GUIDE);
        return response.data;
    }

    async getGuideById(id: number): Promise<GuideEntity> {
        const response = await axios.get(`${ApiUrls.GUIDE}/${id}`);
        return response.data;
    }

    async createGuide(formData: FormData): Promise<GuideEntity> {
        const response = await axios.post(ApiUrls.GUIDE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async updateGuide(id: number, formData: FormData): Promise<GuideEntity> {
        const token = Cookies.get('auth_token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Add _method field to simulate PUT request
        formData.append('_method', 'PUT');

        // Make a POST request with _method=PUT
        const response = await axios.post(`${ApiUrls.GUIDE}/${id}`, formData, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        return response.data;
    }

    async deleteGuide(id: number): Promise<void> {
        await axios.delete(`${ApiUrls.GUIDE}/${id}`);
    }
}

const guideService = new GuideService();
export default guideService; 