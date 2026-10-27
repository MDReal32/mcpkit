import type { DiscoveredTool } from "./discovered-tool";

export interface ToolCache {
  discoveredAt: string;
  tools: readonly DiscoveredTool[];
}
