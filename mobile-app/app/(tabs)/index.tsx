import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Hooks & Utils
import { useAuth } from '@/context/AuthContext';
import { useBiometrics } from '@/hooks/useBiometrics';
import { storage } from '@/utils/storage';

export default function HomeDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const { isSupported, isEnabled, enableBiometrics } = useBiometrics();
    const [greeting, setGreeting] = useState('Welcome');

    // --- LOGIC: GREETING & SMART PROMPTS ---
    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const setupDashboard = async () => {
                // 1. Set Time-based Greeting
                const hours = new Date().getHours();
                if (hours < 12) setGreeting('Good Morning');
                else if (hours < 18) setGreeting('Good Afternoon');
                else setGreeting('Good Evening');

                // 2. Check Biometrics (Only if logged in)
                if (!user) return;

                // Small delay to let animations finish
                await new Promise(resolve => setTimeout(resolve, 2000));

                if (!isActive) return;

                const hasLaunched = await storage.get('hasLaunched');
                const hasAsked = await storage.get('hasAskedBiometrics');

                // Logic: Hardware works + Not Enabled + Never Asked
                if (hasLaunched && isSupported && !isEnabled && !hasAsked) {
                    Alert.alert(
                        "Enable Fast Login?",
                        "Would you like to use Face ID / Fingerprint next time?",
                        [
                            {
                                text: "No, Thanks",
                                onPress: () => storage.save('hasAskedBiometrics', true),
                                style: "cancel"
                            },
                            {
                                text: "Yes, Enable",
                                onPress: () => {
                                    enableBiometrics();
                                    storage.save('hasAskedBiometrics', true);
                                }
                            }
                        ]
                    );
                }
            };

            setupDashboard();

            return () => { isActive = false; };
        }, [user, isSupported, isEnabled])
    );

    return (
        <View className="flex-1 bg-gray-50">
            <SafeAreaView className="flex-1">
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >

                    {/* --- 1. HEADER (Greeting + Unit Details) --- */}
                    <View className="px-6 pt-4 pb-6 flex-row justify-between items-start">
                        <View>
                            <Text className="text-slate-500 text-sm font-medium mb-1">{greeting},</Text>
                            <Text className="text-slate-900 text-3xl font-bold tracking-tight mb-2">
                                {user?.name || 'Tenant'}
                            </Text>

                            {/* UNI DETAIL / LOCATION BADGE */}
                            <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full border border-slate-200 self-start shadow-sm">
                                <MaterialCommunityIcons name="map-marker-outline" size={14} color="#64748b" />
                                <Text className="text-slate-600 text-xs font-semibold ml-1">
                                    Unit 1024 • Nexus Tower A
                                </Text>
                            </View>
                        </View>

                        {/* NOTIFICATION BELL */}
                        <TouchableOpacity
                            onPress={() => router.push('/profile')} // <--- NAVIGATES TO PROFILE
                            className="w-10 h-10 bg-white rounded-full border border-slate-200 items-center justify-center shadow-sm"
                        >
                            {/* Use a User Icon or the User's Photo */}
                            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#1e293b" />
                        </TouchableOpacity>
                    </View>

                    {/* --- 2. COMMAND CENTER CARD (Combined AI + IoT + Indicators) --- */}
                    <View className="px-6 mb-6">
                        <TouchableOpacity
                            activeOpacity={0.95}
                            onPress={() => router.push('/ticket/create')}
                            className="rounded-3xl overflow-hidden shadow-xl shadow-blue-900/20"
                        >
                            <LinearGradient
                                // Gradient: Rich Blue -> Deep Navy (Premium Tech Feel)
                                colors={['#3b82f6', '#172554']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                className="p-1" // Thin padding for border effect
                            >
                                <View className="p-5">

                                    {/* A. HEADER: NEXUS AI STATUS */}
                                    <View className="flex-row justify-between items-center mb-4">
                                        <View className="bg-white/10 px-3 py-1 rounded-lg flex-row items-center gap-1 border border-white/10">
                                            <MaterialCommunityIcons name="star-four-points" size={12} color="#fff" />
                                            <Text className="text-white text-xs font-bold">NEXUS AI</Text>
                                        </View>
                                        <MaterialCommunityIcons name="dots-horizontal" size={20} color="white" style={{ opacity: 0.5 }} />
                                    </View>

                                    {/* B. DYNAMIC PROMPT (Addressing "Prevent Illness" Requirement) */}
                                    <Text className="text-white text-2xl font-bold mb-1 leading-tight">
                                        System Check: <Text className="text-amber-300">Attention</Text>
                                    </Text>
                                    <Text className="text-blue-100 text-sm mb-6 opacity-90">
                                        Damp risk detected. Tap to schedule a check.
                                    </Text>

                                    {/* C. IOT DATA GRID WITH INDICATORS */}
                                    <View className="flex-row bg-black/20 rounded-2xl p-4 mb-6 border border-white/5 justify-between">

                                        {/* 1. Temp (Optimal) */}
                                        <View className="items-center flex-1 border-r border-white/10">
                                            <Text className="text-white text-xl font-bold">72°</Text>
                                            <Text className="text-blue-200 text-[10px] font-bold uppercase mb-2">Temp</Text>
                                            {/* INDICATOR: GREEN */}
                                            <View className="bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
                                                <Text className="text-emerald-300 text-[9px] font-bold">OPTIMAL</Text>
                                            </View>
                                        </View>

                                        {/* 2. Humidity (RISK - Demonstrates KTP Goal) */}
                                        <View className="items-center flex-1 border-r border-white/10">
                                            <Text className="text-white text-xl font-bold">68%</Text>
                                            <Text className="text-blue-200 text-[10px] font-bold uppercase mb-2">Humidity</Text>
                                            {/* INDICATOR: AMBER/RED */}
                                            <View className="bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                                                <Text className="text-amber-300 text-[9px] font-bold">HIGH</Text>
                                            </View>
                                        </View>

                                        {/* 3. Usage (Stable) */}
                                        <View className="items-center flex-1">
                                            <Text className="text-white text-xl font-bold">Low</Text>
                                            <Text className="text-blue-200 text-[10px] font-bold uppercase mb-2">Energy</Text>
                                            {/* INDICATOR: BLUE */}
                                            <View className="bg-blue-400/20 px-2 py-0.5 rounded-md border border-blue-400/30">
                                                <Text className="text-blue-300 text-[9px] font-bold">STABLE</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* D. ACTION BUTTON */}
                                    <View className="bg-white flex-row items-center justify-center py-4 rounded-2xl gap-2 shadow-lg">
                                        <MaterialCommunityIcons name="microphone" size={24} color="#2563eb" />
                                        <Text className="text-blue-700 font-bold text-base">Tap to Report Issue</Text>
                                    </View>

                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* --- 3. TENANCY & COMMUNITY GRID ("Warm Housing" Vibe) --- */}
                    <View className="px-6 flex-row gap-4 mb-6">

                        {/* LEFT: MY TENANCY (Replaces Rent Due) */}
                        <TouchableOpacity className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-slate-100 h-36 justify-between">
                            <View className="flex-row justify-between items-start">
                                <View className="w-10 h-10 bg-emerald-50 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="home-heart" size={20} color="#10b981" />
                                </View>
                                <View className="bg-emerald-100 px-2 py-1 rounded-md">
                                    <Text className="text-emerald-700 text-[10px] font-bold">PAID</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Current Balance</Text>
                                <Text className="text-slate-900 text-xl font-bold">£0.00</Text>
                                <Text className="text-slate-400 text-[10px] mt-1">Next due: June 01</Text>
                            </View>
                        </TouchableOpacity>

                        {/* RIGHT: MAINTENANCE (Replaces Repairs) */}
                        <TouchableOpacity className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-slate-100 h-36 justify-between">
                            <View className="flex-row justify-between items-start">
                                <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="tools" size={20} color="#f97316" />
                                </View>
                                <View className="bg-blue-100 px-2 py-1 rounded-md">
                                    <Text className="text-blue-700 text-[10px] font-bold">2 ACTIVE</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Repairs</Text>
                                <Text className="text-slate-900 text-xl font-bold">In Progress</Text>
                                <Text className="text-slate-400 text-[10px] mt-1">Plumber • Tomorrow</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* --- 4. COMMUNITY & SUPPORT (The "Human" Element) --- */}
                    <View className="px-6 mb-8">
                        <Text className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-wider">Community & Support</Text>

                        {/* Housing Officer Card */}
                        <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex-row items-center mb-3">
                            {/* Avatar Image Placeholder */}
                            <View className="w-12 h-12 bg-indigo-50 rounded-full items-center justify-center mr-3 border border-indigo-100">
                                <Text className="text-indigo-600 font-bold text-lg">SJ</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-slate-900 font-bold text-sm">Sarah Jenkins</Text>
                                <Text className="text-slate-500 text-xs">Your Housing Officer</Text>
                            </View>
                            {/* Action: Message */}
                            <TouchableOpacity className="bg-slate-50 p-2 rounded-full border border-slate-200 mr-2">
                                <MaterialCommunityIcons name="chat-processing-outline" size={20} color="#475569" />
                            </TouchableOpacity>
                            {/* Action: Call */}
                            <TouchableOpacity className="bg-slate-50 p-2 rounded-full border border-slate-200">
                                <MaterialCommunityIcons name="phone-outline" size={20} color="#475569" />
                            </TouchableOpacity>
                        </View>

                        {/* Community Notice */}
                        <TouchableOpacity className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 flex-row items-center">
                            <View className="mr-3">
                                <MaterialCommunityIcons name="bulletin-board" size={24} color="#6366f1" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-indigo-900 font-bold text-sm">Community Cleanup Day</Text>
                                <Text className="text-indigo-600/80 text-xs">Saturday • 10:00 AM • Main Garden</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#a5b4fc" />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}