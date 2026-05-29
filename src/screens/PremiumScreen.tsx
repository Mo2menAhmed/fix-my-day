import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { premiumFeatures } from "../data/premiumFeatures";
import { useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function PremiumScreen({ navigation }: ScreenProps<"Premium">) {
  const { language, rowDirection, t, textDirection } = useLanguage();

  return (
    <Screen>
      <SectionHeader
        eyebrow={t.premium.eyebrow}
        title={t.premium.title}
        body={t.premium.body}
      />

      <View style={styles.offer}>
        <Text style={[styles.price, textDirection]}>{t.premium.label}</Text>
        <Text style={[styles.offerTitle, textDirection]}>{t.premium.offerTitle}</Text>
        <Text style={[styles.offerBody, textDirection]}>{t.premium.offerBody}</Text>
      </View>

      <View style={styles.noteCard}>
        <Text style={[styles.noteTitle, textDirection]}>{t.premium.noteTitle}</Text>
        <Text style={[styles.noteBody, textDirection]}>{t.premium.noteBody}</Text>
      </View>

      <View style={styles.features}>
        <Text style={[styles.featuresTitle, textDirection]}>{t.premium.benefitsTitle}</Text>
        {premiumFeatures.map((feature) => {
          const localizedFeature =
            language === "en" ? feature : feature.translations?.[language] ?? feature.translations?.ar ?? feature;
          return (
          <View key={feature.id} style={[styles.feature, rowDirection]}>
            <View style={styles.dot} />
            <View style={styles.featureText}>
              <Text style={[styles.featureTitle, textDirection]}>{localizedFeature.title}</Text>
              <Text style={[styles.featureBody, textDirection]}>{localizedFeature.description}</Text>
            </View>
          </View>
        );
        })}
      </View>

      <PrimaryButton label={t.premium.back} variant="soft" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  offer: {
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    gap: spacing.sm,
    padding: spacing.xl
  },
  price: {
    color: colors.peach,
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  offerTitle: {
    color: colors.surface,
    fontSize: 25,
    fontWeight: "900",
    lineHeight: 31
  },
  offerBody: {
    color: colors.mist,
    fontSize: 15,
    lineHeight: 22
  },
  noteCard: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    gap: spacing.xs,
    padding: spacing.lg
  },
  noteTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  noteBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  features: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg
  },
  featuresTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  feature: {
    gap: spacing.md
  },
  dot: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    height: 10,
    marginTop: 6,
    width: 10
  },
  featureText: {
    flex: 1,
    gap: spacing.xs
  },
  featureTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  featureBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  }
});
