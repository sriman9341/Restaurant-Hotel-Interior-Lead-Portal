import axios from 'axios';
import { resolveApiBaseUrl } from './baseUrl';

const configuredBaseUrl = (import.meta.env.VITE_API_URL || '').trim();
const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
const baseUrl = resolveApiBaseUrl(configuredBaseUrl, currentOrigin);

const api = axios.create({
  baseURL: baseUrl || '',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept request to add Authorization token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
