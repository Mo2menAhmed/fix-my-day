import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type PlanCardProps = {
  title: string;
  subtitle: string;
  minutes?: number;
  tag?: string;
  selected?: boolean;
  onPress: () => void;
};

export function PlanCard({ title, subtitle, minutes, tag, selected, onPress }: PlanCardProps) {
  const { rowDirection, textDirection, t } = useLanguage();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        rowDirection,
        selected && styles.selected,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.textGroup}>
        {tag ? <Text style={[styles.tag, textDirection]}>{tag}</Text> : null}
        <Text style={[styles.title, textDirection]}>{title}</Text>
        <Text style={[styles.subtitle, textDirection]}>{subtitle}</Text>
      </View>
      {minutes ? (
        <View style={styles.pill}>
          <Text style={styles.pillText}>{minutes}{t.common.minutesShort}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    padding: spacing.lg,
    shadowColor: "#24312F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  selected: {
    backgroundColor: colors.mint,
    borderColor: colors.accent
  },
  pressed: {
    opacity: 0.8
  },
  textGroup: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800"
  },
  tag: {
    color: colors.accentDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  pill: {
    backgroundColor: colors.peach,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  pillText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "800"
  }
});
