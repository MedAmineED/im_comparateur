import axios from "axios";
import { ActualityEntity } from "../entities/ActualityEntity";
import Cookies from 'js-cookie';

class ActualityServices {
  private static getAuthHeaders(isFormData = false) {
    const token = Cookies.get('auth_token');
    return {
      'Accept': 'application/json',
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  // Public endpoints (no authentication required)
  static async GetAllActualities(url: string): Promise<ActualityEntity[]> {
    try {
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in GetAllActualities:", error);
      throw error;
    }
  }

  static async GetActualityById(url: string, id: number): Promise<ActualityEntity> {
    try {
      const response = await axios.get(`${url}/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in GetActualityById:", error);
      throw error;
    }
  }

  // Admin endpoints (authentication required)
  static async CreateActuality(url: string, actuality: FormData): Promise<ActualityEntity> {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(url, actuality, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in CreateActuality:", error);
      throw error;
    }
  }

  static async UpdateActuality(url: string, id: number, actuality: FormData): Promise<ActualityEntity> {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put(`${url}/${id}`, actuality, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PUT'  // This tells the server to treat this as a PUT request
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error in UpdateActuality:", error);
      throw error;
    }
  }

  static async DeleteActuality(url: string, id: number): Promise<void> {
    try {
      await axios.delete(`${url}/${id}`, {
        headers: ActualityServices.getAuthHeaders(),
      });
    } catch (error) {
      console.error("Error in DeleteActuality:", error);
      throw error;
    }
  }
}

export default ActualityServices;
