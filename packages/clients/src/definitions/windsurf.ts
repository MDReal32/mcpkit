import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";

export const windsurf: ClientDefinition = {
  id: "windsurf",
  name: "Windsurf (legacy config)",
  format: "json",
  detectPaths: (context) => [join(context.homeDir, ".codeium", "windsurf")],
  configPath: (context) => join(context.homeDir, ".codeium", "windsurf", "mcp_config.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
