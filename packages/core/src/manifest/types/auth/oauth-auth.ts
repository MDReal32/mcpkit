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
  /** Extra query parameters on the authorization URL, e.g. a provider's flag for a long-lived refresh token. */
  authorizationParams?: Readonly<Record<string, string>>;
  /** Where the client id and secret travel on token requests: the form body (default) or an HTTP Basic header (an absent secret is sent empty). */
  clientAuthentication?: "body" | "basic";
  /** Extra headers on token requests, for providers that reject anonymous clients. */
  tokenHeaders?: Readonly<Record<string, string>>;
}
