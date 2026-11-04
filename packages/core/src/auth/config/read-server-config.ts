import type { ServerKey } from "../types/server-key";
import type { UsemcpkitConfig } from "../types/usemcpkit-config";

export const readServerConfig = (config: UsemcpkitConfig, server: ServerKey) =>
  config.servers?.[server.category]?.[server.name];
