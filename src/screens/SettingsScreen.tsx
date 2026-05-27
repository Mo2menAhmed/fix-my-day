import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { useLanguage } from "../i18n/LanguageContext";
import { languageLabels, type LanguageCode } from "../i18n/translations";
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
  const { language, setLanguage, t, textDirection } = useLanguage();
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

  async function updateLanguage(nextLanguage: LanguageCode) {
    await setLanguage(nextLanguage);
    setPreferences((current) => ({ ...current, language: nextLanguage }));
  }

  function confirmClearProgress() {
    Alert.alert(t.settings.clearTitle, t.settings.clearBody, [
      { text: t.settings.cancel, style: "cancel" },
      {
        text: t.settings.clear,
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
        title={t.settings.title}
        body={t.settings.body}
      />

      <View style={styles.panel}>
        <Text style={[styles.panelTitle, textDirection]}>{t.settings.languageTitle}</Text>
        <View style={styles.languageOptions}>
          {(["en", "ar"] as LanguageCode[]).map((option) => (
            <Pressable
              key={option}
              onPress={() => updateLanguage(option)}
              style={[styles.languageButton, language === option && styles.languageButtonSelected]}
            >
              <Text style={[styles.languageText, language === option && styles.languageTextSelected]}>
                {languageLabels[option]}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.panel}>
        <SettingSwitch
          label={t.settings.gentleMode}
          value={preferences.gentleMode}
          onValueChange={(value) => updatePreferences({ ...preferences, gentleMode: value })}
        />
        <SettingSwitch
          label={t.settings.soundCues}
          value={preferences.soundEnabled}
          onValueChange={(value) => updatePreferences({ ...preferences, soundEnabled: value })}
        />
      </View>

      <View style={styles.panel}>
        <Text style={[styles.panelTitle, textDirection]}>{t.settings.defaultLength}</Text>
        <Text style={[styles.panelBody, textDirection]}>{t.settings.defaultLengthBody}</Text>
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
        <Text style={[styles.panelTitle, textDirection]}>{t.settings.localProgress}</Text>
        {completedCount === 0 && favoriteCount === 0 ? (
          <Text style={[styles.stat, textDirection]}>{t.settings.noSessions}</Text>
        ) : (
          <>
            <Text style={[styles.stat, textDirection]}>{completedCount} {t.settings.completedPlans}</Text>
            <Text style={[styles.stat, textDirection]}>{favoriteCount} {t.settings.favoritePlans}</Text>
          </>
        )}
      </View>

      <View style={styles.panel}>
        <Text style={[styles.panelTitle, textDirection]}>{t.settings.premiumTitle}</Text>
        <Text style={[styles.panelBody, textDirection]}>{t.settings.premiumBody}</Text>
        <PrimaryButton label={t.settings.previewPremium} variant="soft" onPress={() => navigation.navigate("Premium")} />
      </View>

      <PrimaryButton
        label={t.settings.showOnboarding}
        variant="soft"
        onPress={async () => {
          await updatePreferences({ ...preferences, hasCompletedOnboarding: false });
          navigation.replace("Onboarding");
        }}
      />
      <PrimaryButton label={t.settings.clearProgress} variant="ghost" onPress={confirmClearProgress} />
    </Screen>
  );
}

type SettingSwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function SettingSwitch({ label, value, onValueChange }: SettingSwitchProps) {
  const { rowDirection, textDirection } = useLanguage();

  return (
    <View style={[styles.switchRow, rowDirection]}>
      <Text style={[styles.switchLabel, textDirection]}>{label}</Text>
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
  languageOptions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  languageButton: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: spacing.md
  },
  languageButtonSelected: {
    backgroundColor: colors.accentDark,
    borderColor: colors.accentDark
  },
  languageText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  languageTextSelected: {
    color: colors.surface
  },
  switchRow: {
    alignItems: "center",
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
