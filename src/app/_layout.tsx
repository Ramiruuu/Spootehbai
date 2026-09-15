import {
    Stack,
    useRootNavigationState,
    useRouter,
    useSegments,
} from "expo-router";
import { useEffect } from "react";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AuthProvider, useAuth } from "@/features/auth/hooks/useAuth";

function AppGate() {
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user?.id && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user?.id && inAuthGroup) {
      router.replace("/explore");
    }
  }, [isLoading, rootNavigationState?.key, router, segments, user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="explore" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppGate />
    </AuthProvider>
  );
}
