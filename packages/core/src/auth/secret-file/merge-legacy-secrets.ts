import { DEFAULT_HOST_KEY } from "../const";
import type { McpkitConfig } from "../types/mcpkit-config";
import type { ServerConfig } from "../types/server-config";
import type { StoredSecrets } from "../types/store/stored-secrets";

/** Adds the credentials of the old secrets file under the host the server uses; a value already in the config wins. */
export const mergeLegacySecrets = (config: McpkitConfig, legacy: StoredSecrets) => {
  const servers: Record<string, ServerConfig> = { ...config.servers };
  for (const [name, secrets] of Object.entries(legacy)) {
    const server = servers[name] ?? {};
    const host = server.domain ?? DEFAULT_HOST_KEY;
    servers[name] = {
      ...server,
      hosts: {
        ...server.hosts,
        [host]: { ...server.hosts?.[host], secrets: { ...secrets, ...server.hosts?.[host]?.secrets } },
      },
    };
  }
  const merged: McpkitConfig = { ...config, servers };
  return merged;
};
