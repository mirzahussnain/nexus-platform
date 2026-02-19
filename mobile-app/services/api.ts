import axios from 'axios';
import { storage } from '@/utils/storage';

const API_URL_JAVA = process.env.EXPO_PUBLIC_API_URL;

export const backendService = axios.create({ baseURL: API_URL_JAVA, timeout: 10000 });

// Attach JWT token to every outgoing request
backendService.interceptors.request.use(async (config) => {
    const token = await storage.get('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
