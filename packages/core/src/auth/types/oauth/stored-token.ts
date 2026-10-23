export interface StoredToken {
  accessToken: string;
  tokenType: string;
  refreshToken?: string;
  /** Epoch milliseconds; absent when the provider issues non-expiring tokens. */
  expiresAt?: number;
  scope?: string;
  /** Identifies the manifest auth entry that issued the token, so it is refreshed against the same endpoint. */
  authKey?: string;
}
