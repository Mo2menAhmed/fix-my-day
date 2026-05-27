import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "./src/components/ErrorBoundary";
import { FocusTimerScreen } from "./src/screens/FocusTimerScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { OnboardingScreen } from "./src/screens/OnboardingScreen";
import { PremiumScreen } from "./src/screens/PremiumScreen";
import { RecoveryPlanScreen } from "./src/screens/RecoveryPlanScreen";
import { ReflectionScreen } from "./src/screens/ReflectionScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { TimeSelectionScreen } from "./src/screens/TimeSelectionScreen";
import { getUserPreferences } from "./src/storage/appStorage";
import { colors } from "./src/theme/colors";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    console.info(`[FixMyDay] App startup on ${Platform.OS}`);
    getUserPreferences()
      .then((preferences) => {
        const nextRoute = preferences.hasCompletedOnboarding ? "Home" : "Onboarding";
        console.info(`[FixMyDay] Initial route resolved: ${nextRoute}`);
        setInitialRouteName(nextRoute);
      })
      .catch((error) => {
        console.error("[FixMyDay] Failed to read preferences, using onboarding fallback", error);
        setInitialRouteName("Onboarding");
      });
  }, []);

  if (!initialRouteName) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Fix My Day</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{
              headerStyle: { backgroundColor: colors.background },
              headerShadowVisible: false,
              headerTintColor: colors.ink,
              headerTitleStyle: { fontWeight: "700" },
              contentStyle: { backgroundColor: colors.background }
            }}
          >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Fix My Day" }} />
            <Stack.Screen name="TimeSelection" component={TimeSelectionScreen} options={{ title: "Choose time" }} />
            <Stack.Screen name="RecoveryPlan" component={RecoveryPlanScreen} options={{ title: "Recovery plan" }} />
            <Stack.Screen name="FocusTimer" component={FocusTimerScreen} options={{ title: "Focus timer" }} />
            <Stack.Screen name="Reflection" component={ReflectionScreen} options={{ title: "Reflect" }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
            <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: "Premium" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center"
  },
  loadingText: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900"
  }
});
