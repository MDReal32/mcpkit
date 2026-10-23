import type { OAuthAuth } from "../../../manifest";
import { AuthError } from "../../auth-error";
import { saveToken } from "../../token-store/save-token";
import type { AuthContext } from "../../types/auth-context";
import type { StoredToken } from "../../types/oauth/stored-token";
import { requestToken } from "../sign-in/request-token";

/** Providers may omit refresh_token on refresh; the previous one then stays valid. */
export const refreshStoredToken = async (
  serverName: string,
  auth: OAuthAuth,
  token: StoredToken,
  context: AuthContext,
) => {
  if (!token.refreshToken) {
    throw new AuthError(`${serverName}: the stored session expired and has no refresh token`);
  }
  const fresh = await requestToken(
    auth,
    { grant_type: "refresh_token", refresh_token: token.refreshToken },
    serverName,
    context,
  );
  const refreshed: StoredToken = {
    ...fresh,
    refreshToken: fresh.refreshToken ?? token.refreshToken,
    authKey: token.authKey,
  };
  await saveToken(context.env, serverName, refreshed);
  return refreshed;
};
