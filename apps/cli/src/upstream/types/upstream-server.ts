import type { ExecuteOptions, ToolArgs } from "@usemcpkit/core";
import type { UpstreamResult } from "@usemcpkit/upstream";
import type { DiscoveredTool } from "./discovered-tool";

/** A catalog server backed by another MCP server: its tools by catalog name, and a way to call one. */
export interface UpstreamServer {
  tools: ReadonlyMap<string, DiscoveredTool>;
  call: (tool: DiscoveredTool, args: ToolArgs | undefined, options: ExecuteOptions) => Promise<UpstreamResult>;
}
