import { CONFIG_VERSION, DEFAULT_HOST_KEY } from "../const";
import type { ConfigV1, ConfigV1Server } from "../types/config-v1";
import type { McpkitConfig } from "../types/mcpkit-config";
import type { ServerConfig } from "../types/server-config";

const upgradeServer = ({ secrets, ...server }: ConfigV1Server) => {
  const host = server.domain ?? DEFAULT_HOST_KEY;
  const hosts = {
    ...(server.domain === undefined ? {} : { [server.domain]: {} }),
    ...server.hosts,
    ...(secrets === undefined ? {} : { [host]: { secrets: { ...secrets, ...server.hosts?.[host]?.secrets } } }),
  };
  const upgraded: ServerConfig = { ...server, ...(Object.keys(hosts).length === 0 ? {} : { hosts }) };
  return upgraded;
};

/** An unversioned config to the current shape: a server's `secrets` move under its domain's host; hosts and projects stay. */
export const upgradeConfigV1 = (config: ConfigV1) => {
  const servers = Object.fromEntries(
    Object.entries(config.servers ?? {}).map(([name, server]) => [name, upgradeServer(server)]),
  );
  const upgraded: McpkitConfig = { version: CONFIG_VERSION, servers };
  return upgraded;
};
