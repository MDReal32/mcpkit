import type { ExecuteOptions } from "@usemcpkit/core";
import type { WireLog } from "../wire-log";

export interface McpOptions extends ExecuteOptions {
  /** Called with the tool id of every tool call that names a known tool. */
  onToolUse?: (id: string) => void;
  /** Called when opening a section changed the list of tools, so the client should list them again. */
  onToolsChanged?: () => void;
  /** Called with a problem that does not stop serving, such as a server whose tools could not be loaded. */
  onWarning?: (message: string) => void;
  /** Records what the server read and wrote, for debugging a client; see `USEMCPKIT_DEBUG`. */
  wireLog?: WireLog;
}
