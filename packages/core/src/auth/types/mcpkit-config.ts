import type { ServerConfig } from "./server-config";

export interface McpkitConfig {
  version: number;
  servers?: Readonly<Record<string, Readonly<Record<string, ServerConfig>>>>;
}
