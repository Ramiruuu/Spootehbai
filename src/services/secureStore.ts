/**
 * Secure token storage for authenticated app state.
 *
 * This service intentionally uses expo-secure-store instead of AsyncStorage so
 * bearer tokens and refresh tokens are kept in the platform keystore (iOS
 * Keychain / Android Keystore) rather than in plain app-level persisted storage.
 * This reduces the risk of credential exposure through app data backups or
 * untrusted local storage access.
 */

import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "spootehbai_access_token";
const REFRESH_TOKEN_KEY = "spootehbai_refresh_token";

/**
 * Persists the access token in the device keystore for authenticated API calls.
 *
 * Access tokens are short-lived credentials and should never be written to
 * AsyncStorage because that storage is not designed for sensitive data and is
 * much easier to access in a compromised environment.
 */
export async function saveAccessToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  } catch (error) {
    console.error("Failed to save access token securely.", error);
    throw error;
  }
}

/**
 * Reads the access token from secure storage when an authenticated request needs
 * to attach a bearer token.
 *
 * A null value is returned explicitly when no token exists so callers can handle
 * an unauthenticated state without relying on undefined behavior.
 */
export async function getAccessToken(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    return token === null ? null : token;
  } catch (error) {
    console.error("Failed to read access token securely.", error);
    return null;
  }
}

/**
 * Persists the refresh token in the device keystore so the app can renew access
 * without re-prompting the user unnecessarily.
 *
 * Refresh tokens are highly sensitive and must stay outside AsyncStorage to
 * maintain information assurance and reduce the chance of token theft.
 */
export async function saveRefreshToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  } catch (error) {
    console.error("Failed to save refresh token securely.", error);
    throw error;
  }
}

/**
 * Retrieves the refresh token when the app needs to exchange it for a new access
 * token after expiry.
 *
 * Returning null explicitly keeps the auth flow predictable and prevents
 * undefined values from silently breaking session checks.
 */
export async function getRefreshToken(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    return token === null ? null : token;
  } catch (error) {
    console.error("Failed to read refresh token securely.", error);
    return null;
  }
}

/**
 * Removes all stored auth tokens when the user logs out or the session is
 * intentionally invalidated.
 *
 * Clearing both token entries together ensures stale credentials cannot remain in
 * device storage after a sign-out operation.
 */
export async function deleteAllTokens(): Promise<void> {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  } catch (error) {
    console.error("Failed to clear auth tokens securely.", error);
    throw error;
  }
}
