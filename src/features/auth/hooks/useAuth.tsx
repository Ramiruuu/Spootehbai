/**
 * Authentication context and hook for the app.
 *
 * This single boundary centralizes user state, session restoration, and auth
 * logic so screens can consume a simple hook without directly coordinating API
 * calls or secure token storage.
 */

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import * as secureStore from "../../../services/secureStore";
import {
    login as loginApi,
    logout as logoutApi,
    refresh as refreshApi,
    register as registerApi,
} from "../services/authApi";
import type {
    AuthError,
    LoginCredentials,
    RegisterPayload,
    User,
} from "../types";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Stores the authenticated session in secure storage and updates the in-memory user.
 */
async function persistAuthSession(
  user: User,
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  await Promise.all([
    secureStore.saveAccessToken(accessToken),
    secureStore.saveRefreshToken(refreshToken),
  ]);
}

/**
 * Provider that exposes the auth state to the rest of the application.
 */
export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | null>(null);

  /**
   * Clears the user session and removes secure storage tokens from the device.
   */
  const clearSession = async (): Promise<void> => {
    setUser(null);
    setError(null);
    await secureStore.deleteAllTokens();
  };

  /**
   * Restores a saved session on app launch using the refresh token if available.
   *
   * This is done silently: if the refresh token is missing or invalid, the app
   * simply falls back to an unauthenticated state without blocking the UI.
   */
  useEffect(() => {
    let isMounted = true;

    async function restoreSession(): Promise<void> {
      try {
        const refreshToken = await secureStore.getRefreshToken();

        if (!refreshToken) {
          if (isMounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        const response = await refreshApi(refreshToken);

        if (isMounted) {
          await persistAuthSession(
            response.user,
            response.accessToken,
            response.refreshToken,
          );
          setUser(response.user);
          setError(null);
        }
      } catch {
        if (isMounted) {
          await clearSession();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Signs in an existing user and persists the received tokens securely.
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi(credentials);
      await persistAuthSession(
        response.user,
        response.accessToken,
        response.refreshToken,
      );
      setUser(response.user);
    } catch (authError) {
      setError(authError as AuthError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registers a new user and immediately stores the returned secure tokens.
   */
  const register = async (payload: RegisterPayload): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerApi(payload);
      await persistAuthSession(
        response.user,
        response.accessToken,
        response.refreshToken,
      );
      setUser(response.user);
    } catch (authError) {
      setError(authError as AuthError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Signs out the user, clears the secure token store, and resets app state.
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutApi().catch(() => undefined);
    } finally {
      await clearSession();
      setIsLoading(false);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      error,
      login,
      register,
      logout,
    }),
    [user, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook used by screens and components to access the authenticated app state.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
