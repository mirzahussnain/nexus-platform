import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";

export interface TabBarButtonProps {
    route: NavigationRoute<ParamListBase, string>,
    href: string,
    isFocused: boolean,
    onPress: () => void,
    onLongPress: () => void,
    label: any,
    options: BottomTabNavigationOptions,
}