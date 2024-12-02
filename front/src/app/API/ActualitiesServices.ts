import axios from "axios";
import { ActualityEntity } from "../entities/ActualityEntity";
import Cookies from 'js-cookie';

class ActualityServices {
  private static getAuthHeaders() {
    const token = Cookies.get('auth_token');
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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
      const response = await axios.post(url, actuality, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'multipart/form-data', // Override for file upload
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in CreateActuality:", error);
      throw error;
    }
  }

  static async UpdateActuality(url: string, actuality: FormData): Promise<ActualityEntity> {
    try {
      const response = await axios.put(url, actuality, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'multipart/form-data', // Override for file upload
        },
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
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error("Error in DeleteActuality:", error);
      throw error;
    }
  }
}

export default ActualityServices;
