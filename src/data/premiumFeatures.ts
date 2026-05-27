import type { PremiumFeature } from "../types/recovery";

export const premiumFeatures: PremiumFeature[] = [
  {
    id: "adaptive-plans",
    title: "Adaptive plan builder",
    description: "Adjust plans from your recent patterns, energy, and time of day.",
    available: false
  },
  {
    id: "guided-audio",
    title: "Guided audio resets",
    description: "Short spoken walk-throughs for overwhelm, study starts, and bedtime.",
    available: false
  },
  {
    id: "weekly-insights",
    title: "Weekly recovery insights",
    description: "See which resets help most and which stressful patterns repeat.",
    available: false
  }
];
