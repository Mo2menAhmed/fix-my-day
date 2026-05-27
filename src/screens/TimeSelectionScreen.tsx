import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PlanCard } from "../components/PlanCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { getPlanByCategory } from "../data/plans";
import { getUserPreferences } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

const options = [10, 15, 20, 25, 30, 35, 45];

export function TimeSelectionScreen({ navigation, route }: ScreenProps<"TimeSelection">) {
  const plan = getPlanByCategory(route.params.categoryId);
  const [selectedMinutes, setSelectedMinutes] = useState(plan?.totalTime ?? 25);

  useEffect(() => {
    getUserPreferences().then((preferences) => {
      setSelectedMinutes(preferences.defaultPlanMinutes || plan?.totalTime || 25);
    });
  }, []);

  const availableOptions = useMemo(() => {
    const merged = new Set([...options, plan?.totalTime ?? 25]);
    return Array.from(merged).sort((a, b) => a - b);
  }, [plan?.totalTime]);

  if (!plan) {
    return (
      <Screen>
        <SectionHeader title="Plan not found" body="Go back and choose another recovery category." />
      </Screen>
    );
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow={plan.category}
        title="Choose a realistic reset"
        body="The plan adapts to the time you have. Pick the option you would actually do today."
      />

      <View style={styles.preview}>
        <Text style={styles.previewTitle}>{plan.title}</Text>
        <Text style={styles.previewText}>{plan.steps.length} steps, {plan.checklistItems.length} checklist items, designed for {plan.totalTime} minutes.</Text>
      </View>

      <View style={styles.options}>
        {availableOptions.map((minutes) => (
          <PlanCard
            key={minutes}
            selected={selectedMinutes === minutes}
            title={`${minutes} minutes`}
            subtitle={minutes < plan.totalTime ? "Compressed rescue plan" : minutes === plan.totalTime ? "Recommended pace" : "Roomier recovery pace"}
            onPress={() => setSelectedMinutes(minutes)}
          />
        ))}
      </View>

      <PrimaryButton
        label="Build my plan"
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
  options: {
    gap: spacing.md
  }
});
