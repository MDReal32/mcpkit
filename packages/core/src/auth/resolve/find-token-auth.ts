import type { InteractiveAuth } from '../../manifest';
import { toAuthKey } from '../secrets/to-auth-key';
import type { StoredToken } from '../types/oauth/stored-token';

/** Tokens saved before `authKey` existed belong to the first OAuth2 entry. */
export const findTokenAuth = (entries: readonly InteractiveAuth[], token: StoredToken) => {
  if (token.authKey === undefined) {
    return entries[0];
  }
  return entries.find((entry) => toAuthKey(entry) === token.authKey);
};
