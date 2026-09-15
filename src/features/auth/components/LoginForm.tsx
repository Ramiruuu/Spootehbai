import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Colors } from "@/constants/colors";
import { verticalScale } from "@/constants/layout";
import { Typography } from "@/constants/typography";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function LoginForm() {
  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const emailError = hasSubmitted
    ? !email.trim()
      ? "Email is required."
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Enter a valid email address."
    : "";
  const passwordError =
    hasSubmitted && !password.trim() ? "Password is required." : "";

  const handleSubmit = async (): Promise<void> => {
    setHasSubmitted(true);
    const nextEmailError = !email.trim()
      ? "Email is required."
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Enter a valid email address.";

    const nextPasswordError = !password.trim() ? "Password is required." : "";

    if (nextEmailError || nextPasswordError) {
      setLocalError(nextEmailError || nextPasswordError);
      return;
    }

    setLocalError("");

    try {
      await login({ email, password });
    } catch {
      // The hook already stores the auth error for UI display.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome back to Spootehbai</Text>
      <Text style={styles.subtext}>
        Listen to Bisaya music, curated for you.
      </Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={emailError || localError}
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        error={passwordError}
      />

      {error ? <Text style={styles.authError}>{error.message}</Text> : null}

      <Text style={styles.forgotPassword}>Forgot password?</Text>

      <Button
        title="Log In"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: verticalScale(16),
  },
  authError: {
    ...Typography.error,
    color: Colors.error,
  },
  heading: {
    ...Typography.title,
    color: Colors.spotifyWhite,
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
  subtext: {
    ...Typography.subtitle,
    color: Colors.lightGray,
    textAlign: "center",
    marginBottom: verticalScale(32),
  },
  forgotPassword: {
    ...Typography.link,
    color: Colors.lightGray,
    textAlign: "center",
    marginTop: verticalScale(8),
    textDecorationLine: "underline",
  },
});
