import axios from 'axios';


const API_URL_AI = process.env.EXPO_PUBLIC_AI_SERVICE;
const API_URL_JAVA = process.env.EXPO_PUBLIC_API_URL;



export const aiService = axios.create({ baseURL: API_URL_AI, timeout: 10000 });
export const backendService = axios.create({ baseURL: API_URL_JAVA, timeout: 10000 });

