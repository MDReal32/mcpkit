import { resolveUserDir } from "./local/resolve-user-dir";
import { resolveRegistryUrl } from "./remote/resolve-registry-url";
import type { RegistryContext } from "./types/registry-context";
import type { RegistryOptions } from "./types/registry-options";

export const createRegistryContext = ({
  dir = resolveUserDir(),
  registryUrl = resolveRegistryUrl(),
  fetchImpl = fetch,
}: RegistryOptions = {}) => {
  const context: RegistryContext = { dir, registryUrl, fetchImpl };
  return context;
};
