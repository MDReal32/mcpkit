import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";
import { resolveClaudeDesktopStoreDir } from "./resolve-claude-desktop-store-dir";

export const claudeDesktopStore: ClientDefinition = {
  id: "claude-desktop-store",
  name: "Claude Desktop (Microsoft Store)",
  format: "json",
  detectPaths: (context) => (context.platform === "win32" ? [resolveClaudeDesktopStoreDir(context)] : []),
  configPath: (context) => join(resolveClaudeDesktopStoreDir(context), "claude_desktop_config.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
