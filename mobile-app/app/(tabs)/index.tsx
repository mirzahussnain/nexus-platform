import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
// import { getTickets } from '../../services/api'; // Uncomment when API is ready

// --- CONFIGURATION ---
const TENANT_ID = 1; // <--- HARDCODED ID HERE

export default function Home() {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    // MOCK DATA (Replace this with API call later)
    const [tickets, setTickets] = useState([
        { id: 101, title: 'Leaking Boiler', status: 'OPEN', urgency: 'HIGH', date: '2 hrs ago' },
        { id: 102, title: 'Broken Window Lock', status: 'CLOSED', urgency: 'LOW', date: '1 day ago' },
    ]);

    // This function simulates fetching data from Java
    const loadData = async () => {
        setRefreshing(true);
        try {
            // const data = await getTickets(TENANT_ID); // Fetch tickets for ID 1
            // setTickets(data);
            console.log(`Fetching data for Tenant ${TENANT_ID}...`);

            // Simulate delay
            setTimeout(() => setRefreshing(false), 1000);
        } catch (e) {
            console.error(e);
            setRefreshing(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
            >

                {/* --- HEADER --- */}
                <View className="px-6 pt-4 pb-6 bg-surface border-b border-border">
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-text-secondary text-sm font-medium">Welcome back,</Text>
                            <Text className="text-text-primary text-2xl font-bold">Tenant #{TENANT_ID}</Text>
                        </View>
                        <TouchableOpacity className="bg-surface-highlight p-2 rounded-full border border-border">
                            <Ionicons name="notifications-outline" size={24} color="#3b82f6" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- HERO: REPORT ISSUE BUTTON --- */}
                <View className="px-6 mt-6">
                    <TouchableOpacity
                        activeOpacity={0.9}
                        // THIS IS HOW YOU DIRECT TO CREATE SCREEN:
                        onPress={() => router.push('/ticket/create')}
                    >
                        <LinearGradient
                            colors={['#1e3a8a', '#3b82f6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="p-6 rounded-2xl shadow-lg flex-row items-center justify-between"
                        >
                            <View>
                                <Text className="text-white text-lg font-bold">Report an Issue</Text>
                                <Text className="text-blue-100 text-sm mt-1">AI-Powered Analysis</Text>
                            </View>
                            <View className="bg-white/20 p-3 rounded-full">
                                <Ionicons name="add" size={32} color="white" />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* --- STATS ROW --- */}
                <View className="px-6 mt-8 flex-row justify-between">
                    <View className="w-[30%] bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl items-center border border-border">
                        <Text className="text-2xl font-bold text-nexus-secondary">02</Text>
                        <Text className="text-text-secondary text-xs">Active</Text>
                    </View>
                    <View className="w-[30%] bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl items-center border border-border">
                        <Text className="text-2xl font-bold text-emerald-500">14</Text>
                        <Text className="text-text-secondary text-xs">Fixed</Text>
                    </View>
                    <View className="w-[30%] bg-surface p-3 rounded-xl items-center border border-border">
                        <Text className="text-2xl font-bold text-text-primary">16</Text>
                        <Text className="text-text-secondary text-xs">Total</Text>
                    </View>
                </View>

                {/* --- RECENT TICKETS LIST --- */}
                <View className="px-6 mt-8">
                    <Text className="text-text-primary text-lg font-bold mb-4">Recent Activity</Text>

                    {tickets.map((ticket) => (
                        <TouchableOpacity
                            key={ticket.id}
                            className="bg-surface p-4 rounded-xl border border-border mb-3 flex-row justify-between items-center"
                            onPress={() => router.push(`/ticket/${ticket.id}`)}
                        >
                            <View className="flex-row items-center gap-3">
                                <View className={`p-2 rounded-full ${ticket.urgency === 'HIGH' ? 'bg-red-100' : 'bg-blue-100'}`}>
                                    <Ionicons
                                        name={ticket.urgency === 'HIGH' ? 'alert' : 'construct'}
                                        size={20}
                                        color={ticket.urgency === 'HIGH' ? '#ef4444' : '#3b82f6'}
                                    />
                                </View>
                                <View>
                                    <Text className="text-text-primary font-bold">{ticket.title}</Text>
                                    <Text className="text-text-secondary text-xs">{ticket.date}</Text>
                                </View>
                            </View>
                            <View className={`px-2 py-1 rounded-md ${ticket.status === 'OPEN' ? 'bg-blue-50' : 'bg-slate-100'}`}>
                                <Text className={`text-xs font-bold ${ticket.status === 'OPEN' ? 'text-blue-600' : 'text-slate-500'}`}>
                                    {ticket.status}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}