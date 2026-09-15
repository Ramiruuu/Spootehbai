/**
 * Core authenticated user record returned by the backend after login or register.
 *
 * Used in the register/login flow to hydrate the current session and drive
 * profile rendering in the app.
 */
export type User = {
  id: string;
  username: string;
  email: string;
  region?: string;
  dialect?: string;
};

/**
 * Credentials submitted by the user during the login flow.
 *
 * The UI collects these fields from the sign-in form and sends them to the auth
 * service for validation.
 */
export type LoginCredentials = {
  email: string;
  password: string;
};

/**
 * Payload used by the register flow to create a new account.
 *
 * This is the contract for the sign-up form and the backend registration API.
 */
export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  region: string;
  dialect: string;
};

/**
 * Successful authentication result returned by login or register endpoints.
 *
 * The app stores the tokens securely and uses the user object to represent the
 * signed-in state across the app.
 */
export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

/**
 * Standard auth failure contract for validation or credential errors.
 *
 * Used across the login/register flow to surface errors in a consistent shape to
 * the UI and support retry messaging.
 */
export type AuthError = {
  code: string;
  message: string;
};
