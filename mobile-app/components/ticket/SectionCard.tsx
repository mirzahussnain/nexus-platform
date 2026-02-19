import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SectionCardProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    children: React.ReactNode;
}

export default function SectionCard({ icon, title, children }: SectionCardProps) {
    return (
        <View className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-3.5 overflow-hidden">
            <View className="px-4 pt-4 pb-2 flex-row items-center gap-2">
                <MaterialCommunityIcons name={icon} size={14} color="#94a3b8" />
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{title}</Text>
            </View>
            <View className="px-4 pb-4">
                {children}
            </View>
        </View>
    );
}
