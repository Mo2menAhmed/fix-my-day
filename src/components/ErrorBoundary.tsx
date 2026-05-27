import { Component, ErrorInfo, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  errorMessage: string | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    errorMessage: null
  };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.message || "Unknown startup error" };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[FixMyDay] Unhandled runtime error", error, info.componentStack);
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Fix My Day needs a restart</Text>
          <Text style={styles.body}>
            The app hit a startup error. Close it completely and open it again.
          </Text>
          <Text style={styles.detail}>{this.state.errorMessage}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    backgroundColor: colors.background,
    flex: 1,
    gap: spacing.md,
    justifyContent: "center",
    padding: spacing.xl
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32
  },
  body: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23
  },
  detail: {
    color: colors.warning,
    fontSize: 13,
    lineHeight: 19
  }
});
