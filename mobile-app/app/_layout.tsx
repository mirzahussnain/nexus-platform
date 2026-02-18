import { Stack, router } from "expo-router";
import "./globals.css";
import { useEffect, useState } from "react";
import { View } from "react-native";
import NexusSplash from "@/components/ui/NexusSplash";
import * as SplashScreen from "expo-splash-screen";
import { storage } from "@/utils/storage";
import { AuthProvider } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();
const AppLayout = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [splashStatus, setSplashStatus] = useState("Initializing Nexus...");

  useEffect(() => {
    async function prepare() {
      try {
        setSplashStatus("Loading Secure Assets...");

        // 1. Load Data
        const userToken = await storage.get('userToken');
        const hasLaunched = await storage.get('hasLaunched');
        const biometricsEnabled = await storage.get('biometricsEnabled');

        setSplashStatus("Verifying Identity...");
        await new Promise(resolve => setTimeout(resolve, 1200));

        setSplashStatus("Connecting to IoT Gateway...");
        await new Promise(resolve => setTimeout(resolve, 800));

        setSplashStatus("Launch Sequence Complete.");

        // 2. HIDE NATIVE SPLASH
        await SplashScreen.hideAsync();

        // 3. NAVIGATE
        if (hasLaunched === null) {
          router.replace('/(auth)/onboarding');
        } else if (!userToken) {
          router.replace('/(auth)/login');
        } else {
          if (biometricsEnabled === true) {
            router.replace('/(auth)/unlock');
          } else {
            router.replace('/(tabs)');
          }
        }

      } catch (e) {
        console.warn(e);
      } finally {
        setTimeout(() => {
          setIsAppReady(true);
        }, 500);
      }
    }

    prepare();
  }, []);

  return (
    <View style={{ flex: 1 }} className="bg-background">
      <Stack
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#1e3a8a' },
          animation: 'fade_from_bottom', // Optional: smooths the transition
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="ticket/[id]" options={{ title: 'Ticket Details' }} />
        <Stack.Screen name="ticket/create" options={{ title: 'Create Ticket', headerShown: false }} />
      </Stack>

      {!isAppReady && (
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999
        }}>
          <NexusSplash status={splashStatus} />
        </View>
      )}
    </View>
  );
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
