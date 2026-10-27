import type { ServerConfig } from "../types/server-config";

/** The hosts a server has been used with: those with saved settings and the last one used. */
export const listKnownHosts = (server: ServerConfig | undefined) => {
  const hosts = new Set(Object.keys(server?.hosts ?? {}));
  if (server?.domain) {
    hosts.add(server.domain);
  }
  return [...hosts];
};
