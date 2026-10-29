import { listKnownHosts } from "../config/list-known-hosts";
import { DEFAULT_HOST_KEY, LEGACY_SERVER_CATEGORIES, UNKNOWN_CATEGORY } from "../const";
import type { McpkitConfig } from "../types/mcpkit-config";
import type { ServerConfig } from "../types/server-config";
import type { StoredSecrets } from "../types/store/stored-secrets";

/** Adds the credentials of the old secrets file under the host the server uses; a value already in the config wins. */
export const mergeLegacySecrets = (config: McpkitConfig, legacy: StoredSecrets) => {
  const servers: Record<string, Record<string, ServerConfig>> = { ...config.servers };
  for (const [name, secrets] of Object.entries(legacy)) {
    const category = LEGACY_SERVER_CATEGORIES[name] ?? UNKNOWN_CATEGORY;
    const server = servers[category]?.[name] ?? {};
    const known = listKnownHosts(server);
    const [onlyHost] = known;
    const host = known.length === 1 && onlyHost !== undefined ? onlyHost : DEFAULT_HOST_KEY;
    servers[category] = {
      ...servers[category],
      [name]: {
        ...server,
        hosts: {
          ...server.hosts,
          [host]: { ...server.hosts?.[host], secrets: { ...secrets, ...server.hosts?.[host]?.secrets } },
        },
      },
    };
  }
  const merged: McpkitConfig = { ...config, servers };
  return merged;
};
