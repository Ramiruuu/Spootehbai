import { StyleSheet, View } from "react-native";

import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterScreen() {
  return (
    <View style={styles.screen}>
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F5F7FB",
  },
});
