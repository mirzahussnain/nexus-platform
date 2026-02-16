import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { analyzeTicket, createTicket } from '../../services/api'; // Going up 2 levels

export default function CreateTicketScreen() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiResult, setAiResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!description.trim()) return Alert.alert("Error", "Please describe the issue.");

        setLoading(true);
        try {
            const data = await analyzeTicket(description);
            setAiResult(data);
        } catch (err) {
            Alert.alert("Connection Error", "Is the Python server running?");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await createTicket({
                description,
                urgency: aiResult.urgency,
                tenantId: 1 // Hardcoded for prototype
            });
            Alert.alert("Success", "Ticket submitted!");
            router.back();
        } catch (err) {
            Alert.alert("Error", "Could not save ticket.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white p-6">
            <Text className="text-xl font-bold text-slate-800 mb-4">{"What's wrong?"}</Text>

            <TextInput
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-lg h-40"
                placeholder="e.g. My kitchen sink is clogged..."
                multiline
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
            />

            {/* AI PREVIEW CARD */}
            {aiResult && (
                <View className={`mt-6 p-4 rounded-xl border ${aiResult.urgency === 'HIGH' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="analytics" size={24} color={aiResult.urgency === 'HIGH' ? '#ef4444' : '#3b82f6'} />
                        <Text className="font-bold text-lg text-slate-800">AI Verdict: {aiResult.urgency}</Text>
                    </View>
                    <Text className="text-slate-600 mt-2">
                        The system has flagged this as a <Text className="font-bold">{aiResult.urgency}</Text> priority issue.
                    </Text>
                </View>
            )}

            <TouchableOpacity
                className={`mt-8 p-4 rounded-xl items-center ${loading ? 'bg-slate-400' : 'bg-blue-900'}`}
                onPress={aiResult ? handleSubmit : handleAnalyze}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-lg font-bold">
                        {aiResult ? "CONFIRM & SUBMIT" : "ANALYZE ISSUE"}
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}