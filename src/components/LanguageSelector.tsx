import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { languageLabels, type LanguageCode } from "../i18n/translations";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type LanguageSelectorProps = {
  compact?: boolean;
  showPrompt?: boolean;
};

const languageOptions: LanguageCode[] = ["en", "ar"];

export function LanguageSelector({ compact = false, showPrompt = true }: LanguageSelectorProps) {
  const { language, setLanguage, t, textDirection } = useLanguage();

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {showPrompt ? <Text style={[styles.prompt, textDirection]}>{t.common.languagePrompt}</Text> : null}
      <View style={styles.options}>
        {languageOptions.map((option) => {
          const selected = language === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setLanguage(option)}
              style={[styles.option, compact && styles.compactOption, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, compact && styles.compactText, selected && styles.selectedText]}>
                {languageLabels[option]}
              </Text>
              {selected ? <Text style={[styles.selectedBadge, compact && styles.compactBadge]}>{t.common.selected}</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md
  },
  compactContainer: {
    padding: spacing.sm
  },
  prompt: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  options: {
    flexDirection: "row",
    gap: spacing.sm
  },
  option: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  compactOption: {
    minHeight: 42,
    paddingHorizontal: spacing.sm
  },
  selectedOption: {
    backgroundColor: colors.accentDark,
    borderColor: colors.accentDark
  },
  optionText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center"
  },
  compactText: {
    fontSize: 14
  },
  selectedText: {
    color: colors.surface
  },
  selectedBadge: {
    color: colors.peach,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  compactBadge: {
    fontSize: 9
  }
});
