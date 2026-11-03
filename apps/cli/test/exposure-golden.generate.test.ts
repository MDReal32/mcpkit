import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_REGISTRY_URL } from "@usemcpkit/servers";
import { useTempDir } from "@usemcpkit/testing";
import { it } from "vitest";
import { createToolExposure } from "../src/mcp/exposed";
import type { Catalog } from "../src/mcp/types/catalog";
import { createRegistryContext, loadGroupManifest, loadGroups, readCachedIndex, syncRegistry } from "../src/registry";

const REGISTRY = join(__dirname, "../../../packages/servers/build/manifests");
const OUTPUT = process.env.GOLDEN_OUTPUT ?? "";

/** Serves the built registry as if it were published. */
const readBuiltRegistry: typeof fetch = async (input) => {
  const url = input instanceof Request ? input.url : String(input);
  const path = url.slice(`${DEFAULT_REGISTRY_URL}/`.length);
  return new Response(readFileSync(join(REGISTRY, path), "utf8"));
};

const tempDir = useTempDir("mcpkit-golden-");

/**
 * Writes `apps/server/tests/fixtures/exposed-tools.json`, which the Rust server's exposure test compares against: every
 * section and tool name after opening each server that is not an upstream, and each of its groups, in list order.
 */
it.skipIf(OUTPUT === "")("writes the exposed tool list golden file", async () => {
  const context = createRegistryContext({
    dir: tempDir(),
    registryUrl: DEFAULT_REGISTRY_URL,
    fetchImpl: readBuiltRegistry,
  });
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
  const exposure = createToolExposure(catalog, {});
  for (const server of catalog.servers) {
    if (server.upstream) {
      continue;
    }
    const root = exposure.list().find((entry) => entry.kind === "section" && entry.serverId === server.id);
    if (root?.kind !== "section") {
      throw new Error(`no section for ${server.id}`);
    }
    await exposure.open(root);
    const groups = exposure.list().filter((entry) => entry.kind === "section" && entry.serverId === server.id);
    for (const group of groups) {
      if (group.kind === "section" && group.group !== undefined) {
        await exposure.open(group);
      }
    }
  }
  const entries = exposure.list().map((entry) => ({
    name: entry.name,
    id:
      entry.kind === "section"
        ? `${entry.serverId}${entry.group ? `:${entry.group}` : ""}`
        : `${entry.serverId}:${entry.tool}`,
    kind: entry.kind,
    ...(entry.kind === "section" ? { description: entry.description } : {}),
    ...(entry.annotations ? { annotations: entry.annotations } : {}),
  }));
  writeFileSync(OUTPUT, `${JSON.stringify(entries, null, 1)}\n`);
});
