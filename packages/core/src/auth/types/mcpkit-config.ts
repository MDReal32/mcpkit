import type { ServerConfig } from "./server-config";

export interface McpkitConfig {
  servers?: Readonly<Record<string, ServerConfig>>;
}
