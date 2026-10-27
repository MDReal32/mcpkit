export interface DiscoveredTool {
  /** The name in the catalog: `tools:<snake_case name>`. */
  name: string;
  /** The name the upstream server knows it by. */
  upstreamName: string;
  description?: string;
  inputSchema?: Record<string, unknown>;
}
