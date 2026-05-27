import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PlanCard } from "../components/PlanCard";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { categories } from "../data/plans";
import { getCompletedPlans, getFavoritePlans, getUserPreferences } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function HomeScreen({ navigation }: ScreenProps<"Home">) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [defaultMinutes, setDefaultMinutes] = useState(25);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Settings")} style={styles.settingsButton}>
          <Text style={styles.settingsText}>Settings</Text>
        </Pressable>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavoritePlans().then(setFavoriteIds);
      getUserPreferences().then((preferences) => setDefaultMinutes(preferences.defaultPlanMinutes));
      getCompletedPlans().then((plans) => setCompletedCount(plans.length));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Start where you are"
        title="Recover the next part of your day."
        body="Choose what feels closest. You will get a calm plan with steps, a checklist, and a focus timer."
      />

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{defaultMinutes}m</Text>
          <Text style={styles.summaryLabel}>default reset</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{completedCount}</Text>
          <Text style={styles.summaryLabel}>completed</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{favoriteIds.length}</Text>
          <Text style={styles.summaryLabel}>favorites</Text>
        </View>
      </View>

      <View style={styles.reassurance}>
        <Text style={styles.reassuranceTitle}>No perfect restart needed</Text>
        <Text style={styles.reassuranceText}>These plans are built for real days: low energy, interruptions, and starting late.</Text>
      </View>

      <View style={styles.list}>
        {categories.map((category) => (
          <PlanCard
            key={category.id}
            title={category.name}
            subtitle={category.title}
            tag={favoriteIds.includes(category.planId) ? "Favorite" : undefined}
            minutes={category.minutes}
            onPress={() => navigation.navigate("TimeSelection", { categoryId: category.id })}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  settingsText: {
    color: colors.accentDark,
    fontSize: 15,
    fontWeight: "700"
  },
  summary: {
    flexDirection: "row",
    gap: spacing.sm
  },
  summaryItem: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  summaryValue: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  reassurance: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    gap: spacing.xs,
    padding: spacing.lg
  },
  reassuranceTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  reassuranceText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  list: {
    gap: spacing.md
  }
});
