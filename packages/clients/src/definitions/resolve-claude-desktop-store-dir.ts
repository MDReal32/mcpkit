import { join } from "node:path";
import { CLAUDE_DESKTOP_STORE_DATA_DIR } from "../const";
import type { ClientContext } from "../types/client-context";

export const resolveClaudeDesktopStoreDir = (context: ClientContext) => {
  const localAppDataDir = context.env.LOCALAPPDATA ?? join(context.homeDir, "AppData", "Local");
  return join(localAppDataDir, ...CLAUDE_DESKTOP_STORE_DATA_DIR);
};
