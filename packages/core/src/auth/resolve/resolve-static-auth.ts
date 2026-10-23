import type { Env } from "../../env";
import type { FallbackAuth } from "../../manifest";
import { AuthError } from "../auth-error";
import { readSecret } from "../secrets/read-secret";
import { createResolvedAuth } from "./create-resolved-auth";
import { encodeBasicCredentials } from "./encode-basic-credentials";

/** Builds a fallback entry's auth from its credential values, keyed by env var name. */
export const resolveStaticAuth = (auth: FallbackAuth, serverName: string, env: Env) => {
  switch (auth.type) {
    case "none":
      return createResolvedAuth();
    case "bearer":
      return createResolvedAuth({ Authorization: `Bearer ${readSecret(env, auth.env, serverName)}` });
    case "header":
      return createResolvedAuth({ [auth.name]: `${auth.prefix ?? ""}${readSecret(env, auth.env, serverName)}` });
    case "query":
      return createResolvedAuth({}, { [auth.name]: readSecret(env, auth.env, serverName) });
    case "basic": {
      const username = readSecret(env, auth.usernameEnv, serverName);
      const password = readSecret(env, auth.passwordEnv, serverName);
      return createResolvedAuth({ Authorization: encodeBasicCredentials(username, password) });
    }
    default: {
      const unsupported: never = auth;
      throw new AuthError(`${serverName}: unsupported auth ${JSON.stringify(unsupported)}`);
    }
  }
};
