import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';


import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import { useBiometrics } from '@/hooks/useBiometrics';

export default function LoginScreen() {

    const { signIn, biometricLogin } = useAuth();
    const { isSupported, isEnabled, biometricType, authenticate } = useBiometrics();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginError, setLoginError] = useState('');



    // HANDLE LOGIN 
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setIsSubmitting(true);
        setLoginError('');

        try {
            await signIn(email, password);
        } catch (error: any) {
            setLoginError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 3. GENERIC BIOMETRIC HANDLER
    const handleBiometric = async () => {
        // Double check logic
        if (!isEnabled) {
            Alert.alert('Not Setup', 'Log in with password first to enable this feature.');
            return;
        }

        const success = await authenticate();
        // Use the hook to scan, then the context to login
        if (success) {
            await biometricLogin();
        } else {
            Alert.alert('Failed', 'Could not verify identity.');
        }
    };

    return (
        <LinearGradient
            // Dark Slate -> Navy Blue -> Deep Blue
            colors={['#0f172a', '#1e3a8a', '#172554']}
            className="flex-1"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 bg-nexus-primary justify-center px-6"
            >
                {/* HEADER LOGO */}
                <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-nexus-transparent rounded-3xl items-center justify-center mb-4">
                        {/* Ensure this path is correct for your project */}
                        <Image source={require('@/assets/images/nexus-logo.png')} className="w-24 h-24" resizeMode='contain' />
                    </View>
                    <Text className="text-4xl font-bold text-white tracking-tight">Welcome Back</Text>
                    <Text className="text-slate-400 mt-2">Sign in to your Nexus account</Text>
                </View>

                {/* ERROR MESSAGE */}
                {loginError ? (
                    <View className="bg-red-500/15 border border-red-500/40 rounded-xl px-4 py-3 mb-4">
                        <Text className="text-red-400 text-sm text-center font-medium">{loginError}</Text>
                    </View>
                ) : null}

                {/* INPUT FIELDS */}
                <View className="gap-y-4 mb-6">
                    <View>
                        <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">Email Address</Text>
                        <TextInput
                            className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white text-base"
                            placeholder="tenant@nexus.com"
                            placeholderTextColor="#64748b"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => { setEmail(text); setLoginError(''); }}
                        />
                    </View>

                    <View>
                        <Text className="text-slate-400 text-xs font-bold uppercase mb-2 ml-1">Password</Text>
                        <TextInput
                            className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white text-base"
                            placeholder="••••••••"
                            placeholderTextColor="#64748b"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => { setPassword(text); setLoginError(''); }}
                        />
                    </View>
                </View>

                {/* SIGN IN BUTTON */}
                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={isSubmitting}
                    className={`bg-nexus-secondary py-4 rounded-xl items-center shadow-lg mb-6 ${isSubmitting ? 'opacity-70' : ''}`}
                >
                    {isSubmitting ? (
                        <Text className="text-white font-bold text-lg">Verifying...</Text>
                    ) : (
                        <Text className="text-white font-bold text-lg">Sign In</Text>
                    )}
                </TouchableOpacity>

                {/* --- SEPARATOR & BIOMETRICS (Only show if device has hardware) --- */}
                {isSupported && isEnabled && (
                    <View className="w-full">

                        {/* SEPARATOR LINE */}
                        <View className="flex-row items-center mb-6">
                            <View className="flex-1 h-[1px] bg-white/50" />
                            <Text className="mx-4 text-white/50 text-sm">Or continue with</Text>
                            <View className="flex-1 h-[1px] bg-white/50" />
                        </View>

                        {/* BIOMETRIC BUTTON (Icon Top, Text Bottom) */}
                        <View className="items-center">
                            <TouchableOpacity
                                onPress={handleBiometric}
                                className="items-center justify-center gap-y-2"
                            >
                                {/* CIRCLE ICON BACKGROUND */}
                                <View className="w-16 h-16 rounded-full border border-slate-600 items-center justify-center bg-white/5">
                                    <MaterialCommunityIcons
                                        name={biometricType === 'FACE' ? "face-recognition" : "fingerprint"}
                                        size={32}
                                        color="#3b82f6" // Nexus Blue
                                    />
                                </View>

                                {/* TEXT LABEL */}
                                <Text className="text-slate-400 font-medium">
                                    {biometricType === 'FACE' ? "Face ID" : "Fingerprint"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </KeyboardAvoidingView>
        </LinearGradient >
    );
}