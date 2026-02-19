import { LoginResponse } from "@/types/context-type";
import { backendService } from "./api";
import { isAxiosError } from "axios";



export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await backendService.post<LoginResponse>('/auth/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Unable to connect. Please try again.');
    }
};
