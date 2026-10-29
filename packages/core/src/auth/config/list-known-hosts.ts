import type { ServerConfig } from "../types/server-config";

/** The hosts a server has been used with: those with saved settings. */
export const listKnownHosts = (server: ServerConfig | undefined) => Object.keys(server?.hosts ?? {});
