import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL, // Adjust this to your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = token; // token already has Bearer prefix
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authInstance = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = token; // token already has Bearer prefix
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);