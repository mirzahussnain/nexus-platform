import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { AppState } from 'react-native';
import { storage } from '../utils/storage';
import { AuthContextType } from '@/types/context-type';
import { loginUser } from '@/services/auth.service';


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
                const biometricsEnabled = await storage.get('biometricsEnabled');

                if (token && profile && !biometricsEnabled) {
                    // No biometrics — auto-restore session
                    setUser(profile);
                }
                // If biometrics enabled, leave user null → login screen → biometric prompt
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

        const data = await loginUser(email, pass);
        if (!data) throw new Error('Login Failed');
        const profile = { tenantId: data.tenantId, name: data.name, tenantNumber: data.tenantNumber };

        await storage.save('userToken', data.token);
        await storage.save('userProfile', profile);

        setUser(profile);
    };

    // BIOMETRIC LOGIC — actual biometric scan is handled by useBiometrics hook,
    // this only restores the saved session after a successful scan.
    const biometricLogin = async () => {
        const token = await storage.get('userToken');
        const profile = await storage.get('userProfile');

        if (!token || !profile) {
            throw new Error('No saved session. Please log in with your password first.');
        }

        setUser(profile);
    };

    // LOCK — clears session in memory, keeps credentials in storage for biometric re-login
    const lock = () => {
        setUser(null);
    };

    // FULL SIGN OUT — clears everything, forces password login next time
    const signOut = async () => {
        await storage.remove('userToken');
        await storage.remove('userProfile');
        await storage.remove('biometricsEnabled');
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

    // AUTO-LOCK ON APP BACKGROUND
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const sub = AppState.addEventListener('change', (nextState) => {
            if (appState.current === 'active' && nextState === 'background') {
                lock();
            }
            appState.current = nextState;
        });
        return () => sub.remove();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut, lock, biometricLogin }}>
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