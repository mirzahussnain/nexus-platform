import { aiService, backendService } from "./api";

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