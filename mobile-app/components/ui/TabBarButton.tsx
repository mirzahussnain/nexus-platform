import { Ionicons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";

import { TabBarButtonProps } from "@/interfaces/prop-types";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

const TabBarButton = ({ route, href, isFocused, onPress, onLongPress, label, options }: TabBarButtonProps) => {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, { duration: 350 })
    }, [scale, isFocused])

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return {
            opacity: opacity
        }
    })
    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
        const top = interpolate(scale.value, [0, 1], [0, 9]);
        return {
            transform: [{
                scale: scaleValue
            }],
            top
        }
    })
    return (
        <PlatformPressable
            key={route.key}
            href={href}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className='flex-1 items-center justify-center gap-2'
        >
            <Animated.View style={animatedIconStyle} >
                <Ionicons name={route.name === 'index' ? 'home' : route.name === 'history' ? 'time' : 'person'} size={26} className={isFocused ? "text-white" : "text-nexus-primary"} />
            </Animated.View>
            <Animated.Text style={[animatedTextStyle, { fontSize: 12 }]} className={`duration-1000 ${isFocused ? 'text-white' : 'text-nexus-primary'}`}>
                {label}
            </Animated.Text>
        </PlatformPressable>
    );
}

export default TabBarButton
