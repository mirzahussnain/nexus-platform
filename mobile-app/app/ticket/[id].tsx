import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getTicketById } from '@/services/ticket.service';
import { getUrgencyConfig, getStatusConfig, getCategoryConfig, formatDate } from '@/utils/helpers';
import { TicketResponse } from '@/types/ticket-type';

// Components
import SectionCard from '@/components/ticket/SectionCard';
import ConfidenceBar from '@/components/ticket/ConfidenceBar';
import RecommendedActionCard from '@/components/ticket/RecommendedActionCard';
import AIReasoningSection from '@/components/ticket/AIReasoningSection';
import UrgencyHeroCard from '@/components/ticket/UrgencyHeroCard';

export default function TicketDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [ticket, setTicket] = useState<TicketResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const data = await getTicketById(Number(id));
                setTicket(data);
            } catch (e) {
                Alert.alert('Error', 'Failed to load ticket details');
                router.back();
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchTicket();
    }, [id]);

    // LOADING STATE
    if (loading) {
        return (
            <View className="flex-1 bg-slate-50 items-center justify-center">
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text className="text-slate-400 mt-3 text-sm">Loading ticket...</Text>
            </View>
        );
    }

    if (!ticket) return null;

    const urgency = getUrgencyConfig(ticket.urgency);
    const status = getStatusConfig(ticket.status);
    const category = getCategoryConfig(ticket.category);

    return (
        <View className="flex-1 bg-slate-50">
            <SafeAreaView className="flex-1">

                {/* ── HEADER ── */}
                <View className="px-5 py-3.5 flex-row items-center justify-between bg-white border-b border-slate-100">
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-9 h-9 bg-slate-100 rounded-xl items-center justify-center"
                        >
                            <MaterialCommunityIcons name="arrow-left" size={20} color="#334155" />
                        </TouchableOpacity>
                        <View>
                            <Text className="text-[11px] text-slate-400 font-semibold">{ticket.ticketNumber || `#${ticket.id}`}</Text>
                            <Text className="text-base font-bold text-slate-900">Ticket Details</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: status.bg }}>
                        <MaterialCommunityIcons name={status.icon} size={12} color={status.color} />
                        <Text className="text-[11px] font-bold" style={{ color: status.color }}>{status.label}</Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                    {/* ── HERO CARD ── */}
                    <UrgencyHeroCard
                        urgency={ticket.urgency}
                        category={ticket.category}
                        createdAt={ticket.createdAt}
                        score={ticket.score}
                    />

                    {/* ── CONFIDENCE ── */}
                    {ticket.confidence != null && (
                        <SectionCard icon="chart-arc" title="AI Confidence">
                            <ConfidenceBar confidence={ticket.confidence} />
                        </SectionCard>
                    )}

                    {/* ── RECOMMENDED ACTION ── */}
                    {ticket.recommendedAction && (
                        <SectionCard icon="lightning-bolt" title="Recommended Action">
                            <RecommendedActionCard action={ticket.recommendedAction} />
                        </SectionCard>
                    )}

                    {/* ── DESCRIPTION ── */}
                    <SectionCard icon="text-box-outline" title="Issue Description">
                        <Text className="text-slate-700 text-sm leading-relaxed">{ticket.description}</Text>
                    </SectionCard>

                    {/* ── AI REASONING ── */}
                    {ticket.explanationJson && (
                        <AIReasoningSection explanationJson={ticket.explanationJson} />
                    )}

                    {/* ── TICKET METADATA ── */}
                    <SectionCard icon="information-outline" title="Ticket Information">
                        <View className="gap-2.5">
                            {[
                                { label: 'Ticket ID', value: ticket.ticketNumber || `#${ticket.id}`, icon: 'pound' as const },
                                { label: 'Status', value: status.label, icon: status.icon },
                                { label: 'Category', value: ticket.category, icon: category.icon },
                                { label: 'Priority', value: urgency.label, icon: urgency.icon },
                                { label: 'Created', value: formatDate(ticket.createdAt), icon: 'calendar-clock' as const },
                            ].map((item, i) => (
                                <View key={i} className="flex-row items-center justify-between py-1.5 border-b border-slate-50">
                                    <View className="flex-row items-center gap-2">
                                        <MaterialCommunityIcons name={item.icon} size={14} color="#94a3b8" />
                                        <Text className="text-slate-400 text-xs font-medium">{item.label}</Text>
                                    </View>
                                    <Text className="text-slate-700 text-xs font-semibold">{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </SectionCard>

                </ScrollView>

                {/* ── BOTTOM BAR ── */}
                <View className="px-5 py-4 bg-white border-t border-slate-100">
                    <TouchableOpacity
                        className="py-3.5 rounded-xl flex-row items-center justify-center gap-2 bg-slate-800"
                        onPress={() => router.back()}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={18} color="white" />
                        <Text className="text-white font-bold text-sm">Back to Tickets</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}
