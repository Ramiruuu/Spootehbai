/**
 * Core authenticated user record returned after a successful login or register.
 *
 * This is the shape the app uses to represent the signed-in user across the
 * auth flow and downstream screens.
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
 * The sign-in form collects these values and sends them to the auth service for
 * validation.
 */
export type LoginCredentials = {
  email: string;
  password: string;
};

/**
 * Payload used by the register flow when creating a new account.
 *
 * This contract matches the sign-up form fields and the backend registration
 * request body.
 */
export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  region: string;
  dialect: string;
};

/**
 * Successful response returned after login or register succeeds.
 *
 * The UI can use this contract to update auth state, store tokens securely, and
 * render the current user profile.
 */
export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

/**
 * Standard error object used by failed register or login attempts.
 *
 * The UI can display this contract consistently for validation, auth failures,
 * and retry messaging.
 */
export type AuthError = {
  code: string;
  message: string;
};
