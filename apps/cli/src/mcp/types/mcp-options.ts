import type { ExecuteOptions } from "@usemcpkit/core";

export interface McpOptions extends ExecuteOptions {
  /** Called with the tool id of every tool call that names a known tool. */
  onToolUse?: (id: string) => void;
  /** Called with a problem that does not stop serving, such as a server whose tools could not be loaded. */
  onWarning?: (message: string) => void;
}
