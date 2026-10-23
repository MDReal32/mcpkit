import type { StoredToken } from '../../types/oauth/stored-token';

/** Refresh tokens can rotate, so concurrent tool calls for one server must share a single refresh. */
export const pendingRefreshes = new Map<string, Promise<StoredToken>>();
