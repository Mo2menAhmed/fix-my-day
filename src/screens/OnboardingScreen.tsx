import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { useLanguage } from "../i18n/LanguageContext";
import { getUserPreferences, saveUserPreferences } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function OnboardingScreen({ navigation }: ScreenProps<"Onboarding">) {
  const { rowDirection, t, textDirection } = useLanguage();

  async function finishOnboarding() {
    const preferences = await getUserPreferences();
    await saveUserPreferences({ ...preferences, hasCompletedOnboarding: true });
    navigation.replace("Home");
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.mark}>
            <Text style={styles.markText}>F</Text>
          </View>
          <Text style={[styles.title, textDirection]}>{t.onboarding.title}</Text>
          <Text style={[styles.body, textDirection]}>{t.onboarding.body}</Text>
        </View>

        <View style={styles.promiseCard}>
          <Text style={[styles.promiseLabel, textDirection]}>{t.onboarding.firstActionLabel}</Text>
          <Text style={[styles.promiseText, textDirection]}>{t.onboarding.firstAction}</Text>
        </View>

        <View style={styles.steps}>
          {t.onboarding.points.map((point, index) => (
            <View key={point.title} style={[styles.step, rowDirection]}>
              <View style={styles.number}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepText}>
                <Text style={[styles.stepTitle, textDirection]}>{point.title}</Text>
                <Text style={[styles.stepBody, textDirection]}>{point.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <PrimaryButton label={t.onboarding.button} onPress={finishOnboarding} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg
  },
  hero: {
    gap: spacing.md,
    paddingTop: spacing.lg
  },
  mark: {
    alignItems: "center",
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    width: 56
  },
  markText: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: "900"
  },
  title: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 39
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23
  },
  promiseCard: {
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    gap: spacing.xs,
    padding: spacing.lg
  },
  promiseLabel: {
    color: colors.peach,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  promiseText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 24
  },
  steps: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  step: {
    flexDirection: "row",
    gap: spacing.md
  },
  number: {
    alignItems: "center",
    backgroundColor: colors.peach,
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  numberText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  },
  stepText: {
    flex: 1,
    gap: spacing.xs
  },
  stepTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  stepBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  }
});
