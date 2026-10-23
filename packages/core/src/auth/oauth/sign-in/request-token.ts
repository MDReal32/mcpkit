import type { OAuthAuth } from "../../../manifest";
import { TOKEN_REQUEST_TIMEOUT_MS } from "../../const";
import { readSecret } from "../../secrets/read-secret";
import type { AuthContext } from "../../types/auth-context";
import { parseTokenResponse } from "./parse-token-response";
import { readJsonBody } from "./read-json-body";

export const requestToken = async (
  auth: OAuthAuth,
  grant: Readonly<Record<string, string>>,
  serverName: string,
  { env, fetchImpl }: AuthContext,
) => {
  const clientSecret: Readonly<Record<string, string>> = auth.clientSecretEnv
    ? { client_secret: readSecret(env, auth.clientSecretEnv, serverName) }
    : {};
  const response = await fetchImpl(auth.tokenUrl, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ ...grant, client_id: auth.clientId, ...clientSecret }),
    signal: AbortSignal.timeout(TOKEN_REQUEST_TIMEOUT_MS),
  });
  return parseTokenResponse(await readJsonBody(response, serverName), response.status, serverName, Date.now());
};
