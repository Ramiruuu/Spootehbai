# Security Policy

## Secure Storage

The app uses `expo-secure-store` for access and refresh tokens because it stores sensitive values in the platform-provided secure storage facilities, such as the iOS Keychain and Android Keystore. Tokens must not be moved to unencrypted local storage or persisted in application logs.

## Token Rotation

Access tokens are short-lived and refresh tokens are rotated whenever the authentication service issues a refreshed session. The client replaces stored tokens with the newest token pair and clears all stored tokens when logout occurs or refresh fails. Refresh tokens must never be reused after rotation.

## HTTPS-Only Policy

All authentication and token endpoints must use HTTPS. HTTP endpoints, insecure redirects, and mixed-content authentication requests are not permitted. Local development exceptions must remain isolated from production configuration.

## Logging Rules

Do not log access tokens, refresh tokens, passwords, authorization headers, session cookies, API keys, or complete authentication responses. Avoid logging personal information unless it is required for a safe diagnostic. Redact sensitive values before sending any diagnostic data to a logging service.
