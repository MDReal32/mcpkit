import type { OAuthAuth } from '../../../manifest';
import type { AuthContext } from '../../types/auth-context';
import type { StoredToken } from '../../types/oauth/stored-token';
import { pendingRefreshes } from './pending-refreshes';
import { refreshStoredToken } from './refresh-stored-token';

export const refreshOnce = (serverName: string, auth: OAuthAuth, token: StoredToken, context: AuthContext) => {
  const pending = pendingRefreshes.get(serverName);
  if (pending) {
    return pending;
  }
  const refresh = refreshStoredToken(serverName, auth, token, context).finally(() => {
    pendingRefreshes.delete(serverName);
  });
  pendingRefreshes.set(serverName, refresh);
  return refresh;
};
