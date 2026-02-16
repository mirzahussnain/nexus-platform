import { Stack } from "expo-router";
import "./globals.css";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1e3a8a' }, // Nexus Primary
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {/* The "(tabs)" folder is hidden from the URL/Header */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Other screens will show the back arrow automatically */}
      <Stack.Screen name="ticket/[id]" options={{ title: 'Ticket Details' }} />
    </Stack>
  );
}

export default RootLayout
