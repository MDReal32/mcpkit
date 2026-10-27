import type { ExecuteOptions } from "@usemcpkit/core";

export interface McpOptions extends ExecuteOptions {
  /** Called with the tool id of every call_tool request that names a known tool. */
  /** Patterns of the tool ids that are listed as MCP tools of their own, read on every `tools/list`. */
  exposedTools?: () => Promise<readonly string[]>;
  /** Something worth telling the operator, such as a tool that could not be exposed. */
  onWarning?: (message: string) => void;
  onToolUse?: (id: string) => void;
}
