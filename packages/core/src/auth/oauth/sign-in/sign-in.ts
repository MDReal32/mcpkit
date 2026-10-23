import type { InteractiveAuth } from "../../../manifest";
import { DEFAULT_REDIRECT_PORT, SIGN_IN_TIMEOUT_MS } from "../../const";
import { toAuthKey } from "../../secrets/to-auth-key";
import { saveToken } from "../../token-store/save-token";
import type { SignInOptions } from "../../types/oauth/sign-in-options";
import type { SignInResult } from "../../types/oauth/sign-in-result";
import type { StoredToken } from "../../types/oauth/stored-token";
import { buildAuthorizationUrl } from "../pkce/build-authorization-url";
import { createPkcePair } from "../pkce/create-pkce-pair";
import { createRandomToken } from "../pkce/create-random-token";
import { exchangeAuthorizationCode } from "./exchange-authorization-code";
import { listenForCallback } from "./listen-for-callback";
import { readAuthorizationCode } from "./read-authorization-code";
import { waitWithTimeout } from "./wait-with-timeout";

/** Runs the authorization code + PKCE flow through a loopback redirect and stores the token. */
export const signIn = async (
  serverName: string,
  auth: InteractiveAuth,
  { context, onAuthorizationUrl }: SignInOptions,
) => {
  const { verifier, challenge } = createPkcePair();
  const state = createRandomToken();
  const listener = await listenForCallback(auth.redirectPort ?? DEFAULT_REDIRECT_PORT);
  try {
    const { redirectUri } = listener;
    onAuthorizationUrl(buildAuthorizationUrl(auth, { redirectUri, challenge, state }));
    const params = await waitWithTimeout(listener.params, SIGN_IN_TIMEOUT_MS, `${serverName}: sign-in timed out`);
    const code = readAuthorizationCode(params, state, serverName);
    const exchanged = await exchangeAuthorizationCode(auth, { code, verifier, redirectUri }, serverName, context);
    const token: StoredToken = { ...exchanged, authKey: toAuthKey(auth) };
    const result: SignInResult = { token, tokensFile: await saveToken(context.env, serverName, token) };
    return result;
  } finally {
    await listener.close();
  }
};
