import type { Catalog } from "../types/catalog";
import type { ToolLookup } from "../types/tool-lookup";
import { parseToolId } from "./parse-tool-id";

/** Resolves a tool id against the catalog; the error text is written for the model to correct itself. */
export const findTool = (catalog: Catalog, id: string): ToolLookup => {
  const parsed = parseToolId(id);
  if (!parsed) {
    return { error: `invalid tool id "${id}"; expected <category>:<server>:<resource>:<action>` };
  }
  const server = catalog.servers.find((candidate) => candidate.id === parsed.serverId);
  if (!server) {
    return { error: `unknown server "${parsed.serverId}"` };
  }
  if (!server.tools.includes(parsed.tool)) {
    return { error: `server "${server.id}" has no tool "${parsed.tool}"; see list_tools` };
  }
  return { serverId: server.id, tool: parsed.tool };
};
