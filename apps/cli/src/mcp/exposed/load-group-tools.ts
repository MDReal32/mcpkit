import type { Catalog } from "../types/catalog";
import type { CatalogServer } from "../types/catalog-server";
import { EMPTY_INPUT_SCHEMA } from "./const";

const loadUpstreamTools = async (catalog: Catalog, server: CatalogServer) => {
  const upstream = await catalog.loadUpstream?.(server.id);
  return [...(upstream?.tools.values() ?? [])].map((found) => ({
    tool: found.name,
    description: found.description ?? "",
    inputSchema: found.inputSchema ?? EMPTY_INPUT_SCHEMA,
  }));
};

/** The tools of one group, or of the whole server when it is not split, with their descriptions and schemas. */
export const loadGroupTools = async (catalog: Catalog, server: CatalogServer, group?: string) => {
  if (server.upstream) {
    return loadUpstreamTools(catalog, server);
  }
  const manifest = await catalog.loadGroupManifest(server.id, group);
  return manifest.tools.map((spec) => ({
    tool: spec.name,
    description: spec.description,
    inputSchema: { ...spec.input },
  }));
};
