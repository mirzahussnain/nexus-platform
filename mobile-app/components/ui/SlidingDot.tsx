import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const SlidingDot = ({ index, currentIndex }: { index: number, currentIndex: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const isActive = currentIndex === index;
        return {
            width: withTiming(isActive ? 32 : 8, { duration: 300 }), // Animate Width (w-8 vs w-2)
            backgroundColor: withTiming(isActive ? '#06b6d4' : '#475569', { duration: 300 }), // Animate Color (Cyan vs Slate)
        };
    });

    return (
        <Animated.View
            className="h-2 rounded-full mx-1"
            style={animatedStyle}
        />
    );
};

export default SlidingDot;
