import { TOOL_ID_SEPARATOR } from "../tools/const";
import type { Catalog } from "../types/catalog";
import type { CatalogServer } from "../types/catalog-server";
import { loadUpstreamTools } from "./load-upstream-tools";

const MIN_SEGMENTS_TO_GROUP = 3;

/**
 * The groups a server opens into: its parts for a server split into files, the first name segments for an upstream
 * whose tools are all named `<group>:<resource>:<action>`. Empty when its tools are not grouped.
 */
export const loadGroupNames = async (catalog: Catalog, server: CatalogServer) => {
  if (!server.upstream) {
    return catalog.loadGroups(server.id);
  }
  const tools = await loadUpstreamTools(catalog, server);
  const grouped =
    tools.length > 0 && tools.every(({ tool }) => tool.split(TOOL_ID_SEPARATOR).length >= MIN_SEGMENTS_TO_GROUP);
  return grouped ? [...new Set(tools.map(({ tool }) => tool.split(TOOL_ID_SEPARATOR)[0] ?? ""))] : [];
};
