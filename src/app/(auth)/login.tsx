import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { contentMaxWidth, scale, verticalScale } from "@/constants/layout";
import { Typography } from "@/constants/typography";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoPlaceholder} />
          <LoginForm />
          <Link href="/(auth)/register" style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              Don't have an account? Sign up
            </Text>
          </Link>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.spotifyBlack,
  },
  inner: {
    flex: 1,
    width: "100%",
    maxWidth: contentMaxWidth,
    alignSelf: "center",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(60),
    paddingBottom: verticalScale(40),
  },
  logoPlaceholder: {
    width: "100%",
    height: verticalScale(100),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(24),
  },
  signUpLink: {
    marginTop: verticalScale(32),
    paddingVertical: 8,
    alignSelf: "center",
  },
  signUpText: {
    ...Typography.link,
    color: Colors.spotifyGreen,
    fontWeight: "700",
  },
});
