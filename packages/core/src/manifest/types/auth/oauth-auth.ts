/** OAuth 2.0 authorization code flow with PKCE; the browser sign-in starts on the first tool call without a stored token. */
export interface OAuthAuth {
  type: "oauth";
  authorizationUrl: string;
  tokenUrl: string;
  clientId: string;
  clientSecretEnv?: string;
  scopes?: readonly string[];
  /** Loopback port for the redirect URI; 0 picks a free port. */
  redirectPort?: number;
}
