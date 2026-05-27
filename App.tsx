import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "./src/components/ErrorBoundary";
import { LanguageProvider, useLanguage } from "./src/i18n/LanguageContext";
import type { LanguageCode } from "./src/i18n/translations";
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

type BootstrapState = {
  initialRouteName: keyof RootStackParamList;
  language: LanguageCode;
};

export default function App() {
  const [bootstrap, setBootstrap] = useState<BootstrapState | null>(null);

  useEffect(() => {
    console.info(`[FixMyDay] App startup on ${Platform.OS}`);
    getUserPreferences()
      .then((preferences) => {
        const nextRoute = preferences.hasCompletedOnboarding ? "Home" : "Onboarding";
        console.info(`[FixMyDay] Initial route resolved: ${nextRoute}`);
        setBootstrap({ initialRouteName: nextRoute, language: preferences.language });
      })
      .catch((error) => {
        console.error("[FixMyDay] Failed to read preferences, using onboarding fallback", error);
        setBootstrap({ initialRouteName: "Onboarding", language: "en" });
      });
  }, []);

  if (!bootstrap) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Fix My Day</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <LanguageProvider initialLanguage={bootstrap.language}>
        <SafeAreaProvider>
          <AppNavigator initialRouteName={bootstrap.initialRouteName} />
        </SafeAreaProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

function AppNavigator({ initialRouteName }: { initialRouteName: keyof RootStackParamList }) {
  const { language } = useLanguage();
  const title = language === "ar"
    ? {
        home: "Fix My Day",
        time: "اختيار الوقت",
        plan: "خطة الاستعادة",
        timer: "مؤقت التركيز",
        reflection: "تأمل",
        settings: "الإعدادات",
        premium: "بريميوم"
      }
    : {
        home: "Fix My Day",
        time: "Choose time",
        plan: "Recovery plan",
        timer: "Focus timer",
        reflection: "Reflect",
        settings: "Settings",
        premium: "Premium"
      };

  return (
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: title.home }} />
        <Stack.Screen name="TimeSelection" component={TimeSelectionScreen} options={{ title: title.time }} />
        <Stack.Screen name="RecoveryPlan" component={RecoveryPlanScreen} options={{ title: title.plan }} />
        <Stack.Screen name="FocusTimer" component={FocusTimerScreen} options={{ title: title.timer }} />
        <Stack.Screen name="Reflection" component={ReflectionScreen} options={{ title: title.reflection }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: title.settings }} />
        <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: title.premium }} />
      </Stack.Navigator>
    </NavigationContainer>
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
