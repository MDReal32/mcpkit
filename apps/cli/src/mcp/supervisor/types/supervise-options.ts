import type { StdioOptions } from "../../types/stdio-options";
import type { WireLog } from "../../wire-log";

export interface SuperviseOptions extends StdioOptions {
  /** The binary whose replacement triggers a reload; without it the server reloads only when asked to. */
  watchPath?: string;
  /** Records the lines passed between the client and the worker; see `USEMCPKIT_DEBUG`. */
  wireLog?: WireLog;
}
