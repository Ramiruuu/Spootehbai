/**
 * API boundary for authentication related requests.
 *
 * This service keeps all network concerns out of UI code and components. The app
 * can swap the backend implementation or mock this layer in tests without
 * changing screen logic.
 */

import type {
    AuthError,
    AuthResponse,
    LoginCredentials,
    RegisterPayload
} from "../types";

const DEFAULT_API_BASE_URL = "https://api.spootehbai.com";
const API_BASE_URL = ensureHttpsBaseUrl(
  process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL,
);

/**
 * Validates the configured backend base URL.
 *
 * The auth flow must only communicate over HTTPS to reduce the risk of token or
 * credential exposure during transit. This guard prevents accidental insecure
 * endpoints from being used in production.
 */
function ensureHttpsBaseUrl(url: string): string {
  if (!url.startsWith("https://")) {
    throw new Error("Authentication API base URL must use https://");
  }

  return url;
}

/**
 * Converts a failed HTTP response into a typed auth error.
 */
async function parseAuthError(response: Response): Promise<AuthError> {
  let payload: Partial<AuthError> & { message?: string; code?: string } = {};

  try {
    payload = (await response.json()) as Partial<AuthError> & {
      message?: string;
      code?: string;
    };
  } catch {
    payload = {};
  }

  return {
    code: payload.code ?? "AUTH_ERROR",
    message: payload.message ?? "Authentication request failed.",
  };
}

/**
 * Executes a typed authentication request against the configured API endpoint.
 *
 * This helper centralizes request setup, JSON handling, and error translation so
 * the auth screens remain focused on user interaction instead of transport code.
 */
async function request<T>(path: string, init: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const authError = await parseAuthError(response);
    throw authError;
  }

  return (await response.json()) as T;
}

/**
 * Creates a new user account as part of the register flow.
 *
 * The UI submits the registration form payload here; the backend returns the
 * authenticated user plus secure tokens.
 */
export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Signs in an existing user as part of the login flow.
 *
 * The UI sends user credentials to this API method, which returns a session with
 * tokens and user information for secure storage and app state hydration.
 */
export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

/**
 * Refreshes the active session using the current refresh token.
 *
 * This allows the app to keep the user signed in without requiring a fresh login
 * whenever the access token expires.
 */
export async function refresh(refreshToken: string): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

/**
 * Ends the active user session on the backend.
 *
 * The logout flow clears server-side session state while the app separately
 * removes locally stored secure tokens.
 */
export async function logout(): Promise<void> {
  await request<{ success: boolean }>("/auth/logout", {
    method: "POST",
  });
}
