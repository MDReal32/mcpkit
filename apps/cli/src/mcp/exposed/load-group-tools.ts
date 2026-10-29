import type { Catalog } from "../types/catalog";
import type { CatalogServer } from "../types/catalog-server";
import { EMPTY_INPUT_SCHEMA } from "./const";

const loadUpstreamTools = (catalog: Catalog, server: CatalogServer) => {
  const discovered = catalog.upstreams?.get(server.id)?.tools;
  return (server.tools ?? []).flatMap((tool) => {
    const found = discovered?.get(tool);
    if (!found) {
      return [];
    }
    return [{ tool, description: found.description ?? "", inputSchema: found.inputSchema ?? EMPTY_INPUT_SCHEMA }];
  });
};

/** The tools of one group, or of the whole server when it is not split, with their descriptions and schemas. */
export const loadGroupTools = async (catalog: Catalog, server: CatalogServer, group?: string) => {
  if (catalog.upstreams?.has(server.id)) {
    return loadUpstreamTools(catalog, server);
  }
  const manifest = await catalog.loadGroupManifest(server.id, group);
  return manifest.tools.map((spec) => ({
    tool: spec.name,
    description: spec.description,
    inputSchema: { ...spec.input },
  }));
};
