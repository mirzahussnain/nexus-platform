import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createTicket } from '@/services/ticket.service';
import { TicketResponse } from '@/types/ticket-type';
import { getUrgencyConfig, getCategoryConfig, getConfidenceColor } from '@/utils/helpers';

// Components
import RecommendedActionCard from '@/components/ticket/RecommendedActionCard';
import AIReasoningSection from '@/components/ticket/AIReasoningSection';

export default function SmartReportScreen() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'DONE'>('IDLE');
    const [result, setResult] = useState<TicketResponse | null>(null);

    // SINGLE-STEP SUBMIT: sends to backend → backend calls AI + saves → returns result
    const handleSubmit = async () => {
        if (description.length < 5) return;
        Keyboard.dismiss();
        setStatus('SUBMITTING');

        try {
            const response = await createTicket(description);
            setResult(response);
            setStatus('DONE');
        } catch (error) {
            console.error(error);
            Alert.alert("Submission Failed", "Could not reach the server.\nCheck your network connection and try again.");
            setStatus('IDLE');
        }
    };

    const handleReset = () => {
        setStatus('IDLE');
        setResult(null);
        setDescription('');
    };

    return (
        <View className="flex-1 bg-slate-50">
            <SafeAreaView className="flex-1">

                {/* HEADER */}
                <View className="px-6 py-4 flex-row items-center justify-between bg-white border-b border-slate-100">
                    <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            <MaterialCommunityIcons name="arrow-left" size={24} color="#0f172a" />
                        </TouchableOpacity>
                        <Text className="text-xl font-bold text-slate-900">New Request</Text>
                    </View>
                    {status === 'DONE' && (
                        <TouchableOpacity onPress={handleReset}>
                            <Text className="text-blue-600 font-semibold text-sm">New Report</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                    {/* INPUT — only editable when IDLE */}
                    {status !== 'DONE' && (
                        <>
                            <Text className="font-bold text-slate-900 mb-2 ml-1">Describe the issue</Text>
                            <View className="bg-white rounded-2xl p-4 border border-slate-200 mb-6 shadow-sm">
                                <TextInput
                                    className="text-base text-slate-900 min-h-[140px]"
                                    placeholder="e.g. My kitchen sink is leaking and there's water everywhere..."
                                    placeholderTextColor="#94a3b8"
                                    multiline
                                    textAlignVertical="top"
                                    value={description}
                                    onChangeText={setDescription}
                                    editable={status === 'IDLE'}
                                />
                            </View>
                        </>
                    )}

                    {/* LOADING STATE */}
                    {status === 'SUBMITTING' && (
                        <View className="items-center py-12">
                            <View className="bg-white w-20 h-20 rounded-full items-center justify-center shadow-lg shadow-blue-100 mb-4 border border-slate-100">
                                <ActivityIndicator size="large" color="#3b82f6" />
                            </View>
                            <Text className="text-slate-900 font-bold text-base mb-1">Submitting your report</Text>
                            <Text className="text-slate-400 text-sm">AI is analyzing and creating your ticket...</Text>
                        </View>
                    )}

                    {/* ═══════════════ RESULT CARD ═══════════════ */}
                    {status === 'DONE' && result && (() => {
                        const urgencyStyle = getUrgencyConfig(result.urgency);
                        const categoryStyle = getCategoryConfig(result.category);
                        const confidenceColor = getConfidenceColor(result.confidence);
                        const confidencePercent = Math.round(result.confidence * 100);

                        return (
                            <View className="mb-6">

                                {/* ── SUCCESS BANNER ── */}
                                <View className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center">
                                        <MaterialCommunityIcons name="check-circle" size={24} color="#10b981" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-emerald-800 font-bold text-base">Ticket Created!</Text>
                                        <Text className="text-emerald-600 text-xs">Ticket #{result.id} • Status: {result.status}</Text>
                                    </View>
                                </View>

                                {/* ── AI Analysis Card ── */}
                                <View className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-4">
                                    {/* Top bar */}
                                    <View className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-2">
                                            <MaterialCommunityIcons name="robot" size={14} color="#4f46e5" />
                                            <Text className="text-indigo-600 font-bold text-xs uppercase tracking-wide">Nexus AI Analysis</Text>
                                        </View>
                                    </View>

                                    {/* Priority + Category + Confidence */}
                                    <View className="p-5">
                                        <View className="flex-row items-center justify-between mb-5">
                                            {/* Priority */}
                                            <View className="flex-row items-center gap-3 flex-1">
                                                <View
                                                    className="w-12 h-12 rounded-xl items-center justify-center"
                                                    style={{ backgroundColor: urgencyStyle.bg, borderWidth: 1, borderColor: urgencyStyle.border }}
                                                >
                                                    <MaterialCommunityIcons name={urgencyStyle.icon} size={26} color={urgencyStyle.color} />
                                                </View>
                                                <View>
                                                    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Priority</Text>
                                                    <Text className="font-bold text-xl" style={{ color: urgencyStyle.color }}>
                                                        {result.urgency}
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* Category Badge */}
                                            <View
                                                className="px-3.5 py-2 rounded-xl flex-row items-center gap-2"
                                                style={{ backgroundColor: categoryStyle.color + '12', borderWidth: 1, borderColor: categoryStyle.color + '30' }}
                                            >
                                                <MaterialCommunityIcons name={categoryStyle.icon as any} size={16} color={categoryStyle.color} />
                                                <Text className="font-bold text-xs" style={{ color: categoryStyle.color }}>
                                                    {result.category}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Confidence Bar */}
                                        <View className="mb-1">
                                            <View className="flex-row items-center justify-between mb-2">
                                                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Confidence</Text>
                                                <Text className="font-bold text-sm" style={{ color: confidenceColor }}>
                                                    {confidencePercent}%
                                                </Text>
                                            </View>
                                            <View className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                <View
                                                    className="h-full rounded-full"
                                                    style={{ width: `${confidencePercent}%`, backgroundColor: confidenceColor }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* ── Recommended Action ── */}
                                {result.recommendedAction && (
                                    <View className="mb-4">
                                        <RecommendedActionCard action={result.recommendedAction} />
                                    </View>
                                )}

                                {/* ── AI Reasoning ── */}
                                {result.explanationJson && (
                                    <AIReasoningSection explanationJson={result.explanationJson} showStepCount={false} />
                                )}

                                {/* ── Issue Description ── */}
                                <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                                    <View className="flex-row items-center gap-2 mb-3">
                                        <MaterialCommunityIcons name="text-box-outline" size={14} color="#64748b" />
                                        <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Your Report</Text>
                                    </View>
                                    <Text className="text-slate-700 text-sm leading-relaxed">{result.description}</Text>
                                </View>

                            </View>
                        );
                    })()}

                </ScrollView>

                {/* BOTTOM BUTTONS */}
                <View className="p-6 bg-white border-t border-slate-100">
                    {status === 'IDLE' ? (
                        <TouchableOpacity
                            className={`py-4 rounded-xl flex-row items-center justify-center gap-2 ${description.length > 5 ? 'bg-blue-600' : 'bg-slate-300'}`}
                            disabled={description.length <= 5}
                            onPress={handleSubmit}
                        >
                            <MaterialCommunityIcons name="send" size={20} color="white" />
                            <Text className="text-white font-bold text-lg">Submit Report</Text>
                        </TouchableOpacity>
                    ) : status === 'DONE' ? (
                        <TouchableOpacity
                            className="py-4 rounded-xl flex-row items-center justify-center gap-2 bg-slate-800"
                            onPress={() => router.back()}
                        >
                            <MaterialCommunityIcons name="arrow-left" size={20} color="white" />
                            <Text className="text-white font-bold text-lg">Back to Services</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>

            </SafeAreaView>
        </View>
    );
}