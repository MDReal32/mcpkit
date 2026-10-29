import type { Catalog } from "../types/catalog";
import type { CatalogServer } from "../types/catalog-server";
import { EMPTY_INPUT_SCHEMA } from "./const";

/** Every tool of an upstream server, which starts it (and clones its repository) the first time. */
export const loadUpstreamTools = async (catalog: Catalog, server: CatalogServer) => {
  const upstream = await catalog.loadUpstream?.(server.id);
  return [...(upstream?.tools.values() ?? [])].map((found) => ({
    tool: found.name,
    description: found.description ?? "",
    inputSchema: found.inputSchema ?? EMPTY_INPUT_SCHEMA,
  }));
};
