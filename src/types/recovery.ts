export type ProblemCategoryId =
  | "wasted-morning"
  | "overwhelmed"
  | "cannot-start-studying"
  | "workday-rescue"
  | "clean-space"
  | "bad-sleep-recovery"
  | "before-bed-reset"
  | "tomorrow-planning";

export type PlanStep = {
  id: string;
  title: string;
  durationMinutes: number;
  detail: string;
};

export type RecoveryPlan = {
  id: string;
  categoryId: ProblemCategoryId;
  category: string;
  title: string;
  shortEncouragement: string;
  totalTime: number;
  steps: PlanStep[];
  checklistItems: string[];
};

export type CompletedPlan = {
  planId: string;
  completedAt: string;
  durationMinutes: number;
  checkedItems: string[];
  moodBefore?: string;
  moodAfter?: string;
  reflection?: string;
};

export type UserPreferences = {
  gentleMode: boolean;
  soundEnabled: boolean;
  defaultPlanMinutes: number;
  hasCompletedOnboarding: boolean;
};

export type ChecklistProgress = Record<string, string[]>;

export type PremiumFeature = {
  id: string;
  title: string;
  description: string;
  available: boolean;
};
