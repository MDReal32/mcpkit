import type { ServerConfig } from "./server-config";

export interface McpkitConfig {
  version: number;
  servers?: Readonly<Record<string, ServerConfig>>;
  /** Tool id patterns the MCP server lists as tools of their own; see `matchesExposedTool`. */
  expose?: readonly string[];
}
