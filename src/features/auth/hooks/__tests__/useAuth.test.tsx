import { AuthProvider, useAuth } from "@/features/auth/hooks/useAuth";
import * as authApi from "@/features/auth/services/authApi";
import * as secureStore from "@/services/secureStore";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import type { ReactNode } from "react";

jest.mock("@/features/auth/services/authApi");
jest.mock("@/services/secureStore");

const mockedAuthApi = jest.mocked(authApi);
const mockedSecureStore = jest.mocked(secureStore);

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

beforeEach(() => {
  jest.clearAllMocks();
  mockedAuthApi.register.mockResolvedValue({
    user: { id: "u0", username: "x", email: "x@example.com" },
    accessToken: "a",
    refreshToken: "r",
  });
  mockedAuthApi.login.mockResolvedValue({
    user: { id: "u0", username: "x", email: "x@example.com" },
    accessToken: "a",
    refreshToken: "r",
  });
  mockedAuthApi.logout.mockResolvedValue(undefined);
  mockedSecureStore.getAccessToken.mockResolvedValue(null);
  mockedSecureStore.getRefreshToken.mockResolvedValue(null);
});

describe("useAuth", () => {
  it("restores an existing session on mount when a refresh token is available", async () => {
    mockedSecureStore.getRefreshToken.mockResolvedValue("refresh-token");
    mockedAuthApi.refresh.mockResolvedValue({
      user: { id: "u1", username: "demo", email: "demo@example.com" },
      accessToken: "new-access",
      refreshToken: "new-refresh",
    });

    const { result } = await renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.user?.id).toBe("u1");
  });

  it("logs in the user and persists tokens securely", async () => {
    mockedAuthApi.login.mockResolvedValue({
      user: { id: "u2", username: "alice", email: "alice@example.com" },
      accessToken: "access-123",
      refreshToken: "refresh-123",
    });

    const { result } = await renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.login({
        email: "alice@example.com",
        password: "secret123",
      });
    });

    expect(result.current.user?.email).toBe("alice@example.com");
  });

  it("clears the session and tokens on logout", async () => {
    const { result } = await renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
