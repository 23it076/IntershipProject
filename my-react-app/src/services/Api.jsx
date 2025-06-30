// File: src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ensure backend uses /api prefix
  withCredentials: true, // optional: needed if you use cookies
});

// Attach token from localStorage to each request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Optional: global response error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error:', error?.response || error.message);
    return Promise.reject(error);
  }
);

// Token helper
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
