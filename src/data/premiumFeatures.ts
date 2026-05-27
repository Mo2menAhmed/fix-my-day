import type { PremiumFeature } from "../types/recovery";

export const premiumFeatures: PremiumFeature[] = [
  {
    id: "unlimited-plans",
    title: "Unlimited custom resets",
    description: "Create plans for any messy-day situation instead of using only the starter library.",
    available: false,
    translations: {
      ar: {
        title: "خطط مخصصة غير محدودة",
        description: "أنشئ خططا لأي موقف صعب بدلا من الاعتماد على مكتبة البداية فقط."
      }
    }
  },
  {
    id: "advanced-packs",
    title: "Advanced reset packs",
    description: "Deeper packs for burnout days, social recovery, exam weeks, and home resets.",
    available: false,
    translations: {
      ar: {
        title: "حزم استعادة متقدمة",
        description: "حزم أعمق لأيام الاحتراق، التعافي الاجتماعي، أسابيع الامتحانات، وترتيب البيت."
      }
    }
  },
  {
    id: "study-mode",
    title: "Study mode",
    description: "Study-specific starts, review blocks, exam triage, and anti-procrastination prompts.",
    available: false,
    translations: {
      ar: {
        title: "وضع المذاكرة",
        description: "بدايات مخصصة للمذاكرة، فترات مراجعة، فرز للامتحانات، ورسائل ضد التسويف."
      }
    }
  },
  {
    id: "work-mode",
    title: "Work mode",
    description: "Workday rescue flows for inbox backlog, meetings, deadlines, and end-of-day handoffs.",
    available: false,
    translations: {
      ar: {
        title: "وضع العمل",
        description: "مسارات إنقاذ ليوم العمل للبريد المتراكم، الاجتماعات، المواعيد، وتسليم نهاية اليوم."
      }
    }
  },
  {
    id: "sleep-reset",
    title: "Sleep reset",
    description: "Evening wind-downs, bad-sleep recovery, and tomorrow setup routines.",
    available: false,
    translations: {
      ar: {
        title: "استعادة النوم",
        description: "تهدئة المساء، التعافي من النوم السيئ، وروتين تجهيز الغد."
      }
    }
  },
  {
    id: "no-ads",
    title: "No ads",
    description: "Keep recovery screens quiet, focused, and distraction-free.",
    available: false,
    translations: {
      ar: {
        title: "بدون إعلانات",
        description: "اجعل شاشات الاستعادة هادئة ومركزة وبلا مشتتات."
      }
    }
  }
];
