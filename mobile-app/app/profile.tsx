import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();

    // State for toggles
    const [faceIdEnabled, setFaceIdEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <View className="flex-1 bg-gray-50">
            <SafeAreaView className="flex-1">

                {/* --- 1. HEADER --- */}
                <View className="px-6 py-4 flex-row items-center justify-between mb-2">
                    <Text className="text-2xl font-extrabold text-[#0f172a]">
                        Profile & Settings
                    </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-blue-600 font-bold text-base">Done</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>

                    {/* --- 2. USER PROFILE CARD --- */}
                    <View className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm mb-6 flex-row items-center justify-between">
                        <View className="flex-row items-center gap-4">
                            {/* Avatar with Verified Check */}
                            <View className="relative">
                                <View className="w-16 h-16 bg-slate-200 rounded-full items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                    {/* Placeholder Image or Initials */}
                                    <Text className="text-2xl font-bold text-slate-400">SJ</Text>
                                </View>
                                <View className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white items-center justify-center">
                                    <MaterialCommunityIcons name="check" size={12} color="white" />
                                </View>
                            </View>

                            {/* Text Info */}
                            <View>
                                <Text className="text-lg font-bold text-slate-900">Sarah Jenkins</Text>
                                <Text className="text-slate-500 text-xs mb-1">Tenant ID: #882910</Text>
                                <View className="flex-row items-center gap-1">
                                    <MaterialCommunityIcons name="shield-check" size={14} color="#10b981" />
                                    <Text className="text-emerald-500 text-xs font-bold">Verified Tenant</Text>
                                </View>
                            </View>
                        </View>

                        {/* QR Code Button */}
                        <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-slate-200">
                            <MaterialCommunityIcons name="qrcode-scan" size={20} color="#64748b" />
                        </TouchableOpacity>
                    </View>

                    {/* --- 3. RENT STATEMENT BANNER --- */}
                    <TouchableOpacity className="bg-[#1e3a8a] p-5 rounded-[28px] flex-row items-center justify-between shadow-lg shadow-blue-900/20 mb-8">
                        <View className="flex-row items-center gap-4">
                            <View className="w-10 h-10 bg-white/10 rounded-xl items-center justify-center">
                                <MaterialCommunityIcons name="file-document-outline" size={24} color="white" />
                            </View>
                            <View>
                                <Text className="text-white font-bold text-base">Download Rent Statement</Text>
                                <Text className="text-blue-200 text-xs">PDF • Period: Oct 2023</Text>
                            </View>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="white" style={{ opacity: 0.8 }} />
                    </TouchableOpacity>

                    {/* --- 4. SECURITY & ACCESS SECTION --- */}
                    <Text className="text-slate-500 font-bold text-xs uppercase mb-3 ml-4 tracking-wider">Security & Access</Text>
                    <View className="bg-white rounded-[32px] border border-slate-100 overflow-hidden mb-8">

                        {/* Face ID */}
                        <View className="p-5 flex-row items-center justify-between border-b border-slate-50">
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="face-recognition" size={18} color="#3b82f6" />
                                </View>
                                <Text className="font-semibold text-slate-700 text-base">Enable FaceID</Text>
                            </View>
                            <Switch
                                value={faceIdEnabled}
                                onValueChange={setFaceIdEnabled}
                                trackColor={{ true: '#2563eb', false: '#cbd5e1' }}
                            />
                        </View>

                        {/* 2FA */}
                        <TouchableOpacity className="p-5 flex-row items-center justify-between border-b border-slate-50">
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 bg-purple-50 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="shield-lock-outline" size={18} color="#8b5cf6" />
                                </View>
                                <Text className="font-semibold text-slate-700 text-base">Two-Factor Auth</Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-slate-400 text-sm">On</Text>
                                <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
                            </View>
                        </TouchableOpacity>

                        {/* Change Password */}
                        <TouchableOpacity className="p-5 flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 bg-slate-100 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="lock-reset" size={18} color="#64748b" />
                                </View>
                                <Text className="font-semibold text-slate-700 text-base">Change Password</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
                        </TouchableOpacity>
                    </View>

                    {/* --- 5. PREFERENCES SECTION --- */}
                    <Text className="text-slate-500 font-bold text-xs uppercase mb-3 ml-4 tracking-wider">Preferences</Text>
                    <View className="bg-white rounded-[32px] border border-slate-100 overflow-hidden mb-6">

                        {/* Dark Mode */}
                        <View className="p-5 flex-row items-center justify-between border-b border-slate-50">
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 bg-indigo-50 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="weather-night" size={18} color="#6366f1" />
                                </View>
                                <Text className="font-semibold text-slate-700 text-base">Dark Mode</Text>
                            </View>
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ true: '#2563eb', false: '#e2e8f0' }}
                            />
                        </View>

                        {/* Notifications */}
                        <TouchableOpacity className="p-5 flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 bg-orange-50 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="bell-outline" size={18} color="#f97316" />
                                </View>
                                <Text className="font-semibold text-slate-700 text-base">Notifications</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
                        </TouchableOpacity>
                    </View>

                    {/* --- 6. SUPPORT & ACCOUNT SECTION --- */}
                    <Text className="text-slate-500 font-bold text-xs uppercase mb-3 ml-4 tracking-wider">Support & Account</Text>
                    <View className="bg-white rounded-[32px] border border-slate-100 overflow-hidden mb-8">
                        <TouchableOpacity
                            onPress={() => Alert.alert("Signing Out...")}
                            className="p-5 flex-row items-center justify-between"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="w-8 h-8 bg-red-50 rounded-full items-center justify-center">
                                    <MaterialCommunityIcons name="logout" size={18} color="#ef4444" />
                                </View>
                                <Text className="font-semibold text-red-600 text-base">Sign Out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}