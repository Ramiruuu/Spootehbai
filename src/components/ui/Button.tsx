import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    type PressableProps,
} from "react-native";

import { Colors } from "@/constants/colors";
import { scale, verticalScale } from "@/constants/layout";
import { Typography } from "@/constants/typography";

export type ButtonProps = PressableProps & {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "ghost";
};

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={(state) => [
        styles.button,
        variant === "primary" ? styles.primary : styles.ghost,
        isDisabled && styles.disabled,
        state.pressed && !isDisabled && styles.pressed,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" ? Colors.spotifyBlack : Colors.spotifyGreen
          }
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "primary" ? styles.primaryText : styles.ghostText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: scale(26),
    height: verticalScale(52),
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  primary: {
    backgroundColor: Colors.spotifyGreen,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    ...Typography.button,
  },
  primaryText: {
    color: Colors.spotifyBlack,
  },
  ghostText: {
    color: Colors.spotifyWhite,
  },
});
