import type { ExecuteOptions } from "@usemcpkit/core";
import type { Catalog } from "../../mcp";
import { createRegistryContext, loadGroupManifest, loadGroups, loadManifest, readCachedIndex } from "../../registry";
import type { UpstreamServer } from "../../upstream";
import { autoSyncManifests } from "./auto-sync-manifests";
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
  const upstreams = new Map<string, Promise<UpstreamServer>>();
  const loadUpstream = async (id: string) => {
    const server = servers.find((candidate) => candidate.id === id);
    if (!server?.upstream) {
      return undefined;
    }
    const pending = upstreams.get(id) ?? hydrateUpstreamServer(server, context, options);
    upstreams.set(id, pending);
    try {
      return await pending;
    } catch (error) {
      upstreams.delete(id);
      throw error;
    }
  };
  const findServer = (id: string) => {
    const server = servers.find((candidate) => candidate.id === id);
    if (!server) {
      throw new Error(`unknown server "${id}"`);
    }
    return server;
  };
  const close = async () => {
    const opened = await Promise.allSettled(upstreams.values());
    await Promise.all(opened.map((result) => (result.status === "fulfilled" ? result.value.close() : undefined)));
  };
  const catalog: Catalog = {
    servers,
    loadUpstream,
    close,
    loadManifest: async (id, tool) => loadManifest(findServer(id), context, tool),
    loadGroups: async (id) => loadGroups(findServer(id), context),
    loadGroupManifest: async (id, group) => loadGroupManifest(findServer(id), context, group),
  };
  return catalog;
};
