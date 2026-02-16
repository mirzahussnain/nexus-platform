import { LayoutChangeEvent, View } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarButton from './TabBarButton';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { buildHref } = useLinkBuilder();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const buttonWidth = dimensions.width / state.routes.length;

    const onTabBarLayout = (e: LayoutChangeEvent) => {
        setDimensions({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })
    }

    const tabPositionX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: tabPositionX.value
            }]
        }
    })

    useEffect(() => {
        tabPositionX.value = withSpring(state.index * buttonWidth, { duration: 800 })
    }, [state.index, buttonWidth, tabPositionX])
    return (
        <View onLayout={onTabBarLayout} className="absolute bottom-[50] flex-row justify-between items-center gap-5 bg-white py-4 mx-[80] rounded-[35] shadow-black shadow-lg px-3" >
            <Animated.View style={[animatedStyle, {
                height: dimensions.height - 15,
                width: buttonWidth - 25,
            }]}
                className="absolute bg-nexus-primary rounded-[30] mx-[12]" />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {

                    tabPositionX.value = withSpring(index * buttonWidth, { duration: 1000 })
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
                        href={buildHref(route.name, route.params) || ''}
                        options={options}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        label={label}
                        route={route}
                        isFocused={isFocused} />


                );
            })}
        </View>
    );
}
export default TabBar