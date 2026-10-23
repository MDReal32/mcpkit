import type { StdioOptions } from "../../types/stdio-options";

export interface SuperviseOptions extends StdioOptions {
  /** The binary whose replacement triggers a reload; without it the server reloads only when asked to. */
  watchPath?: string;
}
