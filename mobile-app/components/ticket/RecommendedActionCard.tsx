import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface RecommendedActionCardProps {
    action: string;
}

export default function RecommendedActionCard({ action }: RecommendedActionCardProps) {
    return (
        <LinearGradient
            colors={['#3b82f6', '#1e40af']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-xl p-3.5"
        >
            <View className="flex-row items-start gap-3">
                <View className="w-9 h-9 bg-white/20 rounded-lg items-center justify-center mt-0.5">
                    <MaterialCommunityIcons name="lightning-bolt" size={20} color="#fff" />
                </View>
                <View className="flex-1">
                    <Text className="text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-1">Recommended Action</Text>
                    <Text className="text-white font-semibold text-[13px] leading-snug">{action}</Text>
                </View>
            </View>
        </LinearGradient>
    );
}
