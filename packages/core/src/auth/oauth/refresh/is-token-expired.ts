import { EXPIRY_SKEW_MS } from '../../const';
import type { StoredToken } from '../../types/oauth/stored-token';

export const isTokenExpired = (token: StoredToken, now: number) =>
  token.expiresAt !== undefined && token.expiresAt - EXPIRY_SKEW_MS <= now;
