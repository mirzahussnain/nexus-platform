import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SmartHomeScreen() {
    return (
        <View className="flex-1 bg-gray-50">
            <SafeAreaView className="flex-1">

                {/* --- HEADER --- */}
                <View className="px-6 pt-4 pb-6">
                    <Text className="text-slate-900 text-3xl font-bold">My Home</Text>
                    <Text className="text-slate-500 text-sm">IoT Sensor Status • Unit 1024</Text>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>

                    {/* --- 1. HOME HEALTH SCORE (The "Predictive" bit) --- */}
                    <View className="mb-8">
                        <LinearGradient
                            colors={['#0f172a', '#334155']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="rounded-3xl p-6 shadow-xl shadow-slate-400/30"
                        >
                            <View className="flex-row justify-between items-start mb-6">
                                <View>
                                    <Text className="text-slate-400 text-xs font-bold uppercase mb-1">Overall Health</Text>
                                    <Text className="text-white text-3xl font-bold">Good</Text>
                                </View>
                                <View className="h-12 w-12 rounded-full border-4 border-emerald-500 items-center justify-center">
                                    <Text className="text-white font-bold text-xs">92%</Text>
                                </View>
                            </View>

                            {/* DAMP RISK BAR */}
                            <View className="mb-2">
                                <View className="flex-row justify-between mb-2">
                                    <Text className="text-white font-bold text-sm">Damp Risk</Text>
                                    <Text className="text-emerald-400 text-xs font-bold">LOW</Text>
                                </View>
                                <View className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <View className="h-full w-[20%] bg-emerald-500 rounded-full" />
                                </View>
                                <Text className="text-slate-400 text-[10px] mt-2">
                                    Based on humidity levels over the last 7 days.
                                </Text>
                            </View>
                        </LinearGradient>
                    </View>

                    {/* --- 2. ROOM SENSORS GRID --- */}
                    <Text className="text-slate-900 font-bold text-lg mb-4">Room Sensors</Text>
                    <View className="flex-row flex-wrap justify-between gap-y-4">

                        {/* LIVING ROOM */}
                        <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <View className="flex-row justify-between items-start mb-3">
                                <MaterialCommunityIcons name="sofa-outline" size={24} color="#64748b" />
                                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                            </View>
                            <Text className="text-slate-900 font-bold">Living Room</Text>
                            <Text className="text-slate-500 text-xs mt-1">Temp: 21°C</Text>
                            <Text className="text-slate-500 text-xs">Humidity: 45%</Text>
                        </View>

                        {/* KITCHEN */}
                        <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <View className="flex-row justify-between items-start mb-3">
                                <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#64748b" />
                                {/* AMBER DOT = Warning */}
                                <View className="w-2 h-2 rounded-full bg-amber-500" />
                            </View>
                            <Text className="text-slate-900 font-bold">Kitchen</Text>
                            <Text className="text-slate-500 text-xs mt-1">Temp: 23°C</Text>
                            <Text className="text-amber-600 text-xs font-bold">Humidity: 68%</Text>
                        </View>

                        {/* BATHROOM */}
                        <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <View className="flex-row justify-between items-start mb-3">
                                <MaterialCommunityIcons name="shower" size={24} color="#64748b" />
                                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                            </View>
                            <Text className="text-slate-900 font-bold">Bathroom</Text>
                            <Text className="text-slate-500 text-xs mt-1">Temp: 20°C</Text>
                            <Text className="text-slate-500 text-xs">Humidity: 50%</Text>
                        </View>

                        {/* BEDROOM */}
                        <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <View className="flex-row justify-between items-start mb-3">
                                <MaterialCommunityIcons name="bed-empty" size={24} color="#64748b" />
                                <View className="w-2 h-2 rounded-full bg-emerald-500" />
                            </View>
                            <Text className="text-slate-900 font-bold">Bedroom</Text>
                            <Text className="text-slate-500 text-xs mt-1">Temp: 19°C</Text>
                            <Text className="text-slate-500 text-xs">Humidity: 42%</Text>
                        </View>

                    </View>

                    {/* --- 3. TIPS CARD --- */}
                    <TouchableOpacity className="mt-6 bg-blue-50 p-4 rounded-2xl border border-blue-100 flex-row items-center gap-4">
                        <View className="bg-blue-100 p-2 rounded-full">
                            <MaterialCommunityIcons name="information-variant" size={24} color="#2563eb" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-blue-900 font-bold text-sm">Tip: Reduce Humidity</Text>
                            <Text className="text-blue-700/80 text-xs mt-1">
                                Try opening the kitchen window when cooking to lower damp risk.
                            </Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}