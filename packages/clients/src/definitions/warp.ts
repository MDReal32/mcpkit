import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";

export const warp: ClientDefinition = {
  id: "warp",
  name: "Warp",
  format: "json",
  detectPaths: (context) => [join(context.homeDir, ".warp")],
  configPath: (context) => join(context.homeDir, ".warp", ".mcp.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
