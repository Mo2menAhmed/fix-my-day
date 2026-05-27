import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ProblemCategoryId } from "./recovery";

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  TimeSelection: { categoryId: ProblemCategoryId };
  RecoveryPlan: { categoryId: ProblemCategoryId; selectedMinutes: number };
  FocusTimer: { planId: string; minutes: number; categoryId: ProblemCategoryId };
  Reflection: { planId: string; minutes: number };
  Settings: undefined;
  Premium: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
