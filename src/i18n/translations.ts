export type LanguageCode = "en" | "ar" | "arz";

export const languageLabels: Record<LanguageCode, string> = {
  en: "English",
  ar: "العربية",
  arz: "مصري"
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
  },
  arz: {
    common: {
      settings: "الإعدادات",
      minutesShort: "د",
      favorite: "مفضلة",
      repeat: "كرر",
      languagePrompt: "Choose your language / اختر اللغة",
      selected: "مختارة"
    },
    onboarding: {
      title: "لما اليوم يتلخبط، ابدأ من هنا.",
      body: "Fix My Day يساعدك تهدى، تختار خطوة صغيرة، وترجع باقي يومك من غير ضغط.",
      firstActionLabel: "نبدأ بإيه؟",
      firstAction: "اختار أقرب حاجة للي حاصل معاك دلوقتي، وإحنا نجهز لك خطة بسيطة.",
      button: "اختار اللي حاصل",
      points: [
        {
          title: "اختار سبب اللخبطة",
          body: "صباح ضاع، ضغط كتير، مذاكرة واقفة، أوضة مكركبة، نوم وحش، أو تجهيز للنوم."
        },
        {
          title: "خذ خطة قصيرة وواضحة",
          body: "مكسب سريع، خطوات بوقت محدد، وقايمة بسيطة تقدر تخلصها النهارده."
        },
        {
          title: "كرر اللي نفع",
          body: "أي استعادة تخلصها بتفضل محفوظة على موبايلك عشان ترجع لها بسهولة."
        }
      ]
    },
    home: {
      heroEyebrow: "لليوم اللي خرج عن مساره",
      heroTitle: "اختار المشكلة، وخذ أول خطوة.",
      heroBody: "من غير لوم ومن غير خطة كبيرة. اختار الأقرب لحالتك وابدأ بحاجة صغيرة.",
      completedResets: "استعادات خلصت",
      dayStreak: "أيام ورا بعض",
      defaultPlan: "المدة الافتراضية",
      recentTitle: "آخر الاستعادات",
      recentMeta: "كرر الخطة اللي ساعدتك",
      emptyTitle: "أول استعادة هتظهر هنا",
      emptyText: "بعد ما تخلص أول خطة، هتلاقيها هنا وتكررها وقت ما تحتاج.",
      sectionEyebrow: "اختار الأقرب",
      sectionTitle: "إيه اللي محتاج إنقاذ دلوقتي؟",
      sectionBody: "خطط قصيرة لأيام حقيقية: بداية متأخرة، طاقة قليلة، مهام متراكمة، أو مكان مكركب."
    },
    timeSelection: {
      headerTitle: "اختار وقت تقدر تلتزم به",
      headerBody: "الخطة هتتظبط على الوقت اللي عندك. اختار مدة واقعية، مش مدة مثالية.",
      quickWin: "مكسب سريع",
      planDetails: "خطوات، عناصر في القايمة، معمولة لمدة",
      compressed: "نسخة مختصرة",
      recommended: "المدة المقترحة",
      roomy: "وقت أهدى",
      button: "جهز خطتي"
    },
    recovery: {
      minutesReset: "دقيقة",
      notFoundTitle: "الخطة مش موجودة",
      notFoundBody: "ارجع واختار نوع تاني.",
      builtFor: "مناسبة للحظة دي",
      chose: "اخترت",
      bodyPrefix: "دي خطة مدتها",
      bodySuffix: "دقيقة. ابدأ بالأسهل وامشي خطوة خطوة. مش مطلوب إن اليوم يبقى مثالي.",
      checklistReady: "من عناصر القايمة جاهزة",
      quickWin: "مكسب سريع",
      stepsTitle: "امشي على الخطوات دي",
      checklistTitle: "قبل ما تبدأ",
      startTimer: "ابدأ مؤقت التركيز",
      removeFavorite: "شيل من المفضلة",
      saveFavorite: "احفظ في المفضلة"
    },
    timer: {
      focus: "تركيز",
      recoveryFocus: "وقت الاستعادة",
      body: "دي فترة قصيرة محمية. ركز على الخطوة الحالية بس، وسيب الباقي بعد المؤقت.",
      complete: "تمت",
      inProgress: "شغال",
      ready: "جاهز",
      paused: "متوقف",
      completeHint: "تمام. احفظ المكسب ده وهو لسه واضح في بالك.",
      runningHint: "خليك مع الخطوة الحالية بس.",
      readyHint: "ابدأ، وقف، أو عيد الضبط براحتك.",
      pause: "إيقاف مؤقت",
      runAgain: "ابدأ من جديد",
      start: "ابدأ الفترة",
      reset: "إعادة ضبط المؤقت",
      saveCompletion: "احفظ الإنجاز",
      finishReflect: "إنهاء وكتابة ملاحظة"
    },
    reflection: {
      title: "احفظ المكسب الصغير",
      body: "اكتب ملاحظة قصيرة عن اللي ساعدك. جملة واحدة كفاية.",
      label: "حاسس بإيه دلوقتي؟",
      moods: ["أهدى", "أخف", "لسه تعبان"],
      noteLabel: "جملة واحدة كفاية",
      placeholder: "حاسس إني أحسن شوية عشان...",
      savedTitle: "تم الحفظ",
      savedText: "حفظنا الاستعادة دي ضمن اللي أنجزته.",
      save: "احفظ الاستعادة",
      savedButton: "محفوظ على الجهاز",
      backHome: "ارجع للرئيسية"
    },
    settings: {
      title: "الإعدادات",
      body: "كل حاجة محفوظة على جهازك. غير اللغة، مدة الخطة، وتقدمك زي ما يناسبك.",
      languageTitle: "اللغة",
      gentleMode: "الوضع الهادئ",
      soundCues: "تنبيهات صوت",
      defaultLength: "مدة الخطة الافتراضية",
      defaultLengthBody: "هتظهر كاقتراح أول لما تختار خطة جديدة.",
      localProgress: "تقدمك على الجهاز",
      noSessions: "لسه مفيش استعادات محفوظة. خلص خطة وهتظهر هنا.",
      completedPlans: "خطط خلصت",
      favoritePlans: "خطط مفضلة",
      premiumTitle: "بريميوم جاي بعدين",
      premiumBody: "الدفع مش متاح في الإصدار ده. كل خطط الاستعادة الحالية مجانية.",
      previewPremium: "شوف أفكار بريميوم",
      showOnboarding: "اعرض البداية من جديد",
      clearProgress: "امسح التقدم من الجهاز",
      clearTitle: "تمسح التقدم؟",
      clearBody: "هنمسح الخطط المكتملة والمفضلة من الجهاز ده بس.",
      cancel: "إلغاء",
      clear: "مسح"
    },
    premium: {
      eyebrow: "جاي بعدين",
      title: "بريميوم مش متاح حاليا.",
      body: "دي أفكار ممكن نضيفها بعدين. مفيش دفع أو اشتراكات في الإصدار ده.",
      label: "أفكار مستقبلية",
      offerTitle: "اختيارات أعمق للي بيستخدم التطبيق كتير",
      offerBody: "الخطط الحالية مجانية ومفيدة. بعدين ممكن نضيف حزم أكتر، أوضاع متخصصة، وتجربة أهدى.",
      noteTitle: "مفيش دفع",
      noteBody: "التطبيق مش بيخصم فلوس، والاشتراكات مش مفعلة، وكل الاستعادات الحالية مجانية.",
      benefitsTitle: "مزايا ممكنة",
      back: "ارجع للإعدادات"
    }
  }
};

export function isArabicLanguage(language: LanguageCode) {
  return language === "ar" || language === "arz";
}
