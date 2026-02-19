import { backendService } from "./api";

export const createTicket = async (description: string) => {
    try {
        const response = await backendService.post('/tickets', { description }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Backend Error:", error);
        throw error;
    }
};

export const getTicketById = async (id: number) => {
    try {
        const response = await backendService.get(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        console.error("Backend Error:", error);
        throw error;
    }
};

export const getTenantTickets = async (tenantId: number) => {
    try {
        const response = await backendService.get(`/tickets/tenant/${tenantId}`);
        return response.data;
    } catch (error) {
        console.error("Backend Error:", error);
        throw error;
    }
};