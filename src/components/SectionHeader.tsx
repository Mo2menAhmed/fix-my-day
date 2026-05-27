import { StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionHeader({ eyebrow, title, body }: SectionHeaderProps) {
  const { textDirection } = useLanguage();

  return (
    <View style={styles.wrapper}>
      {eyebrow ? <Text style={[styles.eyebrow, textDirection]}>{eyebrow}</Text> : null}
      <Text style={[styles.title, textDirection]}>{title}</Text>
      {body ? <Text style={[styles.body, textDirection]}>{body}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm
  },
  eyebrow: {
    color: colors.accentDark,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 38
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23
  }
});
