import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import {
  clearProgress,
  defaultPreferences,
  getCompletedPlans,
  getFavoritePlans,
  getUserPreferences,
  saveUserPreferences
} from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";
import type { UserPreferences } from "../types/recovery";

const minuteOptions = [10, 15, 20, 25, 30, 35, 45];

export function SettingsScreen({ navigation }: ScreenProps<"Settings">) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [completedCount, setCompletedCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserPreferences().then(setPreferences);
      getCompletedPlans().then((plans) => setCompletedCount(plans.length));
      getFavoritePlans().then((plans) => setFavoriteCount(plans.length));
    });

    return unsubscribe;
  }, [navigation]);

  async function updatePreferences(next: UserPreferences) {
    setPreferences(next);
    await saveUserPreferences(next);
  }

  function confirmClearProgress() {
    Alert.alert("Clear progress?", "Completed and favorite plans will be removed from this device.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearProgress();
          setCompletedCount(0);
          setFavoriteCount(0);
        }
      }
    ]);
  }

  return (
    <Screen>
      <SectionHeader
        title="Settings"
        body="Your plans stay local on this device. Adjust the default reset length, review progress, or preview future premium ideas."
      />

      <View style={styles.panel}>
        <SettingSwitch
          label="Gentle mode"
          value={preferences.gentleMode}
          onValueChange={(value) => updatePreferences({ ...preferences, gentleMode: value })}
        />
        <SettingSwitch
          label="Sound cues"
          value={preferences.soundEnabled}
          onValueChange={(value) => updatePreferences({ ...preferences, soundEnabled: value })}
        />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Default plan length</Text>
        <Text style={styles.panelBody}>Used as the first suggestion before each recovery plan.</Text>
        <View style={styles.minutes}>
          {minuteOptions.map((minutes) => (
            <Pressable
              key={minutes}
              onPress={() => updatePreferences({ ...preferences, defaultPlanMinutes: minutes })}
              style={[
                styles.minuteButton,
                preferences.defaultPlanMinutes === minutes && styles.minuteButtonSelected
              ]}
            >
              <Text
                style={[
                  styles.minuteText,
                  preferences.defaultPlanMinutes === minutes && styles.minuteTextSelected
                ]}
              >
                {minutes}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Local progress</Text>
        {completedCount === 0 && favoriteCount === 0 ? (
          <Text style={styles.stat}>No saved sessions yet. Complete a reset and it will show up here.</Text>
        ) : (
          <>
            <Text style={styles.stat}>{completedCount} completed plans</Text>
            <Text style={styles.stat}>{favoriteCount} favorite plans</Text>
          </>
        )}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Premium placeholder</Text>
        <Text style={styles.panelBody}>Payments are not connected. This screen is ready for future upgrade testing.</Text>
        <PrimaryButton label="Preview premium" variant="soft" onPress={() => navigation.navigate("Premium")} />
      </View>

      <PrimaryButton
        label="Show onboarding again"
        variant="soft"
        onPress={async () => {
          await updatePreferences({ ...preferences, hasCompletedOnboarding: false });
          navigation.replace("Onboarding");
        }}
      />
      <PrimaryButton label="Clear local progress" variant="ghost" onPress={confirmClearProgress} />
    </Screen>
  );
}

type SettingSwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function SettingSwitch({ label, value, onValueChange }: SettingSwitchProps) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        onValueChange={onValueChange}
        thumbColor={value ? colors.surface : colors.surfaceMuted}
        trackColor={{ false: colors.line, true: colors.accent }}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  panelTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800"
  },
  panelBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 44
  },
  switchLabel: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700"
  },
  minutes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  minuteButton: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 54
  },
  minuteButtonSelected: {
    backgroundColor: colors.accentDark,
    borderColor: colors.accentDark
  },
  minuteText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  minuteTextSelected: {
    color: colors.surface
  },
  stat: {
    color: colors.muted,
    fontSize: 16
  }
});
