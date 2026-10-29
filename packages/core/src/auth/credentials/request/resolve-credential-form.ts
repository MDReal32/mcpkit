import type { Manifest } from "../../../manifest";
import { applyDomain } from "../../../manifest";
import { AuthError } from "../../auth-error";
import { listKnownHosts } from "../../config/list-known-hosts";
import { loadConfig } from "../../config/load-config";
import { readServerConfig } from "../../config/read-server-config";
import type { AuthContext } from "../../types/auth-context";
import { resolveFormSignIn } from "../resolve/resolve-form-sign-in";
import { resolveFormToken } from "../resolve/resolve-form-token";
import { validateCredentialResponse } from "../response/validate-credential-response";
import { buildCredentialRequest } from "./build-credential-request";
import { requestCredentialsOnce } from "./request-credentials-once";

/** Asks the user for a domain and credentials, or to sign in; what they enter is saved once the API accepts it. */
export const resolveCredentialForm = async (manifest: Manifest, domain: string | undefined, context: AuthContext) => {
  const { requestCredentials } = context;
  if (!requestCredentials) {
    throw new AuthError(`${manifest.name}: asking for credentials needs a form, which this caller does not provide`);
  }
  const { request, response } = await requestCredentialsOnce(
    manifest.name,
    async () => {
      const knownHosts = listKnownHosts(readServerConfig(await loadConfig(context.env), manifest));
      return buildCredentialRequest(manifest, domain, knownHosts, context.env);
    },
    requestCredentials,
  );
  const errors = validateCredentialResponse(request, response);
  if (errors.length > 0) {
    throw new AuthError(`${manifest.name}: invalid credentials form answer: ${errors.join("; ")}`);
  }
  const chosen = response.domain ?? domain;
  const target = applyDomain(manifest, chosen);
  if (response.method === "sign-in") {
    return resolveFormSignIn(target, response, chosen, context);
  }
  return resolveFormToken(target, response, chosen, context);
};
