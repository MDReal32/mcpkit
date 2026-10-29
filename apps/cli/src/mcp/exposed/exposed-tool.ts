import type { ToolAnnotations } from "../types/tool-definition";

/** One catalog tool as the client sees it: its own MCP tool, with its schema. */
export interface ExposedTool {
  /** The MCP tool name; the client's permission rules match on it. */
  name: string;
  serverId: string;
  /** The tool name without the server id, such as `issues:issues:get_issue`. */
  tool: string;
  description: string;
  inputSchema: Readonly<Record<string, unknown>>;
  annotations?: ToolAnnotations;
}
