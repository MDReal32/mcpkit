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
  const secret = auth.clientSecretEnv ? readSecret(env, auth.clientSecretEnv, serverName) : undefined;
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    ...auth.tokenHeaders,
  };
  const body = new URLSearchParams(grant);
  if (auth.clientAuthentication === "basic") {
    headers.Authorization = `Basic ${Buffer.from(`${auth.clientId}:${secret ?? ""}`).toString("base64")}`;
  } else {
    body.set("client_id", auth.clientId);
    if (secret !== undefined) {
      body.set("client_secret", secret);
    }
  }
  const response = await fetchImpl(auth.tokenUrl, {
    method: "POST",
    headers,
    body,
    signal: AbortSignal.timeout(TOKEN_REQUEST_TIMEOUT_MS),
  });
  return parseTokenResponse(await readJsonBody(response, serverName), response.status, serverName, Date.now());
};
