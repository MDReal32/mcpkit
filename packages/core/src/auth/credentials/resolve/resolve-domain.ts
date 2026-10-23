import type { Manifest } from "../../../manifest";
import { isDomainValue } from "../../../manifest";
import { AuthError } from "../../auth-error";
import { readServerDomain } from "../../config/read-server-domain";
import type { AuthContext } from "../../types/auth-context";

/** The domain from its env var, else the one saved from the form in the config file, else the manifest default. */
export const resolveDomain = async (manifest: Manifest, context: AuthContext) => {
  const { domain } = manifest;
  if (!domain) {
    return undefined;
  }
  const fromEnv = domain.env ? context.env[domain.env] : undefined;
  const value = fromEnv || (await readServerDomain(context.env, manifest.name)) || domain.default;
  if (value !== undefined && !isDomainValue(value)) {
    throw new AuthError(`${manifest.name}: domain "${value}" must look like host[:port][/path]`);
  }
  return value;
};
