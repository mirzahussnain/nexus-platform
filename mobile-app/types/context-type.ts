export interface AuthContextType {
    user: any | null;
    isLoading: boolean;
    signIn: (email: string, pass: string) => Promise<void>;
    signOut: () => Promise<void>;
    lock: () => void;
    biometricLogin: () => Promise<void>;
}

export interface LoginResponse {
    token: string;
    tenantId: number;
    name: string;
    tenantNumber: string;
}