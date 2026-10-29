import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";

/**
 * On Windows the folder alone is no sign of this build: the Store build leaves `%APPDATA%\Claude` behind with only a
 * marker file in it, so the app's own `config.json` is looked for instead.
 */
export const claudeDesktop: ClientDefinition = {
  id: "claude-desktop",
  name: "Claude Desktop",
  format: "json",
  detectPaths: (context) => [
    context.platform === "win32"
      ? join(context.appDataDir, "Claude", "config.json")
      : join(context.appDataDir, "Claude"),
  ],
  configPath: (context) => join(context.appDataDir, "Claude", "claude_desktop_config.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
