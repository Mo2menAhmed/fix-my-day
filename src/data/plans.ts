import plans from "./recoveryPlans.json";
import type { LanguageCode } from "../i18n/translations";
import type { ProblemCategoryId, RecoveryPlan } from "../types/recovery";

export const recoveryPlans = plans as RecoveryPlan[];

export function getCategories(language: LanguageCode = "en") {
  return recoveryPlans.map((plan) => {
    const localizedPlan = localizePlan(plan, language);
    return {
      id: localizedPlan.categoryId,
      planId: localizedPlan.id,
      name: localizedPlan.category,
      title: localizedPlan.title,
      prompt: localizedPlan.categoryPrompt,
      minutes: localizedPlan.totalTime
    };
  });
}

export function getPlanByCategory(categoryId: ProblemCategoryId, selectedMinutes?: number, language: LanguageCode = "en") {
  const plan = recoveryPlans.find((item) => item.categoryId === categoryId);
  const localizedPlan = plan ? localizePlan(plan, language) : undefined;

  if (!localizedPlan || !selectedMinutes || selectedMinutes === localizedPlan.totalTime) {
    return localizedPlan;
  }

  const scale = selectedMinutes / localizedPlan.totalTime;
  const adjustedSteps = localizedPlan.steps.map((step) => ({
    ...step,
    durationMinutes: Math.max(1, Math.round(step.durationMinutes * scale))
  }));

  return {
    ...localizedPlan,
    totalTime: adjustedSteps.reduce((total, step) => total + step.durationMinutes, 0),
    steps: adjustedSteps
  };
}

export function getPlanById(planId: string, language: LanguageCode = "en") {
  const plan = recoveryPlans.find((item) => item.id === planId);
  return plan ? localizePlan(plan, language) : undefined;
}

function localizePlan(plan: RecoveryPlan, language: LanguageCode): RecoveryPlan {
  if (language === "en") {
    return plan;
  }

  const translation = plan.translations?.[language] ?? (language === "arz" ? plan.translations?.ar : undefined);
  if (!translation) {
    return plan;
  }

  return {
    ...plan,
    category: translation.category,
    categoryPrompt: translation.categoryPrompt,
    title: translation.title,
    shortEncouragement: translation.shortEncouragement,
    quickWin: translation.quickWin,
    steps: plan.steps.map((step) => {
      const translatedStep = translation.steps.find((item) => item.id === step.id);
      return translatedStep ? { ...step, title: translatedStep.title, detail: translatedStep.detail } : step;
    }),
    checklistItems: translation.checklistItems
  };
}
