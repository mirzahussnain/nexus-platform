import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getUrgencyConfig, getCategoryConfig, formatDate } from '@/utils/helpers';

interface UrgencyHeroCardProps {
    urgency: string;
    category: string;
    createdAt: string;
    score?: number | null;
}

export default function UrgencyHeroCard({ urgency, category, createdAt, score }: UrgencyHeroCardProps) {
    const urgencyConfig = getUrgencyConfig(urgency);
    const categoryConfig = getCategoryConfig(category);

    return (
        <LinearGradient
            colors={urgencyConfig.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-5 mb-3.5"
        >
            <View className="flex-row items-start justify-between mb-4">
                <View className="flex-row items-center gap-2.5">
                    <View className="w-11 h-11 bg-white/20 rounded-xl items-center justify-center">
                        <MaterialCommunityIcons name={urgencyConfig.icon} size={24} color="#fff" />
                    </View>
                    <View>
                        <Text className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Priority</Text>
                        <Text className="text-white text-xl font-bold">{urgencyConfig.label}</Text>
                    </View>
                </View>
                <View className="px-3 py-1.5 bg-white/15 rounded-lg flex-row items-center gap-1.5">
                    <MaterialCommunityIcons name={categoryConfig.icon} size={14} color="#fff" />
                    <Text className="text-white text-xs font-bold">{category}</Text>
                </View>
            </View>
            <View className="flex-row items-center gap-4">
                <View className="flex-row items-center gap-1.5">
                    <MaterialCommunityIcons name="calendar-clock" size={13} color="rgba(255,255,255,0.6)" />
                    <Text className="text-white/60 text-[11px] font-medium">{formatDate(createdAt)}</Text>
                </View>
                {score != null && (
                    <View className="flex-row items-center gap-1.5">
                        <MaterialCommunityIcons name="speedometer" size={13} color="rgba(255,255,255,0.6)" />
                        <Text className="text-white/60 text-[11px] font-medium">Score: {score}/10</Text>
                    </View>
                )}
            </View>
        </LinearGradient>
    );
}
