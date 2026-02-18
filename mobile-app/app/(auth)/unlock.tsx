import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BiometricUnlockScreen() {
    const router = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [status, setStatus] = useState("Locked");

    // 1. TRIGGER FACE ID IMMEDIATELY ON MOUNT
    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = async () => {
        setIsAuthenticating(true);
        setStatus("Scanning...");

        try {
            // A. Check if hardware supports it
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!hasHardware || !isEnrolled) {
                Alert.alert("Not Available", "Biometrics not set up on this device.");
                router.replace('/(auth)/login'); // Fallback to password
                return;
            }

            // B. The Actual Scan
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Unlock Nexus Portal',
                fallbackLabel: 'Use Passcode',
                disableDeviceFallback: false,
            });

            if (result.success) {
                setStatus("Unlocked");
                // SUCCESS -> Go to Dashboard
                setTimeout(() => {
                    router.replace('/(tabs)');
                }, 500); // Small delay for "Success" animation visual
            } else {
                setStatus("Failed");
                setIsAuthenticating(false);
            }

        } catch (e) {
            console.error(e);
            setStatus("Error");
            setIsAuthenticating(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-nexus-primary items-center justify-center">

            {/* LOCK ICON ANIMATION AREA */}
            <View className="mb-10 items-center">
                <View className={`w-32 h-32 rounded-full items-center justify-center border-4 ${status === 'Unlocked' ? 'border-nexus-success bg-nexus-success/70' :
                    status === 'Failed' ? 'border-nexus-danger bg-nexus-danger/70' :
                        'border-nexus-accent bg-nexus-accent/10'
                    }`}>
                    <MaterialCommunityIcons
                        name={status === 'Unlocked' ? "lock-open-variant" : "lock"}
                        size={64}
                        color={status === 'Unlocked' ? "#4ade80" : "#ffffff"}
                    />
                </View>

                <Text className="text-white text-2xl font-bold mt-6 tracking-tight">
                    {status === 'Unlocked' ? "Identity Verified" : "Nexus Secure"}
                </Text>
                <Text className="text-slate-400 mt-2">
                    {status === 'Scanning...' ? "Scanning Face ID..." : "Biometric Authentication Required"}
                </Text>
            </View>

            {/* RETRY BUTTON (Only shows if failed) */}
            {!isAuthenticating && status !== 'Unlocked' && (
                <View className="gap-y-4 w-full px-12">
                    <TouchableOpacity
                        onPress={authenticate}
                        className="bg-nexus-primary py-4 rounded-xl items-center w-full"
                    >
                        <Text className="text-white font-bold text-lg">Try Again</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.replace('/(auth)/login')}
                        className="py-2 items-center"
                    >
                        <Text className="text-slate-400 text-sm">Use Password Instead</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
}