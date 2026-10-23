import type { OAuthAuth } from "../../../manifest";
import type { AuthContext } from "../../types/auth-context";
import type { CodeExchange } from "../../types/oauth/code-exchange";
import { requestToken } from "./request-token";

export const exchangeAuthorizationCode = (
  auth: OAuthAuth,
  { code, verifier, redirectUri }: CodeExchange,
  serverName: string,
  context: AuthContext,
) =>
  requestToken(
    auth,
    {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    },
    serverName,
    context,
  );
