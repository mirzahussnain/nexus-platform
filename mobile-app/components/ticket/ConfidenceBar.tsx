import React from 'react';
import { View, Text } from 'react-native';
import { getConfidenceColor } from '@/utils/helpers';

interface ConfidenceBarProps {
    confidence: number; // 0 to 1
}

export default function ConfidenceBar({ confidence }: ConfidenceBarProps) {
    const percent = Math.round(confidence * 100);
    const color = getConfidenceColor(confidence);
    const label =
        percent >= 70 ? 'High confidence in analysis'
            : percent >= 40 ? 'Moderate confidence'
                : 'Low confidence — manual review suggested';

    return (
        <>
            <View className="flex-row items-center justify-between mb-2">
                <Text className="text-slate-700 text-sm font-semibold">Analysis Accuracy</Text>
                <Text className="text-sm font-bold" style={{ color }}>{percent}%</Text>
            </View>
            <View className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <View
                    className="h-full rounded-full"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                />
            </View>
            <Text className="text-slate-400 text-[11px] mt-1.5">{label}</Text>
        </>
    );
}
