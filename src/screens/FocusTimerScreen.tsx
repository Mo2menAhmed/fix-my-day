import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { getPlanById } from "../data/plans";
import { useLanguage } from "../i18n/LanguageContext";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import type { ScreenProps } from "../types/navigation";

export function FocusTimerScreen({ navigation, route }: ScreenProps<"FocusTimer">) {
  const { language, t, textDirection } = useLanguage();
  const plan = getPlanById(route.params.planId, language);
  const initialSeconds = route.params.minutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progress = 1 - secondsLeft / initialSeconds;

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
  }, [isRunning, secondsLeft]);

  const timeLabel = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  }

  const statusLabel = secondsLeft === 0
    ? t.timer.complete
    : isRunning
      ? t.timer.inProgress
      : secondsLeft === initialSeconds
        ? t.timer.ready
        : t.timer.paused;

  return (
    <Screen scroll={false}>
      <View style={styles.wrapper}>
        <SectionHeader
          eyebrow={plan?.category ?? t.timer.focus}
          title={plan?.title ?? t.timer.recoveryFocus}
          body={t.timer.body}
        />

        <View style={styles.timerCard}>
          <Text style={[styles.status, textDirection]}>{statusLabel}</Text>
          <Text style={styles.timer}>{timeLabel}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
          <Text style={[styles.timerHint, textDirection]}>
            {secondsLeft === 0
              ? t.timer.completeHint
              : isRunning
                ? t.timer.runningHint
                : t.timer.readyHint}
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label={isRunning ? t.timer.pause : secondsLeft === 0 ? t.timer.runAgain : t.timer.start}
            onPress={() => (secondsLeft === 0 ? resetTimer() : setIsRunning((current) => !current))}
          />
          <PrimaryButton label={t.timer.reset} variant="ghost" onPress={resetTimer} />
          <PrimaryButton
            label={secondsLeft === 0 ? t.timer.saveCompletion : t.timer.finishReflect}
            variant="soft"
            onPress={() => navigation.navigate("Reflection", { planId: route.params.planId, minutes: route.params.minutes })}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: spacing.xl,
    justifyContent: "space-between"
  },
  timerCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    gap: spacing.md,
    minHeight: 260,
    padding: spacing.xl
  },
  status: {
    color: colors.accentDark,
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  timer: {
    color: colors.ink,
    fontSize: 68,
    fontVariant: ["tabular-nums"],
    fontWeight: "800"
  },
  timerHint: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    textAlign: "center"
  },
  progressTrack: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 999,
    height: 10,
    overflow: "hidden",
    width: "100%"
  },
  progressFill: {
    backgroundColor: colors.accent,
    borderRadius: 999,
    height: 10
  },
  actions: {
    gap: spacing.md
  }
});
