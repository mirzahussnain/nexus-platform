import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CommunityScreen() {
    return (
        <View className="flex-1 bg-gray-50">
            <SafeAreaView className="flex-1">

                {/* --- HEADER --- */}
                <View className="px-6 pt-4 pb-6">
                    <Text className="text-slate-900 text-3xl font-bold">Community</Text>
                    <Text className="text-slate-500 text-sm">News, Events & Support</Text>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>

                    {/* --- 1. HOUSING OFFICER CARD (The "Human" Element) --- */}
                    <View className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-8">
                        <View className="flex-row items-center mb-4">
                            {/* AVATAR */}
                            <View className="h-14 w-14 bg-indigo-100 rounded-full items-center justify-center border-2 border-white shadow-sm mr-4">
                                <Text className="text-indigo-600 font-bold text-xl">SJ</Text>
                            </View>
                            <View>
                                <Text className="text-slate-900 font-bold text-lg">Sarah Jenkins</Text>
                                <Text className="text-slate-500 text-sm">Housing Officer • Sector 4</Text>
                            </View>
                        </View>

                        <Text className="text-slate-600 text-sm mb-4 leading-5">
                            {"Hi! I'm here to help with any tenancy issues or community concerns. Feel free to message me."}
                        </Text>

                        <View className="flex-row gap-3">
                            <TouchableOpacity className="flex-1 bg-slate-900 py-3 rounded-xl items-center flex-row justify-center gap-2">
                                <MaterialCommunityIcons name="chat-processing" size={18} color="white" />
                                <Text className="text-white font-bold">Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 bg-white border border-slate-200 py-3 rounded-xl items-center flex-row justify-center gap-2">
                                <MaterialCommunityIcons name="phone" size={18} color="#0f172a" />
                                <Text className="text-slate-900 font-bold">Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* --- 2. EVENTS SECTION --- */}
                    <View className="flex-row justify-between items-end mb-4">
                        <Text className="text-slate-900 font-bold text-lg">Upcoming Events</Text>
                        <Text className="text-blue-600 text-xs font-bold">See All</Text>
                    </View>

                    {/* Event 1 */}
                    <TouchableOpacity className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm mb-4">
                        <View className="h-24 bg-blue-500 items-center justify-center relative">
                            {/* Placeholder for Event Image */}
                            <MaterialCommunityIcons name="tree" size={40} color="white" style={{ opacity: 0.5 }} />
                            <View className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg">
                                <Text className="text-slate-900 font-bold text-xs">SAT, 12 MAY</Text>
                            </View>
                        </View>
                        <View className="p-4">
                            <Text className="text-slate-900 font-bold text-lg mb-1">Community Garden Cleanup</Text>
                            <Text className="text-slate-500 text-sm mb-2">Main Garden Area • 10:00 AM</Text>
                            <View className="flex-row items-center gap-1">
                                <MaterialCommunityIcons name="account-group" size={16} color="#64748b" />
                                <Text className="text-slate-500 text-xs">12 neighbors going</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Event 2 */}
                    <TouchableOpacity className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm mb-4">
                        <View className="h-24 bg-orange-400 items-center justify-center relative">
                            <MaterialCommunityIcons name="coffee" size={40} color="white" style={{ opacity: 0.5 }} />
                            <View className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg">
                                <Text className="text-slate-900 font-bold text-xs">TUE, 15 MAY</Text>
                            </View>
                        </View>
                        <View className="p-4">
                            <Text className="text-slate-900 font-bold text-lg mb-1">Coffee Morning</Text>
                            <Text className="text-slate-500 text-sm mb-2">Community Hall • 11:00 AM</Text>
                            <View className="flex-row items-center gap-1">
                                <MaterialCommunityIcons name="account-group" size={16} color="#64748b" />
                                <Text className="text-slate-500 text-xs">Come say hi!</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}