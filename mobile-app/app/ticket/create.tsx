import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { analyzeTicket } from '@/services/ticket.service';

// --- TYPE: Matches the backend AIResponse schema exactly ---
interface AIAnalysis {
    urgency: string;
    score: number;
    category: string;
    confidence: number;
    recommended_action: string;
    keywords: string[];
    matched_terms: string[];
    explanation: string[];
}

// --- UI HELPERS ---
const getUrgencyStyle = (urgency: string) => {
    const u = urgency.toUpperCase();
    if (u === 'HIGH') return { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', icon: 'alert-decagram' as const, label: 'High Priority' };
    if (u === 'MEDIUM') return { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', icon: 'alert-circle-outline' as const, label: 'Medium Priority' };
    return { color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0', icon: 'check-circle-outline' as const, label: 'Low Priority' };
};

const getCategoryStyle = (category: string) => {
    const map: Record<string, { icon: string; color: string }> = {
        'PLUMBING': { icon: 'water', color: '#3b82f6' },
        'ELECTRICAL': { icon: 'flash', color: '#f59e0b' },
        'STRUCTURAL': { icon: 'wall', color: '#8b5cf6' },
        'HEATING': { icon: 'fire', color: '#ef4444' },
        'GENERAL': { icon: 'tag-outline', color: '#64748b' },
    };
    return map[category.toUpperCase()] || map['GENERAL'];
};

const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return '#10b981';
    if (confidence >= 0.4) return '#f59e0b';
    return '#ef4444';
};

export default function SmartReportScreen() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'ANALYZING' | 'REVIEW' | 'SUBMITTING'>('IDLE');
    const [aiResult, setAiResult] = useState<AIAnalysis | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleAnalyze = async () => {
        if (description.length < 5) return;
        Keyboard.dismiss();
        setStatus('ANALYZING');
        setShowExplanation(false);

        try {
            const response = await analyzeTicket(description);
            setAiResult(response);
            setStatus('REVIEW');
        } catch (error) {
            console.error(error);
            Alert.alert("Connection Failed", "Could not reach the AI service.\nCheck your network connection.");
            setStatus('IDLE');
        }
    };

    const handleSubmit = () => {
        setStatus('SUBMITTING');
        setTimeout(() => {
            Alert.alert("Success", "Ticket sent to landlord!");
            router.back();
        }, 1000);
    };

    const handleReset = () => {
        setStatus('IDLE');
        setAiResult(null);
        setDescription('');
        setShowExplanation(false);
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
                    {status === 'REVIEW' && (
                        <TouchableOpacity onPress={handleReset}>
                            <Text className="text-blue-600 font-semibold text-sm">Reset</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                    {/* INPUT */}
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

                    {/* LOADING STATE */}
                    {status === 'ANALYZING' && (
                        <View className="items-center py-12">
                            <View className="bg-white w-20 h-20 rounded-full items-center justify-center shadow-lg shadow-blue-100 mb-4 border border-slate-100">
                                <ActivityIndicator size="large" color="#3b82f6" />
                            </View>
                            <Text className="text-slate-900 font-bold text-base mb-1">Analyzing your report</Text>
                            <Text className="text-slate-400 text-sm">AI is processing keywords and context...</Text>
                        </View>
                    )}

                    {/* ═══════════════ AI RESULT CARD ═══════════════ */}
                    {status === 'REVIEW' && aiResult && (() => {
                        const urgencyStyle = getUrgencyStyle(aiResult.urgency);
                        const categoryStyle = getCategoryStyle(aiResult.category);
                        const confidenceColor = getConfidenceColor(aiResult.confidence);
                        const confidencePercent = Math.round(aiResult.confidence * 100);

                        return (
                            <View className="mb-6">

                                {/* ── SECTION 1: Header Card ── */}
                                <View className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-4">

                                    {/* Top bar */}
                                    <View className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-2">
                                            <MaterialCommunityIcons name="robot" size={14} color="#4f46e5" />
                                            <Text className="text-indigo-600 font-bold text-xs uppercase tracking-wide">Nexus AI Analysis</Text>
                                        </View>
                                        <View className="bg-indigo-100 px-2.5 py-1 rounded-md">
                                            <Text className="text-indigo-700 text-[10px] font-bold">SCORE: {aiResult.score}</Text>
                                        </View>
                                    </View>

                                    {/* Priority + Category Row */}
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
                                                        {aiResult.urgency}
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
                                                    {aiResult.category}
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
                                                    style={{
                                                        width: `${confidencePercent}%`,
                                                        backgroundColor: confidenceColor,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* ── SECTION 2: Recommended Action ── */}
                                <View className="mb-4">
                                    <LinearGradient
                                        colors={['#3b82f6', '#1e40af']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        className="rounded-2xl p-4"
                                    >
                                        <View className="flex-row items-start gap-3">
                                            <View className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center mt-0.5">
                                                <MaterialCommunityIcons name="lightning-bolt" size={22} color="#fff" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-1">Recommended Action</Text>
                                                <Text className="text-white font-bold text-base leading-snug">
                                                    {aiResult.recommended_action}
                                                </Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>

                                {/* ── SECTION 3: Matched Terms ── */}
                                {aiResult.matched_terms.length > 0 && (
                                    <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
                                        <View className="flex-row items-center gap-2 mb-3">
                                            <MaterialCommunityIcons name="target" size={14} color="#64748b" />
                                            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Matched Terms</Text>
                                        </View>
                                        <View className="flex-row flex-wrap gap-2">
                                            {aiResult.matched_terms.map((term, i) => (
                                                <View key={i} className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                                                    <Text className="text-amber-700 text-xs font-semibold">{term}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {/* ── SECTION 4: Keywords ── */}
                                {aiResult.keywords.length > 0 && (
                                    <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
                                        <View className="flex-row items-center gap-2 mb-3">
                                            <MaterialCommunityIcons name="tag-multiple-outline" size={14} color="#64748b" />
                                            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Extracted Keywords</Text>
                                        </View>
                                        <View className="flex-row flex-wrap gap-2">
                                            {aiResult.keywords.map((word, i) => (
                                                <View key={i} className="bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                                                    <Text className="text-slate-600 text-xs font-medium">#{word}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {/* ── SECTION 5: AI Reasoning (Collapsible) ── */}
                                <TouchableOpacity
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                                    activeOpacity={0.8}
                                    onPress={() => setShowExplanation(!showExplanation)}
                                >
                                    <View className="px-4 py-3.5 flex-row items-center justify-between">
                                        <View className="flex-row items-center gap-2">
                                            <MaterialCommunityIcons name="brain" size={14} color="#64748b" />
                                            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">AI Reasoning</Text>
                                        </View>
                                        <MaterialCommunityIcons
                                            name={showExplanation ? 'chevron-up' : 'chevron-down'}
                                            size={18}
                                            color="#94a3b8"
                                        />
                                    </View>
                                    {showExplanation && (
                                        <View className="px-4 pb-4 border-t border-slate-100 pt-3">
                                            {aiResult.explanation.map((step, i) => (
                                                <View key={i} className="flex-row items-start gap-3 mb-2.5">
                                                    <View className="w-5 h-5 bg-indigo-100 rounded-full items-center justify-center mt-0.5">
                                                        <Text className="text-indigo-600 text-[10px] font-bold">{i + 1}</Text>
                                                    </View>
                                                    <Text className="text-slate-600 text-sm flex-1 leading-relaxed">{step}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </TouchableOpacity>

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
                            onPress={handleAnalyze}
                        >
                            <MaterialCommunityIcons name="cloud-upload" size={20} color="white" />
                            <Text className="text-white font-bold text-lg">Analyze with AI</Text>
                        </TouchableOpacity>
                    ) : status === 'REVIEW' ? (
                        <TouchableOpacity
                            className="py-4 rounded-xl flex-row items-center justify-center gap-2 bg-blue-600 shadow-lg shadow-blue-200"
                            onPress={handleSubmit}
                        >
                            <Text className="text-white font-bold text-lg">Submit Ticket</Text>
                            <MaterialCommunityIcons name="send" size={20} color="white" />
                        </TouchableOpacity>
                    ) : status === 'SUBMITTING' ? (
                        <View className="py-4 rounded-xl flex-row items-center justify-center gap-2 bg-slate-300">
                            <ActivityIndicator size="small" color="white" />
                            <Text className="text-white font-bold text-lg">Submitting...</Text>
                        </View>
                    ) : null}
                </View>

            </SafeAreaView>
        </View>
    );
}