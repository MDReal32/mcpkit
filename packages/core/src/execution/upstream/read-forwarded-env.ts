import { AuthError } from "../../auth";
import type { Manifest, StdioUpstream } from "../../manifest";
import type { CallContext } from "../types/call-context";

/** Each forwarded credential from its env var, else from the secret store. */
export const readForwardedEnv = async (
  manifest: Manifest,
  { forwardEnv = [] }: StdioUpstream,
  domain: string | undefined,
  context: CallContext,
) => {
  const owner = { name: manifest.name, category: manifest.category, domain };
  const entries = await Promise.all(
    forwardEnv.map(async (name) => [name, context.env[name] || (await context.secretStore?.get(owner, name))] as const),
  );
  const missing = entries.filter(([, value]) => !value).map(([name]) => name);
  if (missing.length > 0) {
    throw new AuthError(
      `${manifest.name}: missing credential, set ${missing.join(", ")} in the client's env for mcpkit`,
    );
  }
  return Object.fromEntries(entries.map(([name, value]) => [name, value ?? ""]));
};
