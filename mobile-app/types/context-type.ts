export interface AuthContextType {
    user: any | null;
    isLoading: boolean;
    signIn: (email: string, pass: string) => Promise<void>;
    signOut: () => Promise<void>;
    biometricLogin: () => Promise<void>;
}