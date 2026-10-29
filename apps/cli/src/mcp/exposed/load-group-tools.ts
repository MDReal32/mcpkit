import { TOOL_ID_SEPARATOR } from "../tools/const";
import type { Catalog } from "../types/catalog";
import type { CatalogServer } from "../types/catalog-server";
import { loadUpstreamTools } from "./load-upstream-tools";

/** The tools of one group, or of the whole server when it is not split, with their descriptions and schemas. */
export const loadGroupTools = async (catalog: Catalog, server: CatalogServer, group?: string) => {
  if (server.upstream) {
    const tools = await loadUpstreamTools(catalog, server);
    return group === undefined ? tools : tools.filter(({ tool }) => tool.split(TOOL_ID_SEPARATOR)[0] === group);
  }
  const manifest = await catalog.loadGroupManifest(server.id, group);
  return manifest.tools.map((spec) => ({
    tool: spec.name,
    description: spec.description,
    inputSchema: { ...spec.input },
  }));
};
