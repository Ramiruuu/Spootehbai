export const Typography = {
  // Title - used for main screen headings ("Sign up to start listening...")
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700" as const,
    letterSpacing: -0.5,
  },
  // Subtitle - supporting text under headings
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400" as const,
    letterSpacing: 0,
  },
  // Section header - smaller bold text
  sectionHeader: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700" as const,
    letterSpacing: 0,
  },
  // Body - default text
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400" as const,
    letterSpacing: 0,
  },
  // Label - form field labels (uppercase-ish feel)
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600" as const,
    letterSpacing: 0.3,
  },
  // Button text - bold, slightly tighter
  button: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700" as const,
    letterSpacing: 0.2,
  },
  // Caption - footnotes, "By signing up..."
  caption: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "400" as const,
    letterSpacing: 0,
  },
  // Link - for "Sign in", "Forgot password?"
  link: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600" as const,
    letterSpacing: 0,
  },
  // Error - validation error text
  error: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400" as const,
    letterSpacing: 0,
  },
  // Input - text inside form fields
  input: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400" as const,
    letterSpacing: 0,
  },
} as const;
