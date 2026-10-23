import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";

export const lmStudio: ClientDefinition = {
  id: "lm-studio",
  name: "LM Studio",
  format: "json",
  detectPaths: (context) => [join(context.homeDir, ".lmstudio")],
  configPath: (context) => join(context.homeDir, ".lmstudio", "mcp.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
