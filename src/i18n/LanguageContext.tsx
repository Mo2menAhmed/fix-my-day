import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { getUserPreferences, saveUserPreferences } from "../storage/appStorage";
import { isArabicLanguage, LanguageCode, translations } from "./translations";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => Promise<void>;
  t: typeof translations.en;
  isArabic: boolean;
  textDirection: TextStyle;
  rowDirection: ViewStyle;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = PropsWithChildren<{
  initialLanguage: LanguageCode;
}>;

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage);
  const isArabic = isArabicLanguage(language);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: async (nextLanguage) => {
        const preferences = await getUserPreferences();
        await saveUserPreferences({ ...preferences, language: nextLanguage });
        setLanguageState(nextLanguage);
      },
      t: translations[language],
      isArabic,
      textDirection: {
        textAlign: isArabic ? "right" : "left",
        writingDirection: isArabic ? "rtl" : "ltr"
      },
      rowDirection: {
        flexDirection: isArabic ? "row-reverse" : "row"
      }
    }),
    [isArabic, language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return value;
}
