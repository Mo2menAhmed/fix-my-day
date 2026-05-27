import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ChecklistProgress, CompletedPlan, UserPreferences } from "../types/recovery";

const keys = {
  completedPlans: "fixMyDay:completedPlans",
  favoritePlans: "fixMyDay:favoritePlans",
  checklistProgress: "fixMyDay:checklistProgress",
  preferences: "fixMyDay:preferences"
};

export const defaultPreferences: UserPreferences = {
  gentleMode: true,
  soundEnabled: false,
  defaultPlanMinutes: 25,
  hasCompletedOnboarding: false,
  language: "en"
};

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getCompletedPlans() {
  const stored = await readJson<CompletedPlan[]>(keys.completedPlans, []);
  if (!Array.isArray(stored)) {
    return [];
  }

  return stored.filter((plan) => {
    return (
      plan &&
      typeof plan.planId === "string" &&
      typeof plan.completedAt === "string" &&
      !Number.isNaN(new Date(plan.completedAt).getTime()) &&
      typeof plan.durationMinutes === "number" &&
      Array.isArray(plan.checkedItems)
    );
  });
}

export async function addCompletedPlan(completedPlan: CompletedPlan) {
  const existing = await getCompletedPlans();
  await writeJson(keys.completedPlans, [completedPlan, ...existing]);
}

export async function getFavoritePlans() {
  const stored = await readJson<string[]>(keys.favoritePlans, []);
  return Array.isArray(stored) ? stored.filter((planId) => typeof planId === "string") : [];
}

export async function toggleFavoritePlan(planId: string) {
  const existing = await getFavoritePlans();
  const next = existing.includes(planId)
    ? existing.filter((id) => id !== planId)
    : [...existing, planId];

  await writeJson(keys.favoritePlans, next);
  return next;
}

export async function getUserPreferences() {
  const stored = await readJson<Partial<UserPreferences>>(keys.preferences, defaultPreferences);
  return {
    gentleMode: typeof stored.gentleMode === "boolean" ? stored.gentleMode : defaultPreferences.gentleMode,
    soundEnabled: typeof stored.soundEnabled === "boolean" ? stored.soundEnabled : defaultPreferences.soundEnabled,
    defaultPlanMinutes:
      typeof stored.defaultPlanMinutes === "number" && Number.isFinite(stored.defaultPlanMinutes)
        ? stored.defaultPlanMinutes
        : defaultPreferences.defaultPlanMinutes,
    hasCompletedOnboarding:
      typeof stored.hasCompletedOnboarding === "boolean"
        ? stored.hasCompletedOnboarding
        : defaultPreferences.hasCompletedOnboarding,
    language: stored.language === "ar" || stored.language === "en" ? stored.language : defaultPreferences.language
  };
}

export async function saveUserPreferences(preferences: UserPreferences) {
  await writeJson(keys.preferences, preferences);
}

export async function clearProgress() {
  await Promise.all([
    AsyncStorage.removeItem(keys.completedPlans),
    AsyncStorage.removeItem(keys.favoritePlans),
    AsyncStorage.removeItem(keys.checklistProgress)
  ]);
}

export async function getChecklistProgress(planId: string) {
  const progress = await readJson<ChecklistProgress>(keys.checklistProgress, {});
  const planProgress = progress[planId];
  return Array.isArray(planProgress) ? planProgress.filter((item) => typeof item === "string") : [];
}

export async function saveChecklistProgress(planId: string, checkedItems: string[]) {
  const progress = await readJson<ChecklistProgress>(keys.checklistProgress, {});
  await writeJson(keys.checklistProgress, { ...progress, [planId]: checkedItems });
}

export async function clearChecklistProgress(planId: string) {
  const progress = await readJson<ChecklistProgress>(keys.checklistProgress, {});
  const next = { ...progress };
  delete next[planId];
  await writeJson(keys.checklistProgress, next);
}
