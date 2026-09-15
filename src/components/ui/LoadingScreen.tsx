import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import { verticalScale } from "@/constants/layout";
import { Typography } from "@/constants/typography";

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.spotifyGreen} />
      <Text style={styles.text}>Loading Spootehbai...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.spotifyBlack,
  },
  text: {
    ...Typography.body,
    marginTop: verticalScale(16),
    color: Colors.lightGray,
  },
});
