import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { LanguageSelector } from "../components/LanguageSelector";
import { PlanCard } from "../components/PlanCard";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { getCategories, getPlanById } from "../data/plans";
import { useLanguage } from "../i18n/LanguageContext";
import { getCompletedPlans, getFavoritePlans, getUserPreferences } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";
import type { CompletedPlan } from "../types/recovery";

export function HomeScreen({ navigation }: ScreenProps<"Home">) {
  const { language, rowDirection, t, textDirection } = useLanguage();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [defaultMinutes, setDefaultMinutes] = useState(25);
  const [completedPlans, setCompletedPlans] = useState<CompletedPlan[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("Settings")} style={styles.settingsButton}>
          <Text style={styles.settingsText}>{t.common.settings}</Text>
        </Pressable>
      )
    });
  }, [navigation, t.common.settings]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getFavoritePlans().then(setFavoriteIds);
      getUserPreferences().then((preferences) => setDefaultMinutes(preferences.defaultPlanMinutes));
      getCompletedPlans().then(setCompletedPlans);
    });

    return unsubscribe;
  }, [navigation]);

  const streakCount = useMemo(() => getResetStreak(completedPlans), [completedPlans]);
  const recentSessions = useMemo(() => completedPlans.slice(0, 3), [completedPlans]);
  const categories = useMemo(() => getCategories(language), [language]);

  return (
    <Screen>
      <LanguageSelector compact showPrompt />

      <View style={styles.hero}>
        <Text style={[styles.heroEyebrow, textDirection]}>{t.home.heroEyebrow}</Text>
        <Text style={[styles.heroTitle, textDirection]}>{t.home.heroTitle}</Text>
        <Text style={[styles.heroBody, textDirection]}>{t.home.heroBody}</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, textDirection]}>{completedPlans.length}</Text>
          <Text style={[styles.summaryLabel, textDirection]}>{t.home.completedResets}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, textDirection]}>{streakCount}</Text>
          <Text style={[styles.summaryLabel, textDirection]}>{t.home.dayStreak}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, textDirection]}>{defaultMinutes}{t.common.minutesShort}</Text>
          <Text style={[styles.summaryLabel, textDirection]}>{t.home.defaultPlan}</Text>
        </View>
      </View>

      {recentSessions.length > 0 ? (
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={[styles.panelTitle, textDirection]}>{t.home.recentTitle}</Text>
            <Text style={[styles.panelMeta, textDirection]}>{t.home.recentMeta}</Text>
          </View>
          {recentSessions.map((session) => {
            const plan = getPlanById(session.planId, language);
            if (!plan) {
              return null;
            }

            return (
              <View key={`${session.planId}-${session.completedAt}`} style={[styles.historyRow, rowDirection]}>
                <View style={styles.historyText}>
                  <Text style={[styles.historyTitle, textDirection]}>{plan.title}</Text>
                  <Text style={[styles.historyMeta, textDirection]}>
                    {formatSessionDate(session.completedAt, language)} - {session.durationMinutes} {t.common.minutesShort}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    navigation.navigate("RecoveryPlan", {
                      categoryId: plan.categoryId,
                      selectedMinutes: session.durationMinutes
                    })
                  }
                  style={styles.repeatButton}
                >
                  <Text style={styles.repeatText}>{t.common.repeat}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyHistory}>
          <Text style={[styles.emptyTitle, textDirection]}>{t.home.emptyTitle}</Text>
          <Text style={[styles.emptyText, textDirection]}>{t.home.emptyText}</Text>
        </View>
      )}

      <SectionHeader
        eyebrow={t.home.sectionEyebrow}
        title={t.home.sectionTitle}
        body={t.home.sectionBody}
      />

      <View style={styles.list}>
        {categories.map((category) => (
          <PlanCard
            key={category.id}
            title={category.name}
            subtitle={category.prompt}
            tag={favoriteIds.includes(category.planId) ? t.common.favorite : undefined}
            minutes={category.minutes}
            onPress={() => navigation.navigate("TimeSelection", { categoryId: category.id })}
          />
        ))}
      </View>
    </Screen>
  );
}

function getResetStreak(completedPlans: CompletedPlan[]) {
  if (completedPlans.length === 0) {
    return 0;
  }

  const days = Array.from(new Set(completedPlans.map((plan) => toDayKey(plan.completedAt)))).sort().reverse();
  let cursor = new Date();
  let streak = 0;

  for (const day of days) {
    const cursorKey = toDayKey(cursor.toISOString());
    if (day === cursorKey) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (streak === 0) {
      cursor.setDate(cursor.getDate() - 1);
      if (day === toDayKey(cursor.toISOString())) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
    }
    break;
  }

  return streak;
}

function toDayKey(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

function formatSessionDate(value: string, language: string) {
  const date = new Date(value);
  return date.toLocaleDateString(language === "ar" ? "ar" : undefined, { month: "short", day: "numeric" });
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
  hero: {
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    gap: spacing.sm,
    padding: spacing.xl
  },
  heroEyebrow: {
    color: colors.peach,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 35
  },
  heroBody: {
    color: colors.mist,
    fontSize: 15,
    lineHeight: 22
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
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 15
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  panelHeader: {
    gap: spacing.xs
  },
  panelTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  panelMeta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  historyRow: {
    alignItems: "center",
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    paddingTop: spacing.md
  },
  historyText: {
    flex: 1,
    gap: spacing.xs
  },
  historyTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  historyMeta: {
    color: colors.muted,
    fontSize: 13
  },
  repeatButton: {
    backgroundColor: colors.mint,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  repeatText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  },
  emptyHistory: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    gap: spacing.xs,
    padding: spacing.lg
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  list: {
    gap: spacing.md
  }
});
