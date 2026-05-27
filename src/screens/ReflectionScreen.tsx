import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { getPlanById } from "../data/plans";
import { useLanguage } from "../i18n/LanguageContext";
import { addCompletedPlan, clearChecklistProgress, getChecklistProgress } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function ReflectionScreen({ navigation, route }: ScreenProps<"Reflection">) {
  const { language, t, textDirection } = useLanguage();
  const plan = getPlanById(route.params.planId, language);
  const [reflection, setReflection] = useState("");
  const [moodAfter, setMoodAfter] = useState(t.reflection.moods[0]);
  const [saved, setSaved] = useState(false);

  async function saveReflection() {
    if (saved) {
      return;
    }
    const checkedItems = await getChecklistProgress(route.params.planId);
    await addCompletedPlan({
      planId: route.params.planId,
      completedAt: new Date().toISOString(),
      durationMinutes: route.params.minutes,
      checkedItems,
      moodAfter,
      reflection: reflection.trim() || undefined
    });
    await clearChecklistProgress(route.params.planId);
    setSaved(true);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboard}>
      <Screen>
        <SectionHeader
          eyebrow={plan?.category ?? t.reflection.title}
          title={t.reflection.title}
          body={t.reflection.body}
        />

        <View style={styles.panel}>
          <Text style={[styles.label, textDirection]}>{t.reflection.label}</Text>
          <View style={styles.moods}>
            {t.reflection.moods.map((mood) => (
              <Text
                key={mood}
                onPress={() => setMoodAfter(mood)}
                style={[styles.mood, textDirection, moodAfter === mood && styles.moodSelected]}
              >
                {mood}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={[styles.label, textDirection]}>{t.reflection.noteLabel}</Text>
          <TextInput
            multiline
            onChangeText={setReflection}
            placeholder={t.reflection.placeholder}
            placeholderTextColor={colors.muted}
            style={[styles.input, textDirection]}
            textAlignVertical="top"
            value={reflection}
          />
        </View>

        {saved ? (
          <View style={styles.savedPanel}>
            <Text style={[styles.savedTitle, textDirection]}>{t.reflection.savedTitle}</Text>
            <Text style={[styles.savedText, textDirection]}>{t.reflection.savedText}</Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <PrimaryButton label={saved ? t.reflection.savedButton : t.reflection.save} disabled={saved} onPress={saveReflection} />
          <PrimaryButton label={t.reflection.backHome} variant="soft" onPress={() => navigation.popToTop()} />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  label: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  moods: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  mood: {
    backgroundColor: colors.background,
    borderColor: colors.line,
    borderRadius: 999,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  moodSelected: {
    backgroundColor: colors.accentDark,
    borderColor: colors.accentDark,
    color: colors.surface
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    minHeight: 150,
    padding: spacing.md
  },
  savedPanel: {
    backgroundColor: colors.mint,
    borderRadius: 8,
    gap: spacing.xs,
    padding: spacing.lg
  },
  savedTitle: {
    color: colors.success,
    fontSize: 16,
    fontWeight: "800"
  },
  savedText: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20
  },
  actions: {
    gap: spacing.md
  }
});
