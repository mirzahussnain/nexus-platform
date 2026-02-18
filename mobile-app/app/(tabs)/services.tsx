import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    useAnimatedScrollHandler,
} from 'react-native-reanimated';

// Components
import RentView from '@/components/services/RentView';
import TicketsView from '@/components/services/TicketsView';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PAGES = [{ key: 'RENT' }, { key: 'TICKETS' }] as const;

export default function ServicesScreen() {
    const { width } = useWindowDimensions();
    const flatListRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Shared value for scroll-driven animations
    const scrollX = useSharedValue(0);

    // Track scroll position
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    // Animated pill style for segmented control
    const pillStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            scrollX.value,
            [0, width],
            [0, (width - 48) / 2]
        );
        return {
            transform: [{ translateX: withSpring(translateX, { duration: 600 }) }],
        };
    });

    // Tab press → scroll to page
    const goToPage = useCallback((index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
    }, []);

    // Sync active tab when swiping ends
    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index ?? 0);
        }
    }, []);

    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View className="flex-1 bg-gray-50">
            <SafeAreaView className="flex-1">

                {/* --- 1. HEADER --- */}
                <View className="px-6 pt-4 pb-4">
                    <Text className="text-slate-900 text-3xl font-bold">Services</Text>
                    <Text className="text-slate-500 text-sm">Manage your tenancy</Text>
                </View>

                {/* --- 2. ANIMATED SEGMENTED CONTROL --- */}
                <View className="px-6 mb-6">
                    <View className="flex-row bg-slate-200 p-1 rounded-2xl overflow-hidden">

                        {/* Animated Pill Background */}
                        <Animated.View
                            style={[pillStyle, {
                                position: 'absolute',
                                top: 4,
                                left: 4,
                                width: '50%',
                                height: '85%',
                                backgroundColor: '#fff',
                                borderRadius: 12,
                                shadowColor: '#000',
                                shadowOpacity: 0.05,
                                shadowRadius: 4,
                                elevation: 2,
                            }]}
                        />

                        {/* RENT TAB */}
                        <TouchableOpacity
                            onPress={() => goToPage(0)}
                            className="flex-1 py-3 rounded-xl items-center flex-row justify-center gap-2 z-10"
                        >
                            <MaterialCommunityIcons
                                name="credit-card-outline"
                                size={20}
                                color={activeIndex === 0 ? '#0f172a' : '#64748b'}
                            />
                            <Text className={`font-bold ${activeIndex === 0 ? 'text-slate-900' : 'text-slate-500'}`}>
                                Rent & Bills
                            </Text>
                        </TouchableOpacity>

                        {/* TICKETS TAB */}
                        <TouchableOpacity
                            onPress={() => goToPage(1)}
                            className="flex-1 py-3 rounded-xl items-center flex-row justify-center gap-2 z-10"
                        >
                            <MaterialCommunityIcons
                                name="wrench-outline"
                                size={20}
                                color={activeIndex === 1 ? '#0f172a' : '#64748b'}
                            />
                            <Text className={`font-bold ${activeIndex === 1 ? 'text-slate-900' : 'text-slate-500'}`}>
                                Repairs
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- 3. SWIPEABLE PAGES --- */}
                <AnimatedFlatList
                    ref={flatListRef}
                    data={PAGES}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item: any) => item.key}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    renderItem={({ item }: any) =>
                        item.key === 'RENT'
                            ? <RentView width={width} />
                            : <TicketsView width={width} />
                    }
                />

            </SafeAreaView>
        </View>
    );
}