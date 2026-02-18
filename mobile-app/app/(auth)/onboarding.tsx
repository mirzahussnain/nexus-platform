import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { storage } from '../../utils/storage';
import { ONBOARDING_SLIDES } from '../../constants/Slides';
import SlidingDot from '@/components/ui/SlidingDot';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    // 1. HANDLE "GET STARTED"
    const finishOnboarding = async () => {
        // Save the flag so we don't show this again
        await storage.save('hasLaunched', true);
        // Navigate to Login
        router.replace('/(auth)/login');
    };

    const handleNext = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < ONBOARDING_SLIDES.length) {
            flatListRef.current?.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        } else {
            finishOnboarding();
        }
    };

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    return (
        <SafeAreaView className="flex-1 bg-nexus-primary">
            <FlatList
                ref={flatListRef}
                data={ONBOARDING_SLIDES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ width }} className="items-center justify-center px-8">
                        {/* ICON CIRCLE */}
                        <View className="w-64 h-64 bg-white/5 rounded-full items-center justify-center mb-10 border border-white/10">
                            <MaterialCommunityIcons name={item.icon as any} size={100} color={item.color} />
                        </View>

                        {/* TEXT */}
                        <Text className="text-3xl font-bold text-white text-center mb-4">
                            {item.title}
                        </Text>
                        <Text className="text-slate-400 text-center text-lg leading-6">
                            {item.description}
                        </Text>
                    </View>
                )}
            />

            {/* FOOTER (Dots + Button) */}
            <View className="h-40 px-8 justify-between pb-8">

                {/* DOT INDICATORS */}
                <View className="flex-row justify-center mb-8">
                    {ONBOARDING_SLIDES.map((_, index) => (
                        <SlidingDot key={index} index={index} currentIndex={currentIndex} />
                    ))}
                </View>

                {/* BUTTON */}
                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-nexus-secondary py-4 rounded-xl items-center shadow-lg shadow-blue-900/50"
                >
                    <Text className="text-white font-bold text-lg">
                        {currentIndex === ONBOARDING_SLIDES.length - 1 ? "Get Started" : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}