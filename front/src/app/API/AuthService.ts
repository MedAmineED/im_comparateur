import axios from 'axios';
import ApiUrls from './ApiURLs/ApiURLs';
import Cookies from 'js-cookie';

interface LoginResponse {
  token: string;
  user: {
    user_name: string;
    role: string;
  };
}

interface LoginCredentials {
  user_name: string;
  password: string;
}

interface RegisterData {
  user_name: string;
  password: string;
  role: string;
}

class AuthService {
  private token: string | null = null;
  private axiosInstance = axios.create();

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = Cookies.get('auth_token') || null;
      console.log('AuthService initialized with token:', this.token ? 'exists' : 'null');
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      console.log('Attempting login with credentials:', { username: credentials.user_name });
      const response = await this.axiosInstance.post<LoginResponse>(
        ApiUrls.AUTH.LOGIN,
        credentials
      );

      this.token = response.data.token;
      console.log('Received token from login:', this.token ? 'exists' : 'null');
      
      if (typeof window !== 'undefined') {
        // Store token in both cookie and localStorage
        Cookies.set('auth_token', this.token, { 
          expires: 7, // 7 days
          path: '/',
          sameSite: 'lax'  // Changed to lax for better compatibility
        });
        localStorage.setItem('auth_token', this.token);
        console.log('Token stored in cookies and localStorage');
      }
      
      // Set up axios interceptors after successful login
      this.setupAxiosInterceptors();
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(data: RegisterData) {
    try {
      const response = await this.axiosInstance.post(ApiUrls.AUTH.REGISTER, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      Cookies.remove('auth_token', { path: '/' });
      localStorage.removeItem('auth_token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      Cookies.set('auth_token', token, { 
        expires: 7, // 7 days
        path: '/',
        sameSite: 'strict'
      });
      localStorage.setItem('auth_token', token);
    }
  }

  setupAxiosInterceptors(): void {
    // Remove any existing interceptors
    axios.interceptors.request.eject(0);
    
    // Add new interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        console.log('Interceptor adding token to request:', token ? 'exists' : 'null');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('Authorization header set:', config.headers.Authorization.substring(0, 20) + '...');
        }
        return config;
      },
      (error) => {
        console.error('Interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Also set up for the instance used in this service
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        console.log('Interceptor adding token to request:', token ? 'exists' : 'null');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('Authorization header set:', config.headers.Authorization.substring(0, 20) + '...');
        }
        return config;
      },
      (error) => {
        console.error('Interceptor error:', error);
        return Promise.reject(error);
      }
    );
  }
}

const authService = new AuthService();
export default authService;
