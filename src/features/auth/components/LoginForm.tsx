import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const emailError = useMemo(() => {
    if (!email.trim()) return "Email is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return "Enter a valid email address.";
    return "";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password.trim()) return "Password is required.";
    return "";
  }, [password]);

  const submitDisabled = Boolean(emailError || passwordError || isLoading);

  const handleSubmit = async (): Promise<void> => {
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

      <Button
        title="Log In"
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
