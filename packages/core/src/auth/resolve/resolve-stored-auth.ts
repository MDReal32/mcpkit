import type { AuthSpec } from '../../manifest';
import { isInteractiveAuth } from '../../manifest';
import { AuthError } from '../auth-error';
import { readFreshAccessToken } from '../oauth/refresh/read-fresh-access-token';
import { readStoredToken } from '../token-store/read-stored-token';
import type { AuthContext } from '../types/auth-context';
import { createResolvedAuth } from './create-resolved-auth';
import { findTokenAuth } from './find-token-auth';

/** The server's token from `tokens.json`, refreshed against the OAuth2 entry that issued it. */
export const resolveStoredAuth = async (serverName: string, auth: readonly AuthSpec[], context: AuthContext) => {
  const stored = await readStoredToken(context.env, serverName);
  if (!stored) {
    throw new AuthError(`${serverName}: not signed in yet`);
  }
  const issuer = findTokenAuth(auth.filter(isInteractiveAuth), stored);
  if (!issuer) {
    throw new AuthError(`${serverName}: the stored token comes from an auth entry that is no longer in the manifest`);
  }
  const accessToken = await readFreshAccessToken(serverName, issuer, stored, context);
  return createResolvedAuth({ Authorization: `Bearer ${accessToken}` });
};
