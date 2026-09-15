import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function RegisterForm() {
  const { register, error, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [dialect, setDialect] = useState("");
  const [localError, setLocalError] = useState("");

  const usernameError = useMemo(() => {
    if (!username.trim()) return "Username is required.";
    return "";
  }, [username]);

  const emailError = useMemo(() => {
    if (!email.trim()) return "Email is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return "Enter a valid email address.";
    return "";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password.trim()) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    return "";
  }, [password]);

  const regionError = useMemo(() => {
    if (!region.trim()) return "Region is required.";
    return "";
  }, [region]);

  const dialectError = useMemo(() => {
    if (!dialect.trim()) return "Dialect is required.";
    return "";
  }, [dialect]);

  const submitDisabled = Boolean(
    usernameError ||
    emailError ||
    passwordError ||
    regionError ||
    dialectError ||
    isLoading,
  );

  const handleSubmit = async (): Promise<void> => {
    const nextUsernameError = !username.trim() ? "Username is required." : "";
    const nextEmailError = !email.trim()
      ? "Email is required."
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Enter a valid email address.";
    const nextPasswordError = !password.trim()
      ? "Password is required."
      : password.length < 8
        ? "Password must be at least 8 characters."
        : "";
    const nextRegionError = !region.trim() ? "Region is required." : "";
    const nextDialectError = !dialect.trim() ? "Dialect is required." : "";

    if (
      nextUsernameError ||
      nextEmailError ||
      nextPasswordError ||
      nextRegionError ||
      nextDialectError
    ) {
      setLocalError(
        nextUsernameError ||
          nextEmailError ||
          nextPasswordError ||
          nextRegionError ||
          nextDialectError,
      );
      return;
    }

    setLocalError("");

    try {
      await register({
        username,
        email,
        password,
        region,
        dialect,
      });
    } catch {
      // The hook already stores the auth error for UI display.
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        error={usernameError || localError}
      />

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={emailError}
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

      <Input
        label="Region"
        value={region}
        onChangeText={setRegion}
        autoCapitalize="words"
        error={regionError}
      />

      <Input
        label="Dialect"
        value={dialect}
        onChangeText={setDialect}
        autoCapitalize="words"
        error={dialectError}
      />

      {error ? <Text style={styles.authError}>{error.message}</Text> : null}

      <Button
        title="Create Account"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={submitDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  authError: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 4,
  },
});
