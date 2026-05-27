import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "filled" | "soft" | "ghost";
  disabled?: boolean;
  style?: ViewStyle;
};

export function PrimaryButton({ label, onPress, variant = "filled", disabled, style }: PrimaryButtonProps) {
  const { isArabic } = useLanguage();

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style
      ]}
    >
      <Text style={[styles.label, { writingDirection: isArabic ? "rtl" : "ltr" }, variant !== "filled" && styles.darkLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: 18,
    shadowColor: "#24312F",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12
  },
  filled: {
    backgroundColor: colors.accentDark
  },
  soft: {
    backgroundColor: colors.mint
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: colors.line,
    borderWidth: 1
  },
  label: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  darkLabel: {
    color: colors.ink
  },
  pressed: {
    opacity: 0.78
  },
  disabled: {
    opacity: 0.5
  }
});
