import type { StoredToken } from './stored-token';

export interface SignInResult {
  token: StoredToken;
  tokensFile: string;
}
