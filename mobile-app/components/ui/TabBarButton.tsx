import { Pressable, View } from 'react-native';
import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function TabBarButton({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    label
}: any) {
    // 0 = Inactive, 1 = Active
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]); // Slight pop
        const top = interpolate(scale.value, [0, 1], [0, -2]); // Slight lift
        return {
            transform: [{ scale: scaleValue }],
            top
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        // Text stays visible but maybe moves slightly
        const opacity = interpolate(scale.value, [0, 1], [0.6, 1]); // Gray -> White
        return { opacity };
    });

    // ICON MAPPING (Easy to change)
    const icons: any = {
        index: "home-variant",
        services: "briefcase-variant-outline",
        "smart-home": "lightning-bolt-outline",
        community: "account-group-outline"
    };

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center gap-1"
        >
            <Animated.View style={animatedIconStyle}>
                <MaterialCommunityIcons
                    name={icons[routeName] || "circle"}
                    size={26}
                    // CRITICAL: White when active (on blue pill), Navy when inactive (on white bar)
                    color={isFocused ? "#ffffff" : "#1e3a8a"}
                />
            </Animated.View>

            <Animated.Text
                style={[animatedTextStyle, { fontSize: 10, fontWeight: '700' }]}
                // CRITICAL: Same logic for text color
                className={isFocused ? "text-white" : "text-slate-500"}
            >
                {label}
            </Animated.Text>
        </Pressable>
    );
}