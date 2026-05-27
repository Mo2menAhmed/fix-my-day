import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { getPlanById } from "../data/plans";
import { addCompletedPlan, clearChecklistProgress, getChecklistProgress } from "../storage/appStorage";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function ReflectionScreen({ navigation, route }: ScreenProps<"Reflection">) {
  const plan = getPlanById(route.params.planId);
  const [reflection, setReflection] = useState("");
  const [moodAfter, setMoodAfter] = useState("steadier");
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
          eyebrow={plan?.category ?? "Reflection"}
          title="Capture the win"
          body="A short note helps the app remember what worked. One sentence is enough."
        />

        <View style={styles.panel}>
          <Text style={styles.label}>How do you feel now?</Text>
          <View style={styles.moods}>
            {["steadier", "lighter", "still tired"].map((mood) => (
              <Text
                key={mood}
                onPress={() => setMoodAfter(mood)}
                style={[styles.mood, moodAfter === mood && styles.moodSelected]}
              >
                {mood}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.label}>One sentence is enough</Text>
          <TextInput
            multiline
            onChangeText={setReflection}
            placeholder="I feel less stuck because..."
            placeholderTextColor={colors.muted}
            style={styles.input}
            textAlignVertical="top"
            value={reflection}
          />
        </View>

        {saved ? (
          <View style={styles.savedPanel}>
            <Text style={styles.savedTitle}>Saved</Text>
            <Text style={styles.savedText}>This plan was added to your completed plans.</Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          <PrimaryButton label={saved ? "Saved locally" : "Save completed session"} disabled={saved} onPress={saveReflection} />
          <PrimaryButton label="Back home" variant="soft" onPress={() => navigation.popToTop()} />
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
