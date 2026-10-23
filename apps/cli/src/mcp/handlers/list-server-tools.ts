import { createJsonResult } from "../tools/create-json-result";
import { createTextResult } from "../tools/create-text-result";
import { createToolId } from "../tools/create-tool-id";
import type { Catalog } from "../types/catalog";

export const listServerTools = (catalog: Catalog, serverId: string) => {
  const server = catalog.servers.find((candidate) => candidate.id === serverId);
  if (!server) {
    return createTextResult(`unknown server "${serverId}"; see list_servers`, true);
  }
  return createJsonResult(server.tools.map((tool) => createToolId(server.id, tool)));
};
