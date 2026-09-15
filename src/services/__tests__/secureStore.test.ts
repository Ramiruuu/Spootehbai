import * as SecureStore from "expo-secure-store";

jest.mock("expo-secure-store");

const mockedSecureStore = jest.mocked(SecureStore);

import {
    deleteAllTokens,
    getAccessToken,
    getRefreshToken,
    saveAccessToken,
    saveRefreshToken,
} from "../secureStore";

describe("secureStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves the access token securely", async () => {
    mockedSecureStore.setItemAsync.mockResolvedValue(undefined);

    await saveAccessToken("access-token");

    expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith(
      "spootehbai_access_token",
      "access-token",
    );
  });

  it("returns the saved access token when it exists", async () => {
    mockedSecureStore.getItemAsync.mockResolvedValue("access-token");

    const result = await getAccessToken();

    expect(result).toBe("access-token");
    expect(mockedSecureStore.getItemAsync).toHaveBeenCalledWith(
      "spootehbai_access_token",
    );
  });

  it("returns null when the access token is missing", async () => {
    mockedSecureStore.getItemAsync.mockResolvedValue(null);

    const result = await getAccessToken();

    expect(result).toBeNull();
  });

  it("saves the refresh token securely", async () => {
    mockedSecureStore.setItemAsync.mockResolvedValue(undefined);

    await saveRefreshToken("refresh-token");

    expect(mockedSecureStore.setItemAsync).toHaveBeenCalledWith(
      "spootehbai_refresh_token",
      "refresh-token",
    );
  });

  it("returns the saved refresh token when it exists", async () => {
    mockedSecureStore.getItemAsync.mockResolvedValue("refresh-token");

    const result = await getRefreshToken();

    expect(result).toBe("refresh-token");
    expect(mockedSecureStore.getItemAsync).toHaveBeenCalledWith(
      "spootehbai_refresh_token",
    );
  });

  it("clears all auth tokens", async () => {
    mockedSecureStore.deleteItemAsync.mockResolvedValue(undefined);

    await deleteAllTokens();

    expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalledWith(
      "spootehbai_access_token",
    );
    expect(mockedSecureStore.deleteItemAsync).toHaveBeenCalledWith(
      "spootehbai_refresh_token",
    );
  });
});
