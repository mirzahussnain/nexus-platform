import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { storage } from '../utils/storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { AuthContextType } from '@/types/context-type';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const segments = useSegments();

    // CHECK TOKEN ON MOUNT
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                const token = await storage.get('userToken');
                const profile = await storage.get('userProfile');

                if (token && profile) {
                    setUser(profile);
                }
            } catch (e) {
                console.error("Auth Check Failed", e);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    // SIGN IN LOGIC
    const signIn = async (email: string, pass: string) => {
        if (email.includes('@nexus.com')) {
            const fakeUser = { name: 'Tenant', email };

            await storage.save('userToken', 'mock-jwt-token');
            await storage.save('userProfile', fakeUser);

            setUser(fakeUser);
        } else {
            throw new Error('Invalid Credentials');
        }
    };

    // BIOMETRIC LOGIC
    const biometricLogin = async () => {
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
            const profile = await storage.get('userProfile');
            if (profile) setUser(profile);
        } else {
            throw new Error('Biometric Failed');
        }
    };

    // SIGN OUT LOGIC
    const signOut = async () => {
        await storage.remove('userToken');
        await storage.remove('userProfile');
        setUser(null);
    };

    // NAVIGATION PROTECTION
    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            router.replace('/(auth)/login');
        } else if (user && inAuthGroup) {
            router.replace('/(tabs)');
        }
    }, [user, isLoading, segments]);

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut, biometricLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook for easy access
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};