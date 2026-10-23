import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";
import { resolveDevinDir } from "./resolve-devin-dir";

/** Windsurf was renamed Devin Desktop and moved its MCP config; the old location is `windsurf`. */
export const devinDesktop: ClientDefinition = {
  id: "devin-desktop",
  name: "Devin Desktop (Windsurf)",
  format: "json",
  detectPaths: (context) => [resolveDevinDir(context)],
  configPath: (context) => join(resolveDevinDir(context), "mcp_config.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
