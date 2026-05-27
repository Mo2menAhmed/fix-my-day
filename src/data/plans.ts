import plans from "./recoveryPlans.json";
import type { ProblemCategoryId, RecoveryPlan } from "../types/recovery";

export const recoveryPlans = plans as RecoveryPlan[];

export const categories = recoveryPlans.map((plan) => ({
  id: plan.categoryId,
  planId: plan.id,
  name: plan.category,
  title: plan.title,
  minutes: plan.totalTime
}));

export function getPlanByCategory(categoryId: ProblemCategoryId, selectedMinutes?: number) {
  const plan = recoveryPlans.find((item) => item.categoryId === categoryId);

  if (!plan || !selectedMinutes || selectedMinutes === plan.totalTime) {
    return plan;
  }

  const scale = selectedMinutes / plan.totalTime;
  const adjustedSteps = plan.steps.map((step) => ({
    ...step,
    durationMinutes: Math.max(1, Math.round(step.durationMinutes * scale))
  }));

  return {
    ...plan,
    totalTime: adjustedSteps.reduce((total, step) => total + step.durationMinutes, 0),
    steps: adjustedSteps
  };
}

export function getPlanById(planId: string) {
  return recoveryPlans.find((plan) => plan.id === planId);
}
