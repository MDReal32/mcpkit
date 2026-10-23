import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import { createStdioEntry } from "./create-stdio-entry";
import { resolveVscodeUserDir } from "./resolve-vscode-user-dir";

export const vscodeInsiders: ClientDefinition = {
  id: "vscode-insiders",
  name: "VS Code Insiders",
  format: "json",
  detectPaths: (context) => [resolveVscodeUserDir(context, "Code - Insiders")],
  configPath: (context) => join(resolveVscodeUserDir(context, "Code - Insiders"), "mcp.json"),
  serversPath: ["servers"],
  createEntry: createStdioEntry,
};
