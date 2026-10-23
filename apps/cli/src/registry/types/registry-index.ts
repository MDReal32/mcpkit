import type { RegistryServer } from "./registry-server";

export interface RegistryIndex {
  servers: readonly RegistryServer[];
}
