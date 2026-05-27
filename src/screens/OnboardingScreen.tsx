import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { getUserPreferences, saveUserPreferences } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

const points = [
  {
    title: "Pick what went wrong",
    body: "Choose the closest messy-day situation. No journaling marathon required."
  },
  {
    title: "Get a short rescue plan",
    body: "Each plan gives calm steps, a checklist, and a realistic time box."
  },
  {
    title: "Finish with a tiny reflection",
    body: "Save what helped so future resets feel easier to trust."
  }
];

export function OnboardingScreen({ navigation }: ScreenProps<"Onboarding">) {
  async function finishOnboarding() {
    const preferences = await getUserPreferences();
    await saveUserPreferences({ ...preferences, hasCompletedOnboarding: true });
    navigation.replace("Home");
  }

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.mark}>
            <Text style={styles.markText}>F</Text>
          </View>
          <Text style={styles.title}>Fix My Day</Text>
          <Text style={styles.body}>
            A small recovery plan for the days that got away from you.
          </Text>
        </View>

        <View style={styles.steps}>
          {points.map((point, index) => (
            <View key={point.title} style={styles.step}>
              <View style={styles.number}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepText}>
                <Text style={styles.stepTitle}>{point.title}</Text>
                <Text style={styles.stepBody}>{point.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <PrimaryButton label="Start a reset" onPress={finishOnboarding} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.xl,
    justifyContent: "space-between"
  },
  hero: {
    gap: spacing.md,
    paddingTop: spacing.xxl
  },
  mark: {
    alignItems: "center",
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    height: 64,
    justifyContent: "center",
    width: 64
  },
  markText: {
    color: colors.surface,
    fontSize: 34,
    fontWeight: "900"
  },
  title: {
    color: colors.ink,
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 48
  },
  body: {
    color: colors.muted,
    fontSize: 18,
    lineHeight: 26
  },
  steps: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.lg,
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
    height: 32,
    justifyContent: "center",
    width: 32
  },
  numberText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  stepText: {
    flex: 1,
    gap: spacing.xs
  },
  stepTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  stepBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  }
});
