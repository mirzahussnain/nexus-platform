import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    FadeIn
} from 'react-native-reanimated';

interface NexusSplashProps {
    status: string; // "Loading Fonts...", "Authenticating..."
}

export default function NexusSplash({ status }: NexusSplashProps) {
    // --- 1. ANIMATION VALUES ---
    const scaleValue = useSharedValue(1);
    const spinValue = useSharedValue(0);
    const pulseValue = useSharedValue(1);
    const shimmerValue = useSharedValue(-100);

    useEffect(() => {
        // Logo Heartbeat
        scaleValue.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
                withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
            ), -1, true
        );

        // Spin: Slower, more premium (6s)
        spinValue.value = withRepeat(
            withTiming(360, { duration: 6000, easing: Easing.linear }), -1
        );

        // Pulse
        pulseValue.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 1500 }),
                withTiming(1, { duration: 1500 })
            ), -1, true
        );

        // Shimmer
        shimmerValue.value = withRepeat(
            withTiming(100, { duration: 1500, easing: Easing.linear }), -1
        );
    }, []);

    // --- 2. STYLES ---
    const logoStyle = useAnimatedStyle(() => ({ transform: [{ scale: scaleValue.value }] }));
    const spinStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spinValue.value}deg` }] }));
    const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulseValue.value }], opacity: 0.5 / pulseValue.value }));
    const shimmerStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shimmerValue.value }] }));

    return (
        <LinearGradient
            colors={['#0f172a', '#1e3a8a', '#172554']}
            className="flex-1 items-center justify-center relative"
        >
            {/* --- BACKGROUND DECOR (Using Semantic Classes) --- */}

            {/* Top Left: Uses secondary brand color */}
            <View className="absolute -top-20 -left-20 w-80 h-80 bg-nexus-secondary rounded-full opacity-10 blur-3xl" />

            {/* Bottom Right: Uses your primary brand color */}
            <View className="absolute -bottom-20 -right-20 w-80 h-80 bg-nexus-primary rounded-full opacity-20 blur-3xl" />

            {/* Texture Overlay */}
            <View className="absolute inset-0 bg-black/10" />

            {/* --- CENTRAL LOGO SECTION --- */}
            <View className="items-center gap-y-8">

                {/* LOGO CONTAINER */}
                <View className="w-40 h-40 items-center justify-center relative">

                    {/* 1. Pulsing Outer Circle (Brand Secondary) */}
                    <Animated.View
                        className="absolute w-full h-full rounded-full border border-nexus-secondary/30"
                        style={pulseStyle}
                    />

                    {/* 2. Spinning Ring (Brand Accent/Cyan) */}
                    <Animated.View
                        className="absolute w-[90%] h-[90%] rounded-full border border-transparent border-t-nexus-accent/50 border-r-nexus-accent/50"
                        style={spinStyle}
                    />

                    {/* 3. The Logo Image */}
                    <Animated.View style={logoStyle}>
                        <Image

                            source={require('../../assets/images/nexus-logo.png')}
                            className="w-28 h-28"
                            resizeMode="contain"
                        />
                    </Animated.View>
                </View>

                {/* TEXT BRANDING */}
                <View className="items-center mt-2">
                    {/* Text-Text-Primary (Slate-100 in Dark Mode) */}
                    <Text className="text-5xl font-extrabold text-white tracking-widest drop-shadow-lg">
                        NEXUS
                    </Text>
                    {/* Text-Text-Secondary (Slate-400) + Nexus Accent for flair */}
                    <Text className="text-xs font-bold text-nexus-accent tracking-[4px] mt-1 uppercase">
                        AI Housing Solutions
                    </Text>
                </View>
            </View>

            {/* --- FOOTER SECTION --- */}
            <View className="absolute bottom-12 items-center w-full">
                {/* DYNAMIC STATUS TEXT */}
                <Animated.Text
                    key={status}
                    entering={FadeIn.duration(300)}
                    className="text-white/60 text-xs font-mono mb-4 tracking-widest uppercase"
                >
                    {status}
                </Animated.Text>
                {/* LOADING BAR */}
                <View className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
                    <Animated.View
                        // Bar fills with Nexus Secondary (Blue-500)
                        className="w-[40%] h-full bg-nexus-secondary rounded-full"
                        style={shimmerStyle}
                    />
                </View>

                {/* SECURITY BADGE */}
                <View className="flex-row items-center gap-2 opacity-70 mb-1">
                    <MaterialCommunityIcons name="shield-check" size={14} color="#06b6d4" />
                    <Text className="text-text-secondary text-xs font-medium tracking-wide">
                        Secure & ISO 27001
                    </Text>
                </View>

                <Text className="text-white/20 text-[10px] font-mono absolute -bottom-8">
                    v1.0.0-beta
                </Text>
            </View>

        </LinearGradient>
    );
}