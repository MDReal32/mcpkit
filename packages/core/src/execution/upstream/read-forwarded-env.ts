import { saveCredentials } from "../../auth/credentials/resolve/save-credentials";
import type { Manifest, StdioUpstream } from "../../manifest";
import type { CallContext } from "../types/call-context";
import { askForMissingCredentials } from "./ask-for-missing-credentials";

/**
 * Each forwarded credential from its env var, else from the secret store; an optional one is left out when unset.
 * A required one found nowhere is asked for in the credentials form when the caller has one, and `commit` saves
 * what was entered once the upstream has started with it.
 */
export const readForwardedEnv = async (
  manifest: Manifest,
  upstream: StdioUpstream,
  domain: string | undefined,
  context: CallContext,
) => {
  const { forwardEnv = [], optionalEnv = [] } = upstream;
  const owner = { name: manifest.name, category: manifest.category, domain };
  const read = async (name: string) =>
    [name, context.env[name] || (await context.secretStore?.get(owner, name))] as const;
  const required = await Promise.all(forwardEnv.map(read));
  const missing = required.filter(([, value]) => !value).map(([name]) => name);
  const entered =
    missing.length === 0 ? {} : await askForMissingCredentials(manifest, upstream, missing, context.requestCredentials);
  const optional = (await Promise.all(optionalEnv.map(read))).filter(([, value]) => value);
  const found = [...required, ...optional].filter(([, value]) => value);
  const env: Record<string, string> = {
    ...Object.fromEntries(found.map(([name, value]) => [name, value ?? ""])),
    ...entered,
  };
  const commit = () => saveCredentials(owner, entered, context.secretStore);
  return { env, commit };
};
