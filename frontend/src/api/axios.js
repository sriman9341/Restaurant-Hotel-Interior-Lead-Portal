import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://glory-simon-api-9341.loca.lt',
  headers: {
    'Content-Type': 'application/json',
    'bypass-tunnel-reminder': 'true'
  }
});

// Intercept request to add Authorization token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
