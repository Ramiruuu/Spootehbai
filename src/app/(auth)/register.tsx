import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { contentMaxWidth, scale, verticalScale } from "@/constants/layout";
import { Typography } from "@/constants/typography";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoPlaceholder} />
          <RegisterForm />
          <Link href="/(auth)/login" style={styles.signInLink}>
            <Text style={styles.signInText}>
              Already have an account? Sign in
            </Text>
          </Link>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  signInLink: {
    marginTop: verticalScale(32),
    paddingVertical: 8,
    alignSelf: "center",
  },
  signInText: {
    ...Typography.link,
    color: Colors.spotifyGreen,
    fontWeight: "700",
  },
});
