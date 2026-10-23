import type { Env } from "../../env";
import { AuthError } from "../auth-error";

export const readSecret = (env: Env, envName: string, serverName: string) => {
  const value = env[envName];
  if (!value) {
    throw new AuthError(
      `${serverName}: missing credential, set the ${envName} environment variable or enter it in the credentials form`,
    );
  }
  return value;
};
