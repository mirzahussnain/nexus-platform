import { Tabs } from 'expo-router';
import TabBar from '@/components/ui/TabBar'; // Import your custom component

export default function TabLayout() {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false, animation: "shift" }}
        >
            {/* 1. HOME: Dashboard */}
            <Tabs.Screen name="index" options={{ title: 'Home' }} />

            {/* 2. SERVICES: The "Business" Tab (Rent & Tickets) */}
            <Tabs.Screen name="services" options={{ title: 'Services' }} />

            {/* 3. SMART HOME: The "Innovation" Tab (IoT) */}
            <Tabs.Screen name="smart-home" options={{ title: 'Smart Home' }} />

            {/* 4. COMMUNITY: The "Social" Tab */}
            <Tabs.Screen name="community" options={{ title: 'Community' }} />
        </Tabs>
    );
}