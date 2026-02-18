import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RentView({ width }: { width: number }) {
    return (
        <View style={{ width, paddingHorizontal: 24 }} className="gap-y-4 pt-2">

            {/* BALANCE CARD */}
            <View className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <Text className="text-slate-400 font-bold text-xs uppercase mb-2">Current Balance</Text>
                <Text className="text-4xl font-bold text-slate-900 mb-1">£0.00</Text>

                <View className="bg-emerald-100 self-start px-3 py-1 rounded-full">
                    <Text className="text-emerald-700 text-xs font-bold">All Paid Up</Text>
                </View>

                <TouchableOpacity className="mt-6 bg-slate-900 py-4 rounded-xl items-center shadow-lg shadow-slate-900/20">
                    <Text className="text-white font-bold text-lg">Make a Payment</Text>
                </TouchableOpacity>
            </View>

            {/* HISTORY LIST */}
            <Text className="text-slate-900 font-bold text-lg mt-4">History</Text>
            {[1, 2, 3].map((i) => (
                <View key={i} className="bg-white p-4 rounded-xl flex-row justify-between items-center border border-slate-100">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="arrow-bottom-left" size={20} color="#64748b" />
                        </View>
                        <View>
                            <Text className="font-bold text-slate-900">Rent Payment</Text>
                            <Text className="text-slate-500 text-xs">May 01 • Auto-Debit</Text>
                        </View>
                    </View>
                    <Text className="font-bold text-slate-900">-£450.00</Text>
                </View>
            ))}
        </View>
    );
}
