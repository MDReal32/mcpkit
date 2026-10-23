import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";

export const claudeDesktop: ClientDefinition = {
  id: "claude-desktop",
  name: "Claude Desktop",
  format: "json",
  detectPaths: (context) => [join(context.appDataDir, "Claude")],
  configPath: (context) => join(context.appDataDir, "Claude", "claude_desktop_config.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
