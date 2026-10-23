import type { InteractiveAuth } from "../../../manifest";
import type { AuthContext } from "../../types/auth-context";
import type { StoredToken } from "../../types/oauth/stored-token";
import { isTokenExpired } from "./is-token-expired";
import { refreshOnce } from "./refresh-once";

export const readFreshAccessToken = async (
  serverName: string,
  auth: InteractiveAuth,
  stored: StoredToken,
  context: AuthContext,
) => {
  if (!isTokenExpired(stored, Date.now())) {
    return stored.accessToken;
  }
  const refreshed = await refreshOnce(serverName, auth, stored, context);
  return refreshed.accessToken;
};
