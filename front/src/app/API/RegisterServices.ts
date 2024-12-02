import axios from "axios";
import { RegisterEntity } from "../entities/RegisterEntity";

class RegisterServices {


    async SayhelloGet(endpoint: string): Promise<RegisterEntity> {
        try {
          const response = await axios.get<RegisterEntity>(endpoint, {
            headers: {
              Authorization: `Bearer token`,
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      }


    async SayhelloPost(endpoint: string): Promise<RegisterEntity> {
      try {
        const response = await axios.post<RegisterEntity>(endpoint, {
          headers: {
            Authorization: `Bearer token`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }


      async GetArticleById(endpoint: string, id : number): Promise<RegisterEntity> {
        try {
          const response = await axios.get<RegisterEntity>(`${endpoint}/${id}`, {
            headers: {
              Authorization: `Bearer token`,
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
      }


    async Register(endpoint: string, register: RegisterEntity): Promise<RegisterEntity> {
      
      try {
        const response = await axios.post<RegisterEntity>(endpoint, register, {
          baseURL: 'http://localhost:8000',
          withCredentials: true,
          headers: {
            Authorization: `Bearer token`,
            'Content-Type': 'application/json'
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error adding user:", error);
        throw error;
      }
    }
}

const registerServices = new RegisterServices();
export default registerServices;