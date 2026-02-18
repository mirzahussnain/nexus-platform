import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';
import { storage } from '@/utils/storage';

export const useBiometrics = () => {
    const [isSupported, setIsSupported] = useState(false);
    const [biometricType, setBiometricType] = useState<'FACE' | 'FINGERPRINT' | null>(null);
    const [isEnabled, setIsEnabled] = useState(false);

    // 1. INITIALIZE (Check Hardware & Preferences)
    useEffect(() => {
        (async () => {
            // Check Hardware
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (hasHardware && isEnrolled) {
                setIsSupported(true);

                // Determine Type (Face vs Finger)
                const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
                if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                    setBiometricType('FACE');
                } else {
                    setBiometricType('FINGERPRINT');
                }

                // Check User Preference
                const enabled = await storage.get('biometricsEnabled');
                if (enabled === true) setIsEnabled(true);
            }
        })();
    }, []);

    // 2. AUTHENTICATE FUNCTION
    const authenticate = async (): Promise<boolean> => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Verify your identity',
                fallbackLabel: 'Use Passcode',
                disableDeviceFallback: false,
            });
            return result.success;
        } catch (error) {
            console.error("Biometric Error", error);
            return false;
        }
    };

    // 3. ENABLE FUNCTION
    const enableBiometrics = async () => {
        await storage.save('biometricsEnabled', true);
        setIsEnabled(true);
        Alert.alert("Success", `${biometricType === 'FACE' ? 'Face ID' : 'Fingerprint'} enabled!`);
    };

    // 4. DISABLE FUNCTION
    const disableBiometrics = async () => {
        await storage.save('biometricsEnabled', false);
        setIsEnabled(false);
    };

    return {
        isSupported,
        biometricType,
        isEnabled,
        authenticate,
        enableBiometrics,
        disableBiometrics
    };
};