import type { ExecuteOptions } from "@usemcpkit/core";
import type { Catalog } from "../../mcp";
import { createRegistryContext, loadManifest, readCachedIndex } from "../../registry";
import type { UpstreamServer } from "../../upstream";
import { autoSyncManifests } from "./auto-sync-manifests";
import type { HydratedServer } from "./hydrate-upstream-server";
import { hydrateUpstreamServer } from "./hydrate-upstream-server";

/** Ids are `category:name`; a bare `github` also selects `git:github`. */
const matchesSelection = (id: string, selection: string) => id === selection || id.endsWith(`:${selection}`);

/** `options` is what upstream servers are reached with while their tools are discovered: nothing here prompts. */
export const loadCatalog = async (selection: readonly string[], options: ExecuteOptions = {}) => {
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
  const hydrated = await Promise.all(
    servers.map((server) =>
      server.upstream ? hydrateUpstreamServer(server, context, options) : ({ server } as HydratedServer),
    ),
  );
  const upstreams = new Map<string, UpstreamServer>(
    hydrated.flatMap(({ server, upstream }) => (upstream ? [[server.id, upstream] as const] : [])),
  );
  const catalog: Catalog = {
    servers: hydrated.map(({ server }) => server),
    upstreams,
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
