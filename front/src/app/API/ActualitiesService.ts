import axios from 'axios';
import { ActualityEntity } from '../entities/ActualityEntity';
import ApiUrls from './ApiURLs/ApiURLs';

class ActualitiesService {
    async GetAllActualities(): Promise<ActualityEntity[]> {
        try {
            const response = await axios.get(ApiUrls.ACTUALITY);
            console.log('Actualities response:', response.data);
            return response.data.data || response.data;
        } catch (error) {
            console.error('Error fetching actualities:', error);
            return [];
        }
    }
}

const actualitiesService = new ActualitiesService();
export default actualitiesService; 