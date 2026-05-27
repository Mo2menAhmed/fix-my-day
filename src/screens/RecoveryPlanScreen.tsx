import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChecklistRow } from "../components/ChecklistRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { getPlanByCategory } from "../data/plans";
import { useLanguage } from "../i18n/LanguageContext";
import { getChecklistProgress, getFavoritePlans, saveChecklistProgress, toggleFavoritePlan } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function RecoveryPlanScreen({ navigation, route }: ScreenProps<"RecoveryPlan">) {
  const { language, rowDirection, t, textDirection } = useLanguage();
  const plan = getPlanByCategory(route.params.categoryId, route.params.selectedMinutes, language);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    getFavoritePlans().then(setFavoriteIds);
    if (plan) {
      getChecklistProgress(plan.id).then(setCheckedItems);
    }
  }, [plan?.id]);

  const isFavorite = useMemo(() => {
    return plan ? favoriteIds.includes(plan.id) : false;
  }, [favoriteIds, plan]);

  if (!plan) {
    return (
      <Screen>
        <SectionHeader title={t.recovery.notFoundTitle} body={t.recovery.notFoundBody} />
      </Screen>
    );
  }

  const currentPlan = plan;

  async function toggleItem(item: string) {
    const next = checkedItems.includes(item)
      ? checkedItems.filter((value) => value !== item)
      : [...checkedItems, item];
    setCheckedItems(next);
    await saveChecklistProgress(currentPlan.id, next);
  }

  async function onFavoritePress() {
    const next = await toggleFavoritePlan(currentPlan.id);
    setFavoriteIds(next);
  }

  return (
    <Screen>
      <SectionHeader eyebrow={`${plan.totalTime} ${t.recovery.minutesReset}`} title={plan.title} body={plan.shortEncouragement} />

      <View style={styles.personalCard}>
        <Text style={[styles.personalLabel, textDirection]}>{t.recovery.builtFor}</Text>
        <Text style={[styles.personalTitle, textDirection]}>{t.recovery.chose}: {plan.category}</Text>
        <Text style={[styles.personalBody, textDirection]}>
          {t.recovery.bodyPrefix} {plan.totalTime} {t.recovery.bodySuffix}
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round((checkedItems.length / plan.checklistItems.length) * 100)}%` }
            ]}
          />
        </View>
        <Text style={[styles.progressText, textDirection]}>{checkedItems.length} / {plan.checklistItems.length} {t.recovery.checklistReady}</Text>
      </View>

      <View style={styles.quickWinCard}>
        <Text style={[styles.quickWinLabel, textDirection]}>{t.recovery.quickWin}</Text>
        <Text style={[styles.quickWinText, textDirection]}>{plan.quickWin}</Text>
      </View>

      <View style={styles.panel}>
        <Text style={[styles.panelTitle, textDirection]}>{t.recovery.stepsTitle}</Text>
        {plan.steps.map((step, index) => (
          <View key={step.id} style={[styles.step, rowDirection]}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stepText}>
              <Text style={[styles.stepTitle, textDirection]}>{step.title}</Text>
              <Text style={[styles.stepDetail, textDirection]}>{step.durationMinutes} {t.common.minutesShort}</Text>
              <Text style={[styles.stepDetail, textDirection]}>{step.detail}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={[styles.panelTitle, textDirection]}>{t.recovery.checklistTitle}</Text>
        {plan.checklistItems.map((item) => (
          <ChecklistRow
            key={item}
            label={item}
            checked={checkedItems.includes(item)}
            onToggle={() => toggleItem(item)}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label={t.recovery.startTimer}
          onPress={() =>
            navigation.navigate("FocusTimer", {
              planId: plan.id,
              minutes: plan.totalTime,
              categoryId: plan.categoryId
            })
          }
        />
        <PrimaryButton label={isFavorite ? t.recovery.removeFavorite : t.recovery.saveFavorite} variant="soft" onPress={onFavoritePress} />
      </View>
    </Screen>
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
  step: {
    flexDirection: "row",
    gap: spacing.md
  },
  stepNumber: {
    alignItems: "center",
    backgroundColor: colors.peach,
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  stepNumberText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800"
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
  stepDetail: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  personalCard: {
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    gap: spacing.sm,
    padding: spacing.lg
  },
  personalLabel: {
    color: colors.peach,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  personalTitle: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: "900"
  },
  personalBody: {
    color: colors.mist,
    fontSize: 14,
    lineHeight: 21
  },
  progressTrack: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 999,
    height: 8,
    overflow: "hidden"
  },
  progressFill: {
    backgroundColor: colors.peach,
    borderRadius: 999,
    height: 8
  },
  progressText: {
    color: colors.mist,
    fontSize: 13,
    fontWeight: "700"
  },
  quickWinCard: {
    backgroundColor: colors.peach,
    borderRadius: 8,
    gap: spacing.xs,
    padding: spacing.lg
  },
  quickWinLabel: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  quickWinText: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 25
  },
  actions: {
    gap: spacing.md
  }
});
