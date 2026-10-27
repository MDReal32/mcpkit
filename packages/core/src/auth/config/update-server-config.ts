import type { Env } from "../../env";
import type { ServerConfig } from "../types/server-config";
import { updateConfig } from "./update-config";

/** Read-modify-write of one server's entry. */
export const updateServerConfig = (env: Env, serverName: string, change: (current: ServerConfig) => ServerConfig) =>
  updateConfig(env, (config) => ({
    ...config,
    servers: { ...config.servers, [serverName]: change(config.servers?.[serverName] ?? {}) },
  }));
