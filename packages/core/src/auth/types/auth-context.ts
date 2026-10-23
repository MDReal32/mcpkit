import type { Env } from "../../env";
import type { CredentialRequest } from "./credentials/credential-request";
import type { CredentialResponse } from "./credentials/credential-response";
import type { SecretStore } from "./store/secret-store";

export interface AuthContext {
  env: Env;
  fetchImpl: typeof fetch;
  /** Shows the user the URL that starts a browser sign-in; without it a call never signs in. */
  onAuthorizationUrl?: (url: string) => void;
  /** Credentials saved from the credentials form; env vars win over them. */
  secretStore?: SecretStore;
  /** Asks the user for a domain and credentials when nothing provided works; without it no form is shown. */
  requestCredentials?: (request: CredentialRequest) => Promise<CredentialResponse>;
}
