import type { Catalog } from "../../mcp";
import { createRegistryContext, loadManifest, readCachedIndex } from "../../registry";
import { autoSyncManifests } from "./auto-sync-manifests";

/** Ids are `category:name`; a bare `github` also selects `git:github`. */
const matchesSelection = (id: string, selection: string) => id === selection || id.endsWith(`:${selection}`);

export const loadCatalog = async (selection: readonly string[]) => {
  await autoSyncManifests();
  const context = createRegistryContext();
  const index = await readCachedIndex(context.dir);
  if (!index) {
    throw new Error("no registry index found; run `usemcpkit update` to download it");
  }
  const unknown = selection.filter((name) => !index.servers.some((server) => matchesSelection(server.id, name)));
  if (unknown.length > 0) {
    const available = index.servers.map((server) => server.id).join(", ");
    throw new Error(`unknown server(s): ${unknown.join(", ")}. Available: ${available}`);
  }
  const servers = index.servers.filter(
    (server) => selection.length === 0 || selection.some((name) => matchesSelection(server.id, name)),
  );
  const catalog: Catalog = {
    servers,
    loadManifest: async (id, tool) => {
      const server = servers.find((candidate) => candidate.id === id);
      if (!server) {
        throw new Error(`unknown server "${id}"`);
      }
      return loadManifest(server, context, tool);
    },
  };
  return catalog;
};
