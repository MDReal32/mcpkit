import type { ServerConfig } from "./server-config";

/**
 * The shapes a config without a `version` can have: the first one (a domain per server, credentials in `secrets.json`
 * or in a per-server `secrets`) and the per-host one that builds wrote before versions existed (`hosts`, `projects`).
 */
export interface ConfigV1 {
  servers?: Readonly<Record<string, ConfigV1Server>>;
}

export interface ConfigV1Server extends ServerConfig {
  secrets?: Readonly<Record<string, string>>;
}
