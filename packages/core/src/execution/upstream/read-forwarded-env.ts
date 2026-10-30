import { AuthError } from "../../auth";
import type { Manifest, StdioUpstream } from "../../manifest";
import type { CallContext } from "../types/call-context";

/** Each forwarded credential from its env var, else from the secret store; an optional one is left out when unset. */
export const readForwardedEnv = async (
  manifest: Manifest,
  { forwardEnv = [], optionalEnv = [] }: StdioUpstream,
  domain: string | undefined,
  context: CallContext,
) => {
  const owner = { name: manifest.name, category: manifest.category, domain };
  const read = async (name: string) =>
    [name, context.env[name] || (await context.secretStore?.get(owner, name))] as const;
  const required = await Promise.all(forwardEnv.map(read));
  const missing = required.filter(([, value]) => !value).map(([name]) => name);
  if (missing.length > 0) {
    throw new AuthError(
      `${manifest.name}: missing credential, set ${missing.join(", ")} in the client's env for mcpkit`,
    );
  }
  const optional = (await Promise.all(optionalEnv.map(read))).filter(([, value]) => value);
  return Object.fromEntries([...required, ...optional].map(([name, value]) => [name, value ?? ""]));
};
