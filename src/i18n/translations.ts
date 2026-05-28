export type LanguageCode = "en" | "ar";

export const languageLabels: Record<LanguageCode, string> = {
  en: "English",
  ar: "العربية"
};

export const translations = {
  en: {
    common: {
      settings: "Settings",
      minutesShort: "min",
      favorite: "Favorite",
      repeat: "Repeat",
      languagePrompt: "Choose your language / اختر اللغة",
      selected: "Selected"
    },
    onboarding: {
      title: "When the day goes sideways, start here.",
      body: "Fix My Day helps students, workers, and tired humans recover the next useful part of a messy day.",
      firstActionLabel: "First action",
      firstAction:
        "Choose the problem that feels closest. The app will build your reset from there.",
      button: "Choose my problem",
      points: [
        {
          title: "Tell it what went wrong",
          body: "Late start, overwhelm, study block, messy room, bad sleep, or bedtime reset."
        },
        {
          title: "Get one practical rescue plan",
          body: "A quick win, timed steps, and a checklist you can actually finish today."
        },
        {
          title: "Save the reset that helped",
          body: "Completed resets stay on this phone so you can repeat what works."
        }
      ]
    },
    home: {
      heroEyebrow: "For days that got away from you",
      heroTitle: "Pick the problem. Get the next move.",
      heroBody:
        "No guilt plan, no huge routine. Choose what feels closest and start with one small reset.",
      completedResets: "completed resets",
      dayStreak: "day streak",
      defaultPlan: "default plan",
      recentTitle: "Recent resets",
      recentMeta: "Tap repeat when it worked",
      emptyTitle: "Your first reset will show here",
      emptyText: "Finish any plan once and this becomes your shortcut back to what helped.",
      sectionEyebrow: "Choose what feels closest",
      sectionTitle: "What needs rescuing?",
      sectionBody:
        "These are written for real days: late starts, low energy, noisy tasks, and rooms that got away from you."
    },
    timeSelection: {
      headerTitle: "Choose a realistic reset",
      headerBody:
        "The plan adapts to the time you have. Pick the option you would actually do today.",
      quickWin: "Quick win",
      planDetails: "steps, checklist items, designed for",
      compressed: "Compressed rescue plan",
      recommended: "Recommended pace",
      roomy: "Roomier recovery pace",
      button: "Build my plan"
    },
    recovery: {
      minutesReset: "minute reset",
      notFoundTitle: "Plan not found",
      notFoundBody: "Go back and choose another recovery category.",
      builtFor: "Built for this moment",
      chose: "You chose",
      bodyPrefix: "This is a",
      bodySuffix:
        "minute plan with small actions first. Follow it in order, skip perfection, and let the timer hold the container.",
      checklistReady: "checklist items ready",
      quickWin: "Quick win",
      stepsTitle: "Do these in order",
      checklistTitle: "Before you start",
      startTimer: "Start focus timer",
      removeFavorite: "Remove favorite",
      saveFavorite: "Save as favorite"
    },
    timer: {
      focus: "Focus",
      recoveryFocus: "Recovery focus",
      body:
        "This is a protected block. Work gently, ignore the rest, and stop when the timer stops.",
      complete: "Complete",
      inProgress: "In progress",
      ready: "Ready",
      paused: "Paused",
      completeHint: "Nice. Save the win while it is fresh.",
      runningHint: "Stay with only the next step.",
      readyHint: "Start, pause, or reset whenever you need.",
      pause: "Pause block",
      runAgain: "Run it again",
      start: "Start block",
      reset: "Reset timer",
      saveCompletion: "Save completion",
      finishReflect: "Finish and reflect"
    },
    reflection: {
      title: "Capture the win",
      body: "A short note helps the app remember what worked. One sentence is enough.",
      label: "How do you feel now?",
      moods: ["steadier", "lighter", "still tired"],
      noteLabel: "One sentence is enough",
      placeholder: "I feel less stuck because...",
      savedTitle: "Saved",
      savedText: "This plan was added to your completed plans.",
      save: "Save completed session",
      savedButton: "Saved locally",
      backHome: "Back home"
    },
    settings: {
      title: "Settings",
      body:
        "Your plans stay local on this device. Adjust the default reset length, review progress, or see what may be added later.",
      languageTitle: "Language",
      gentleMode: "Gentle mode",
      soundCues: "Sound cues",
      defaultLength: "Default plan length",
      defaultLengthBody: "Used as the first suggestion before each recovery plan.",
      localProgress: "Local progress",
      noSessions: "No saved sessions yet. Complete a reset and it will show up here.",
      completedPlans: "completed plans",
      favoritePlans: "favorite plans",
      premiumTitle: "Premium coming soon",
      premiumBody: "Payments are not available in this version. Current reset plans are free to use.",
      previewPremium: "View premium ideas",
      showOnboarding: "Show onboarding again",
      clearProgress: "Clear local progress",
      clearTitle: "Clear progress?",
      clearBody: "Completed and favorite plans will be removed from this device.",
      cancel: "Cancel",
      clear: "Clear"
    },
    premium: {
      eyebrow: "Coming soon",
      title: "Premium is not available yet.",
      body:
        "This screen shows possible future upgrades. Payments and subscriptions are not active in this version.",
      label: "Possible Premium",
      offerTitle: "More reset options for repeat users",
      offerBody:
        "The free app stays useful with starter plans. Premium may later add deeper packs, modes, and a quieter experience for people who use resets often.",
      noteTitle: "No checkout available",
      noteBody:
        "This app does not charge money, subscriptions are not connected, and every current reset is free to use.",
      benefitsTitle: "Possible benefits",
      back: "Back to settings"
    }
  },
  ar: {
    common: {
      settings: "الإعدادات",
      minutesShort: "د",
      favorite: "مفضل",
      repeat: "كرر",
      languagePrompt: "Choose your language / اختر اللغة",
      selected: "مختارة"
    },
    onboarding: {
      title: "لما اليوم يخرج عن السيطرة، ابدأ من هنا.",
      body: "Fix My Day يساعد الطلاب والموظفين وأي شخص مرهق يستعيد الجزء القادم من يوم صعب.",
      firstActionLabel: "أول خطوة",
      firstAction: "اختر المشكلة الأقرب لما تشعر به. التطبيق سيبني لك خطة استعادة مناسبة.",
      button: "اختر مشكلتي",
      points: [
        {
          title: "قل ما الذي تعطل",
          body: "بداية متأخرة، ضغط زائد، مذاكرة متوقفة، غرفة فوضوية، نوم سيئ، أو استعداد للنوم."
        },
        {
          title: "خذ خطة إنقاذ عملية",
          body: "مكسب سريع، خطوات بوقت محدد، وقائمة بسيطة يمكنك إنهاؤها اليوم."
        },
        {
          title: "احفظ ما ساعدك",
          body: "الاستعادات المكتملة تبقى على هذا الهاتف لتكرر ما نجح معك."
        }
      ]
    },
    home: {
      heroEyebrow: "للأيام التي ضاعت منك",
      heroTitle: "اختر المشكلة. خذ الخطوة التالية.",
      heroBody: "بدون تأنيب وبدون روتين كبير. اختر الأقرب وابدأ باستعادة صغيرة.",
      completedResets: "استعادات مكتملة",
      dayStreak: "أيام متتالية",
      defaultPlan: "الخطة الافتراضية",
      recentTitle: "آخر الاستعادات",
      recentMeta: "كرر الخطة التي نجحت",
      emptyTitle: "أول استعادة ستظهر هنا",
      emptyText: "أنهِ أي خطة مرة واحدة لتصبح اختصارا لما ساعدك.",
      sectionEyebrow: "اختر الأقرب",
      sectionTitle: "ما الذي يحتاج إنقاذا؟",
      sectionBody: "هذه الخطط مكتوبة لأيام حقيقية: بداية متأخرة، طاقة قليلة، مهام مزعجة، أو مكان فوضوي."
    },
    timeSelection: {
      headerTitle: "اختر وقتا واقعيا",
      headerBody: "الخطة تتكيف مع الوقت المتاح لك. اختر ما تستطيع فعله فعلا اليوم.",
      quickWin: "مكسب سريع",
      planDetails: "خطوات، عناصر قائمة، مصممة لمدة",
      compressed: "خطة إنقاذ مختصرة",
      recommended: "الإيقاع المقترح",
      roomy: "وقت أوسع للاستعادة",
      button: "ابنِ خطتي"
    },
    recovery: {
      minutesReset: "دقيقة استعادة",
      notFoundTitle: "الخطة غير موجودة",
      notFoundBody: "ارجع واختر نوعا آخر من الاستعادة.",
      builtFor: "مبنية لهذه اللحظة",
      chose: "اخترت",
      bodyPrefix: "هذه خطة مدتها",
      bodySuffix: "دقيقة تبدأ بخطوات صغيرة. اتبعها بالترتيب، واترك الكمال، ودع المؤقت يحمل الجزء الصعب.",
      checklistReady: "عناصر جاهزة من القائمة",
      quickWin: "مكسب سريع",
      stepsTitle: "افعل هذه بالترتيب",
      checklistTitle: "قبل أن تبدأ",
      startTimer: "ابدأ مؤقت التركيز",
      removeFavorite: "إزالة من المفضلة",
      saveFavorite: "حفظ كمفضلة"
    },
    timer: {
      focus: "تركيز",
      recoveryFocus: "تركيز الاستعادة",
      body: "هذه فترة محمية. اعمل بهدوء، تجاهل الباقي، وتوقف عندما يتوقف المؤقت.",
      complete: "اكتملت",
      inProgress: "قيد التنفيذ",
      ready: "جاهز",
      paused: "متوقف مؤقتا",
      completeHint: "جميل. احفظ هذا المكسب وهو ما زال واضحا.",
      runningHint: "ابق مع الخطوة التالية فقط.",
      readyHint: "ابدأ أو توقف أو أعد الضبط عندما تحتاج.",
      pause: "إيقاف مؤقت",
      runAgain: "شغلها مرة أخرى",
      start: "ابدأ الفترة",
      reset: "إعادة ضبط المؤقت",
      saveCompletion: "حفظ الاكتمال",
      finishReflect: "إنهاء وتأمل"
    },
    reflection: {
      title: "احفظ المكسب",
      body: "ملاحظة قصيرة تساعد التطبيق على تذكر ما نفع. جملة واحدة تكفي.",
      label: "كيف تشعر الآن؟",
      moods: ["أهدأ", "أخف", "ما زلت متعبا"],
      noteLabel: "جملة واحدة تكفي",
      placeholder: "أشعر أنني أقل تعثرا لأن...",
      savedTitle: "تم الحفظ",
      savedText: "تمت إضافة هذه الخطة إلى الاستعادات المكتملة.",
      save: "حفظ الجلسة المكتملة",
      savedButton: "محفوظ محليا",
      backHome: "العودة للرئيسية"
    },
    settings: {
      title: "الإعدادات",
      body: "خططك تبقى محليا على هذا الجهاز. عدل مدة الاستعادة، راجع تقدمك، أو شاهد ما قد يضاف لاحقا.",
      languageTitle: "اللغة",
      gentleMode: "الوضع اللطيف",
      soundCues: "تنبيهات صوتية",
      defaultLength: "مدة الخطة الافتراضية",
      defaultLengthBody: "تستخدم كاقتراح أول قبل كل خطة استعادة.",
      localProgress: "التقدم المحلي",
      noSessions: "لا توجد جلسات محفوظة بعد. أكمل استعادة وستظهر هنا.",
      completedPlans: "خطط مكتملة",
      favoritePlans: "خطط مفضلة",
      premiumTitle: "بريميوم قادم لاحقا",
      premiumBody: "الدفع غير متاح في هذا الإصدار. خطط الاستعادة الحالية مجانية للاستخدام.",
      previewPremium: "عرض أفكار بريميوم",
      showOnboarding: "عرض البداية مرة أخرى",
      clearProgress: "مسح التقدم المحلي",
      clearTitle: "مسح التقدم؟",
      clearBody: "سيتم حذف الخطط المكتملة والمفضلة من هذا الجهاز.",
      cancel: "إلغاء",
      clear: "مسح"
    },
    premium: {
      eyebrow: "قادم لاحقا",
      title: "بريميوم غير متاح حاليا.",
      body: "هذه الشاشة تعرض ترقيات محتملة لاحقا. الدفع والاشتراكات غير مفعلة في هذا الإصدار.",
      label: "بريميوم محتمل",
      offerTitle: "خيارات استعادة أكثر للمستخدمين المتكررين",
      offerBody: "التطبيق المجاني يبقى مفيدا بالخطط الأساسية. بريميوم قد يضيف حزم أعمق، أوضاعا متخصصة، وتجربة أهدأ لمن يستخدم الاستعادات كثيرا.",
      noteTitle: "لا توجد عملية دفع",
      noteBody: "هذا التطبيق لا يخصم أموالا، والاشتراكات غير مفعلة، وكل الاستعادات الحالية مجانية للاستخدام.",
      benefitsTitle: "مزايا محتملة",
      back: "العودة للإعدادات"
    }
  }
};

export function isArabicLanguage(language: LanguageCode) {
  return language === "ar";
}
