import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AIReasoningSectionProps {
    explanationJson: string;
    /** Optional step count badge (shown in [id].tsx, hidden in create.tsx) */
    showStepCount?: boolean;
}

export default function AIReasoningSection({ explanationJson, showStepCount = true }: AIReasoningSectionProps) {
    const [expanded, setExpanded] = useState(false);

    let steps: string[] = [];
    try { steps = JSON.parse(explanationJson); } catch { steps = []; }
    if (!Array.isArray(steps) || steps.length === 0) return null;

    return (
        <TouchableOpacity
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-3.5"
            activeOpacity={0.8}
            onPress={() => setExpanded(!expanded)}
        >
            <View className="px-4 py-3.5 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <MaterialCommunityIcons name="brain" size={14} color="#94a3b8" />
                    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">AI Reasoning</Text>
                    {showStepCount && (
                        <View className="bg-indigo-100 px-1.5 py-0.5 rounded-md ml-1">
                            <Text className="text-indigo-600 text-[9px] font-bold">{steps.length} steps</Text>
                        </View>
                    )}
                </View>
                <MaterialCommunityIcons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#94a3b8"
                />
            </View>
            {expanded && (
                <View className="px-4 pb-4 border-t border-slate-50 pt-3">
                    {steps.map((step: string, i: number) => (
                        <View key={i} className="flex-row items-start gap-3 mb-2.5">
                            <View className="w-5 h-5 bg-indigo-50 rounded-full items-center justify-center mt-0.5">
                                <Text className="text-indigo-600 text-[10px] font-bold">{i + 1}</Text>
                            </View>
                            <Text className="text-slate-600 text-sm flex-1 leading-relaxed">{step}</Text>
                        </View>
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
}
