import type { ExecuteOptions } from "@usemcpkit/core";

export interface McpOptions extends ExecuteOptions {
  /** Called with the tool id of every call_tool request that names a known tool. */
  onToolUse?: (id: string) => void;
}
