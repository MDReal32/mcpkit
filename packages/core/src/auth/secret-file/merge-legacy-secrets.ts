import type { McpkitConfig } from "../types/mcpkit-config";
import type { ServerConfig } from "../types/server-config";
import type { StoredSecrets } from "../types/store/stored-secrets";

/** Adds the credentials of the old secrets file to the config; a value already in the config wins. */
export const mergeLegacySecrets = (config: McpkitConfig, legacy: StoredSecrets) => {
  const servers: Record<string, ServerConfig> = { ...config.servers };
  for (const [name, secrets] of Object.entries(legacy)) {
    servers[name] = { ...servers[name], secrets: { ...secrets, ...servers[name]?.secrets } };
  }
  const merged: McpkitConfig = { ...config, servers };
  return merged;
};
