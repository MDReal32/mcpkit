import { isJsonObject } from "../../../json";
import { AuthError } from "../../auth-error";
import { MS_PER_SECOND } from "../../const";
import type { StoredToken } from "../../types/oauth/stored-token";

/** Some providers (GitHub) report token errors with HTTP 200, so the body decides. */
export const parseTokenResponse = (body: unknown, status: number, serverName: string, now: number) => {
  if (!isJsonObject(body)) {
    throw new AuthError(`${serverName}: token endpoint returned ${status} without a JSON body`);
  }
  if (typeof body.error === "string") {
    const detail = typeof body.error_description === "string" ? body.error_description : body.error;
    throw new AuthError(`${serverName}: token request failed: ${detail}`);
  }
  if (typeof body.access_token !== "string") {
    throw new AuthError(`${serverName}: token endpoint returned ${status} without an access_token`);
  }
  const token: StoredToken = {
    accessToken: body.access_token,
    tokenType: typeof body.token_type === "string" ? body.token_type : "bearer",
    refreshToken: typeof body.refresh_token === "string" ? body.refresh_token : undefined,
    expiresAt: typeof body.expires_in === "number" ? now + body.expires_in * MS_PER_SECOND : undefined,
    scope: typeof body.scope === "string" ? body.scope : undefined,
  };
  return token;
};
