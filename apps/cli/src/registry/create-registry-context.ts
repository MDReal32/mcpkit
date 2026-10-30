import { resolveUserDir } from "./local/resolve-user-dir";
import { resolveRegistryUrl } from "./remote/resolve-registry-url";
import type { RegistryContext } from "./types/registry-context";
import type { RegistryOptions } from "./types/registry-options";
import { warnOnStderr } from "./warn-on-stderr";

export const createRegistryContext = ({
  dir = resolveUserDir(),
  registryUrl = resolveRegistryUrl(),
  fetchImpl = fetch,
  revalidate = true,
  warn = warnOnStderr,
}: RegistryOptions = {}) => {
  const context: RegistryContext = { dir, registryUrl, fetchImpl, revalidate, warn };
  return context;
};
