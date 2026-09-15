import {
    StyleSheet,
    Text,
    TextInput,
    View,
    type TextInputProps,
} from "react-native";

import { Colors } from "@/constants/colors";
import { scale, verticalScale } from "@/constants/layout";
import { Typography } from "@/constants/typography";

export type InputProps = TextInputProps & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
};

export function Input({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  style,
  ...rest
}: InputProps) {
  const hasError = Boolean(error && error.trim().length > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Colors.lightGray}
        {...rest}
        style={[styles.input, hasError && styles.inputError, style]}
      />
      {hasError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    ...Typography.label,
    marginBottom: verticalScale(6),
    color: Colors.spotifyWhite,
  },
  input: {
    ...Typography.input,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: scale(8),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    backgroundColor: "transparent",
    color: Colors.spotifyWhite,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    ...Typography.error,
    marginTop: verticalScale(4),
    color: Colors.error,
  },
});
