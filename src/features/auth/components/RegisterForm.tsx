import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Colors } from "@/constants/colors";
import { scale, verticalScale } from "@/constants/layout";
import { Typography } from "@/constants/typography";
import { useAuth } from "@/features/auth/hooks/useAuth";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function RegisterForm() {
  const router = useRouter();
  const { register, error, isLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const parsedAge = Number(age);

    if (!firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!age.trim()) {
      nextErrors.age = "Age is required.";
    } else if (!Number.isInteger(parsedAge) || parsedAge < 13) {
      nextErrors.age = "You must be at least 13 years old.";
    }
    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = async (): Promise<void> => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      await register({
        firstName: firstName.trim(),
        middleName: middleName.trim() || undefined,
        lastName: lastName.trim(),
        age: Number(age),
        email: email.trim(),
        password,
      });
      router.replace("/(auth)/login");
    } catch {
      // The auth hook exposes the API error for display below.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Sign up to start listening on Spootehbai
      </Text>
      <Text style={styles.subtext}>It's free and only takes a minute.</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Input
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            error={errors.firstName}
          />
        </View>
        <View style={styles.column}>
          <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            error={errors.lastName}
          />
        </View>
      </View>

      <Input
        label="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
        autoCapitalize="words"
        error={errors.middleName}
      />

      <Input
        label="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        error={errors.age}
      />

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={errors.email}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.password}
          />
        </View>
        <View style={styles.column}>
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.confirmPassword}
          />
        </View>
      </View>

      {error ? <Text style={styles.authError}>{error.message}</Text> : null}

      <Button
        title="Sign Up"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
      />

      <Text style={styles.note}>By signing up, you agree to our Terms.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.spotifyBlack,
    gap: verticalScale(16),
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
    marginBottom: verticalScale(16),
  },
  row: {
    flexDirection: "row",
    gap: scale(12),
  },
  column: {
    flex: 1,
  },
  authError: {
    ...Typography.error,
    color: Colors.error,
  },
  submitButton: {
    backgroundColor: Colors.spotifyGreen,
    borderRadius: scale(26),
    height: verticalScale(52),
    marginTop: verticalScale(8),
  },
  note: {
    ...Typography.caption,
    color: Colors.lightGray,
    marginTop: verticalScale(8),
    textAlign: "center",
  },
});
