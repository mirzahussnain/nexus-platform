import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getTenantTickets } from '@/services/ticket.service';
import { getUrgencyConfig, getCategoryConfig, getStatusConfig, formatShortDate } from '@/utils/helpers';
import { useAuth } from '@/context/AuthContext';

// The backend /tickets/tenant/{id} returns raw Ticket entities with nested analysis
interface TicketEntity {
    id: number;
    ticketNumber: string;
    description: string;
    status: string;
    createdAt: string;
    analysis: {
        urgency: string;
        category: string;
        confidence: number;
        score: number;
        recommendedAction: string;
    } | null;
}

export default function TicketsView({ width }: { width: number }) {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<TicketEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTickets = useCallback(async () => {
        if (!user?.tenantId) return;
        try {
            const data = await getTenantTickets(user.tenantId);
            setTickets(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error('Failed to fetch tickets:', e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user?.tenantId]);

    useEffect(() => { fetchTickets(); }, [fetchTickets]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchTickets();
    }, [fetchTickets]);

    // Split tickets into active and closed
    const activeTickets = tickets.filter(t => t.status?.toUpperCase() !== 'CLOSED');
    const closedTickets = tickets.filter(t => t.status?.toUpperCase() === 'CLOSED');

    return (
        <View style={{ width, paddingHorizontal: 24 }} className="pt-2 flex-1">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
                }
            >

                {/* ── CREATE BUTTON ── */}
                <TouchableOpacity
                    onPress={() => router.push('/ticket/create')}
                    className="bg-blue-600 p-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg shadow-blue-900/20 mb-5"
                >
                    <MaterialCommunityIcons name="plus" size={24} color="white" />
                    <Text className="text-white font-bold text-lg">Report New Issue</Text>
                </TouchableOpacity>

                {/* ── LOADING ── */}
                {loading && (
                    <View className="items-center py-12">
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <Text className="text-slate-400 mt-3 text-sm">Loading tickets...</Text>
                    </View>
                )}

                {/* ── EMPTY STATE ── */}
                {!loading && tickets.length === 0 && (
                    <View className="items-center py-12 bg-white rounded-2xl border border-slate-100">
                        <MaterialCommunityIcons name="ticket-outline" size={48} color="#cbd5e1" />
                        <Text className="text-slate-400 mt-3 text-sm font-medium">No tickets yet</Text>
                        <Text className="text-slate-300 text-xs mt-1">Create a report to get started</Text>
                    </View>
                )}

                {/* ── ACTIVE TICKETS ── */}
                {activeTickets.length > 0 && (
                    <>
                        <Text className="text-slate-900 font-bold text-lg mb-3">Active</Text>
                        {activeTickets.map((ticket) => {
                            const urgency = getUrgencyConfig(ticket.analysis?.urgency || 'LOW');
                            const category = getCategoryConfig(ticket.analysis?.category || 'GENERAL');
                            const status = getStatusConfig(ticket.status);
                            return (
                                <TouchableOpacity
                                    key={ticket.id}
                                    onPress={() => router.push(`/ticket/${ticket.id}`)}
                                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-3"
                                    activeOpacity={0.7}
                                >
                                    {/* Top row: status + ticket number */}
                                    <View className="flex-row justify-between items-center mb-2.5">
                                        <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ backgroundColor: status.bg }}>
                                            <MaterialCommunityIcons name={status.icon} size={11} color={status.color} />
                                            <Text className="text-[10px] font-bold uppercase" style={{ color: status.color }}>{status.label}</Text>
                                        </View>
                                        <Text className="text-slate-400 text-[11px] font-medium">{ticket.ticketNumber || `#${ticket.id}`}</Text>
                                    </View>

                                    {/* Description */}
                                    <Text className="text-slate-800 font-semibold text-[14px] mb-2 leading-snug" numberOfLines={2}>
                                        {ticket.description}
                                    </Text>

                                    {/* Bottom row: urgency + category + date */}
                                    <View className="flex-row items-center gap-2 border-t border-slate-50 pt-2.5">
                                        <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-md" style={{ backgroundColor: urgency.bg }}>
                                            <MaterialCommunityIcons name={urgency.icon} size={11} color={urgency.color} />
                                            <Text className="text-[10px] font-bold" style={{ color: urgency.color }}>{urgency.label}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-md" style={{ backgroundColor: category.bg }}>
                                            <MaterialCommunityIcons name={category.icon} size={11} color={category.color} />
                                            <Text className="text-[10px] font-bold" style={{ color: category.color }}>{ticket.analysis?.category || 'GENERAL'}</Text>
                                        </View>
                                        <View className="flex-1" />
                                        <Text className="text-slate-300 text-[10px] font-medium">{formatShortDate(ticket.createdAt)}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </>
                )}

                {/* ── CLOSED TICKETS ── */}
                {closedTickets.length > 0 && (
                    <>
                        <Text className="text-slate-900 font-bold text-lg mt-3 mb-3">Closed</Text>
                        {closedTickets.map((ticket) => {
                            const category = getCategoryConfig(ticket.analysis?.category || 'GENERAL');
                            return (
                                <TouchableOpacity
                                    key={ticket.id}
                                    onPress={() => router.push(`/ticket/${ticket.id}`)}
                                    className="bg-white p-4 rounded-2xl border border-slate-100 opacity-70 mb-3"
                                    activeOpacity={0.7}
                                >
                                    <View className="flex-row justify-between items-center mb-2">
                                        <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100">
                                            <MaterialCommunityIcons name="check-circle" size={11} color="#64748b" />
                                            <Text className="text-[10px] font-bold text-slate-500 uppercase">Closed</Text>
                                        </View>
                                        <Text className="text-slate-400 text-[11px] font-medium">{ticket.ticketNumber || `#${ticket.id}`}</Text>
                                    </View>
                                    <Text className="text-slate-700 font-semibold text-[14px] mb-2" numberOfLines={1}>
                                        {ticket.description}
                                    </Text>
                                    <View className="flex-row items-center gap-2">
                                        <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-md" style={{ backgroundColor: category.bg }}>
                                            <MaterialCommunityIcons name={category.icon} size={11} color={category.color} />
                                            <Text className="text-[10px] font-bold" style={{ color: category.color }}>{ticket.analysis?.category || 'GENERAL'}</Text>
                                        </View>
                                        <View className="flex-1" />
                                        <Text className="text-slate-300 text-[10px] font-medium">{formatShortDate(ticket.createdAt)}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </>
                )}

            </ScrollView>
        </View>
    );
}
