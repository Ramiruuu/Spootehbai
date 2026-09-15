import {
    StyleSheet,
    Text,
    TextInput,
    View,
    type TextInputProps,
} from "react-native";

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
        placeholderTextColor="#8A8A8A"
        style={[
          styles.input,
          hasError && styles.inputError,
          rest.style as object,
        ]}
        {...rest}
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
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#1D1D1F",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    marginTop: 6,
    color: "#DC2626",
    fontSize: 12,
  },
});
