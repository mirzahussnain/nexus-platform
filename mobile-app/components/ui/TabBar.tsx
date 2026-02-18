import { View, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const buttonWidth = dimensions.width / state.routes.length;

    const onTabBarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        });
    };

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }]
        };
    });

    return (
        <View
            onLayout={onTabBarLayout}
            // CHANGED: mx-5 for better width. bg-white for clean look.
            className="absolute bottom-8 mx-5 flex-row justify-between items-center bg-background rounded-full shadow-lg shadow-black/10 py-3 px-1"
        >
            {/* THE SLIDING PILL (Nexus Navy) */}
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        height: dimensions.height - 10,
                        width: buttonWidth - 5,
                        position: 'absolute',
                        backgroundColor: '#1e3a8a', // The Active Background Color
                        borderRadius: 30,
                        left: 2, // Fine-tune alignment
                    }
                ]}
            />

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel || options.title || route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(index * buttonWidth, { duration: 1000 });

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.key}
                        routeName={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        label={label}
                    />
                );
            })}
        </View>
    );
}