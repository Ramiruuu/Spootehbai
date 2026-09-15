import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Base design width - iPhone 14 (390pt). Everything scales relative to this.
const BASE_WIDTH = 390;

export function scale(size: number): number {
  const factor = SCREEN_WIDTH / BASE_WIDTH;
  // Clamp so tiny screens do not shrink too much and tablets do not balloon.
  const clamped = Math.min(Math.max(factor, 0.85), 1.35);
  return Math.round(PixelRatio.roundToNearestPixel(size * clamped));
}

export function verticalScale(size: number): number {
  return scale(size);
}

// Breakpoint: tablets get a constrained content width.
export const isTablet = SCREEN_WIDTH >= 768;
export const contentMaxWidth = isTablet ? 480 : "100%";
