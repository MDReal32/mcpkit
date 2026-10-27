import type { AuthContext } from "../auth";
import type { Env } from "../env";

export interface ExecuteOptions {
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  env?: Env;
  onAuthorizationUrl?: AuthContext["onAuthorizationUrl"];
  projectDir?: AuthContext["projectDir"];
  secretStore?: AuthContext["secretStore"];
  requestCredentials?: AuthContext["requestCredentials"];
}
