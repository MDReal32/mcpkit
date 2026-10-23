import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createCommandEntry } from "./create-command-entry";

export const geminiCli: ClientDefinition = {
  id: "gemini-cli",
  name: "Gemini CLI",
  format: "json",
  detectPaths: (context) => [join(context.homeDir, ".gemini")],
  configPath: (context) => join(context.homeDir, ".gemini", "settings.json"),
  serversPath: ["mcpServers"],
  createEntry: createCommandEntry,
};
