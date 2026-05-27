import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PlanCard } from "../components/PlanCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { getPlanByCategory } from "../data/plans";
import { useLanguage } from "../i18n/LanguageContext";
import { getUserPreferences } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

const options = [10, 15, 20, 25, 30, 35, 45];

export function TimeSelectionScreen({ navigation, route }: ScreenProps<"TimeSelection">) {
  const { language, t, textDirection } = useLanguage();
  const plan = getPlanByCategory(route.params.categoryId, undefined, language);
  const [selectedMinutes, setSelectedMinutes] = useState(plan?.totalTime ?? 25);

  useEffect(() => {
    getUserPreferences().then((preferences) => {
      setSelectedMinutes(preferences.defaultPlanMinutes || plan?.totalTime || 25);
    });
  }, [plan?.totalTime]);

  const availableOptions = useMemo(() => {
    const merged = new Set([...options, plan?.totalTime ?? 25]);
    return Array.from(merged).sort((a, b) => a - b);
  }, [plan?.totalTime]);

  if (!plan) {
    return (
      <Screen>
        <SectionHeader title={t.recovery.notFoundTitle} body={t.recovery.notFoundBody} />
      </Screen>
    );
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow={plan.category}
        title={t.timeSelection.headerTitle}
        body={t.timeSelection.headerBody}
      />

      <View style={styles.preview}>
        <Text style={[styles.previewTitle, textDirection]}>{plan.title}</Text>
        <Text style={[styles.previewText, textDirection]}>{plan.categoryPrompt}</Text>
        <Text style={[styles.quickWin, textDirection]}>{t.timeSelection.quickWin}: {plan.quickWin}</Text>
        <Text style={[styles.previewText, textDirection]}>
          {plan.steps.length} {t.timeSelection.planDetails} {plan.totalTime} {t.common.minutesShort}.
        </Text>
      </View>

      <View style={styles.options}>
        {availableOptions.map((minutes) => (
          <PlanCard
            key={minutes}
            selected={selectedMinutes === minutes}
            title={`${minutes} ${t.common.minutesShort}`}
            subtitle={minutes < plan.totalTime ? t.timeSelection.compressed : minutes === plan.totalTime ? t.timeSelection.recommended : t.timeSelection.roomy}
            onPress={() => setSelectedMinutes(minutes)}
          />
        ))}
      </View>

      <PrimaryButton
        label={t.timeSelection.button}
        onPress={() =>
          navigation.navigate("RecoveryPlan", {
            categoryId: route.params.categoryId,
            selectedMinutes
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  preview: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.lg
  },
  previewTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  previewText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  quickWin: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20
  },
  options: {
    gap: spacing.md
  }
});
