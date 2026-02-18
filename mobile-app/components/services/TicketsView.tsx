import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TicketsView({ width }: { width: number }) {
    return (
        <View style={{ width, paddingHorizontal: 24 }} className="gap-y-4 pt-2">

            {/* CREATE NEW TICKET BUTTON */}
            <TouchableOpacity
                onPress={() => router.push('/ticket/create')}
                className="bg-blue-600 p-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
                <MaterialCommunityIcons name="plus" size={24} color="white" />
                <Text className="text-white font-bold text-lg">Report New Issue</Text>
            </TouchableOpacity>

            {/* ACTIVE TICKET CARD */}
            <Text className="text-slate-900 font-bold text-lg mt-2">Active</Text>
            <TouchableOpacity className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="bg-blue-100 px-3 py-1 rounded-lg">
                        <Text className="text-blue-700 text-xs font-bold">IN PROGRESS</Text>
                    </View>
                    <Text className="text-slate-400 text-xs">#TR-8821</Text>
                </View>
                <Text className="text-lg font-bold text-slate-900 mb-1">Leaking Kitchen Tap</Text>
                <Text className="text-slate-500 text-sm mb-4">Engineer scheduled: Tomorrow, 2:00 PM</Text>

                <View className="flex-row items-center gap-2 border-t border-slate-100 pt-3">
                    <MaterialCommunityIcons name="account-hard-hat" size={16} color="#64748b" />
                    <Text className="text-slate-500 text-xs">
                        Assigned to: <Text className="font-bold text-slate-700">Mike D.</Text>
                    </Text>
                </View>
            </TouchableOpacity>

            {/* CLOSED TICKET CARD */}
            <Text className="text-slate-900 font-bold text-lg mt-2">Past 30 Days</Text>
            <View className="bg-white p-5 rounded-2xl border border-slate-100 opacity-70">
                <View className="flex-row justify-between items-start mb-2">
                    <View className="bg-slate-100 px-3 py-1 rounded-lg">
                        <Text className="text-slate-600 text-xs font-bold">CLOSED</Text>
                    </View>
                    <Text className="text-slate-400 text-xs">#TR-8100</Text>
                </View>
                <Text className="text-lg font-bold text-slate-900">Boiler Service</Text>
            </View>
        </View>
    );
}
