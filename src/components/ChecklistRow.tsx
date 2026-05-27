import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type ChecklistRowProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export function ChecklistRow({ label, checked, onToggle }: ChecklistRowProps) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Text style={styles.check}>OK</Text> : null}
      </View>
      <Text style={[styles.label, checked && styles.done]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 42
  },
  box: {
    alignItems: "center",
    borderColor: colors.accent,
    borderRadius: 6,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    width: 24
  },
  boxChecked: {
    backgroundColor: colors.accent
  },
  check: {
    color: colors.surface,
    fontSize: 9,
    fontWeight: "800",
    lineHeight: 18
  },
  label: {
    color: colors.ink,
    flex: 1,
    fontSize: 16
  },
  done: {
    color: colors.muted,
    textDecorationLine: "line-through"
  }
});
