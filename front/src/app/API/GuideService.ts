import axios from 'axios';
import ApiUrls from './ApiURLs/ApiURLs';
import { GuideEntity } from '../entities/GuideEntity';

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
        const response = await axios.put(`${ApiUrls.GUIDE}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT',
            },
        });
        
        return response.data;
    }

    async deleteGuide(id: number): Promise<void> {
        await axios.delete(`${ApiUrls.GUIDE}/${id}`);
    }
}

const guideService = new GuideService();
export default guideService; 