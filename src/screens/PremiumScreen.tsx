import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { premiumFeatures } from "../data/premiumFeatures";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function PremiumScreen({ navigation }: ScreenProps<"Premium">) {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Coming later"
        title="Premium resets"
        body="Payments are not connected yet. This placeholder defines the upgrade surface for future testing."
      />

      <View style={styles.offer}>
        <Text style={styles.price}>$0</Text>
        <Text style={styles.offerTitle}>Preview only</Text>
        <Text style={styles.offerBody}>
          The app is fully usable with local plans today. Premium ideas are parked here so payments can be added cleanly later.
        </Text>
      </View>

      <View style={styles.features}>
        {premiumFeatures.map((feature) => (
          <View key={feature.id} style={styles.feature}>
            <View style={styles.dot} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureBody}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <PrimaryButton label="Back to settings" variant="soft" onPress={() => navigation.goBack()} />
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
    color: colors.surface,
    fontSize: 42,
    fontWeight: "900"
  },
  offerTitle: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: "900"
  },
  offerBody: {
    color: colors.mist,
    fontSize: 15,
    lineHeight: 22
  },
  features: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg
  },
  feature: {
    flexDirection: "row",
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
