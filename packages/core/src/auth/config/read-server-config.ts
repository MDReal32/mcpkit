import type { McpkitConfig } from "../types/mcpkit-config";
import type { ServerKey } from "../types/server-key";

export const readServerConfig = (config: McpkitConfig, server: ServerKey) =>
  config.servers?.[server.category]?.[server.name];
