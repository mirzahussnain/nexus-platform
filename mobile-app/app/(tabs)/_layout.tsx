import { Tabs } from 'expo-router';
import TabBar from '@/components/ui/TabBar';
import { Ionicons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';

cssInterop(Ionicons, {
    className: {
        target: 'style',
        nativeStyleToProp: { color: true },
    },
});

const TabLayout = () => {
    return (
        <Tabs tabBar={props => <TabBar {...props} />}>
            {/* TAB 1: HOME */}
            <Tabs.Screen
                name="index" // This points to app/(tabs)/index.tsx
                options={{
                    title: 'Home',

                }}
            />
            {/* TAB 2: HISTORY */}
            <Tabs.Screen
                name="history" // This points to app/(tabs)/history.tsx
                options={{
                    title: 'History',

                }}
            />
            {/* TAB 3: PROFILE */}
            <Tabs.Screen
                name="profile" // This points to app/(tabs)/profile.tsx
                options={{
                    title: 'Profile',
                }}
            />
        </Tabs>

    );
}

export default TabLayout