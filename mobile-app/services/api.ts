import axios from 'axios';

// ---------------------------------------------------------------------------
// CONFIGURATION
// IF ON ANDROID EMULATOR: Use 'http://10.0.2.2:8000' and 'http://10.0.2.2:8080'
// IF ON PHYSICAL PHONE: Use your PC's IP Address (e.g., 'http://192.168.1.5:8000')
// ---------------------------------------------------------------------------
const API_URL_AI = 'http://192.168.1.212:8000';
const API_URL_JAVA = 'http://192.168.1.212:8080/api';

const aiService = axios.create({ baseURL: API_URL_AI });
const backendService = axios.create({ baseURL: API_URL_JAVA });

export const analyzeTicket = async (description: string) => {
    try {
        const response = await aiService.post('/analyze', { description });
        return response.data;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};

export const createTicket = async (ticketData: any) => {
    try {
        const response = await backendService.post('/tickets', ticketData);
        return response.data;
    } catch (error) {
        console.error("Backend Error:", error);
        throw error;
    }
};