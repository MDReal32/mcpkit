import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_REGISTRY_URL } from "@usemcpkit/servers";
import type { Catalog } from "../../src/mcp/types/catalog";
import {
  createRegistryContext,
  loadGroupManifest,
  loadGroups,
  readCachedIndex,
  syncRegistry,
} from "../../src/registry";

const REGISTRY = join(__dirname, "../../../../packages/servers/build/manifests");

/** Serves the built registry as if it were published. */
const readBuiltRegistry: typeof fetch = async (input) => {
  const url = input instanceof Request ? input.url : String(input);
  const path = url.slice(`${DEFAULT_REGISTRY_URL}/`.length);
  return new Response(readFileSync(join(REGISTRY, path), "utf8"));
};

/** A catalog over the registry `packages/servers` builds, cached in `dir`; it never reads the network. */
export const createBuiltRegistryCatalog = async (dir: string) => {
  const context = createRegistryContext({ dir, registryUrl: DEFAULT_REGISTRY_URL, fetchImpl: readBuiltRegistry });
  await syncRegistry(context);
  const index = await readCachedIndex(context.dir);
  if (!index) {
    throw new Error("the registry sync wrote no index");
  }
  const findServer = (id: string) => {
    const server = index.servers.find((candidate) => candidate.id === id);
    if (!server) {
      throw new Error(`unknown server "${id}"`);
    }
    return server;
  };
  const catalog: Catalog = {
    servers: index.servers,
    loadManifest: async () => {
      throw new Error("not used");
    },
    loadGroups: (id) => loadGroups(findServer(id), context),
    loadGroupManifest: (id, group) => loadGroupManifest(findServer(id), context, group),
  };
  return catalog;
};
