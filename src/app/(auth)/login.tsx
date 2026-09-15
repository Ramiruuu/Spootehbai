import { StyleSheet, View } from "react-native";

import { LoginForm } from "../features/auth/components/LoginForm";

export default function LoginScreen(): JSX.Element {
  return (
    <View style={styles.screen}>
      <LoginForm />
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
