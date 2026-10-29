import { readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DEFAULT_REGISTRY_URL } from "@usemcpkit/servers";
import { createPingManifest, useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import {
  createRegistryContext,
  loadGroupManifest,
  loadGroups,
  loadManifest,
  readCachedIndex,
  readSyncStatus,
  resolveRegistryUrl,
  syncRegistry,
} from "../src/registry";
import { MANIFEST_SYNC_INTERVAL_MS } from "../src/registry/const";
import { isSyncDue } from "../src/registry/sync/is-sync-due";
import { createRegistryFetch } from "./fixtures/create-registry-fetch";
import { createSplitRegistryFetch } from "./fixtures/create-split-registry-fetch";

const REGISTRY = "https://reg.example";

const readDir = useTempDir("mcpkit-registry-");

const setup = (description = "") => {
  const registry = createRegistryFetch(REGISTRY, [createPingManifest("1.0.0", description)]);
  const context = createRegistryContext({ dir: readDir(), registryUrl: REGISTRY, fetchImpl: registry.fetchImpl });
  return { registry, context };
};

const readIndexServer = async () => {
  const index = await readCachedIndex(readDir());
  const [server] = index?.servers ?? [];
  if (!server) {
    throw new Error("index has no server");
  }
  return server;
};

describe("syncRegistry", () => {
  it("downloads only the index, never a manifest nobody used", async () => {
    const { registry, context } = setup();

    const report = await syncRegistry(context);

    expect(report).toEqual({ servers: 1, refreshed: [], failed: [] });
    expect(registry.requests).toEqual([`${REGISTRY}/index.json`]);
    expect((await readIndexServer()).id).toBe("test:demo");
  });

  it("re-downloads a cached manifest whose content changed under the same version", async () => {
    const first = setup("one");
    await syncRegistry(first.context);
    await loadManifest(await readIndexServer(), first.context, "ping:run");

    const second = setup("two");
    const report = await syncRegistry(second.context);

    expect(report.refreshed).toEqual(["test:demo"]);
    const cached: unknown = JSON.parse(await readFile(join(readDir(), "test", "demo.json"), "utf8"));
    expect(cached).toMatchObject({ description: "two" });
  });

  it("leaves an up-to-date cached manifest alone", async () => {
    const { registry, context } = setup();
    await syncRegistry(context);
    await loadManifest(await readIndexServer(), context, "ping:run");
    registry.requests.length = 0;

    const report = await syncRegistry(context);

    expect(report.refreshed).toEqual([]);
    expect(registry.requests).toEqual([`${REGISTRY}/index.json`]);
  });

  it("rejects a malformed index", async () => {
    const context = createRegistryContext({
      dir: readDir(),
      registryUrl: REGISTRY,
      fetchImpl: async () => new Response(JSON.stringify({ manifests: [] })),
    });

    await expect(syncRegistry(context)).rejects.toThrow();
  });
});

describe("loadManifest", () => {
  it("downloads on first use, then serves the cache", async () => {
    const { registry, context } = setup();
    await syncRegistry(context);
    const server = await readIndexServer();

    const first = await loadManifest(server, context, "ping:run");
    const second = await loadManifest(server, context, "ping:run");

    expect(first.name).toBe("demo");
    expect(second).toEqual(first);
    expect(registry.requests.filter((url) => url.endsWith("demo.json"))).toHaveLength(1);
  });

  it("refuses a download that does not match the index checksum", async () => {
    const { context } = setup();
    await syncRegistry(context);
    const server = await readIndexServer();
    const tampered = createRegistryContext({
      ...context,
      fetchImpl: async (input) =>
        String(input).endsWith("demo.json") ? new Response('{"name":"demo"}') : context.fetchImpl(input),
    });

    await expect(loadManifest(server, tampered, "ping:run")).rejects.toThrow(/checksum/);
    await expect(stat(join(readDir(), "test", "demo.json"))).rejects.toThrow();
  });

  it("refreshes an index older than the registry and loads the new manifest", async () => {
    const first = setup("one");
    await syncRegistry(first.context);
    const staleServer = await readIndexServer();

    const second = setup("two");
    const manifest = await loadManifest(staleServer, second.context, "ping:run");

    expect(manifest.description).toBe("two");
    expect((await readIndexServer()).sha256).not.toBe(staleServer.sha256);
  });

  it("re-downloads a cached copy that no longer matches the index", async () => {
    const { context } = setup();
    await syncRegistry(context);
    const server = await readIndexServer();
    await loadManifest(server, context, "ping:run");
    await writeFile(join(readDir(), "test", "demo.json"), "edited");

    const manifest = await loadManifest(server, context, "ping:run");

    expect(manifest.version).toBe("1.0.0");
  });
});

describe("sync status", () => {
  it("reports an empty dir, then a fresh one right after a sync, then a due one a day later", async () => {
    const { context } = setup();

    const before = await readSyncStatus(readDir());
    await syncRegistry(context);
    const after = await readSyncStatus(readDir());
    const later = await isSyncDue(readDir(), Date.now() + MANIFEST_SYNC_INTERVAL_MS + 1000);

    expect([before, after, later]).toEqual(["empty", "fresh", true]);
  });

  it("resolves the registry from the flag, then the environment, then the default", () => {
    expect(resolveRegistryUrl("https://flag.example", { MCPKIT_REGISTRY: "https://env.example" })).toBe(
      "https://flag.example",
    );
    expect(resolveRegistryUrl(undefined, { MCPKIT_REGISTRY: "https://env.example" })).toBe("https://env.example");
    expect(resolveRegistryUrl(undefined, {})).toBe(DEFAULT_REGISTRY_URL);
  });
});

describe("loadManifest of a server split into parts", () => {
  const ping = createPingManifest("1.0.0");
  const [tool] = ping.tools;
  const split = {
    ...ping,
    tools: ["a", "b"].map((group) => ({ ...tool, name: `${group}:x:run` })),
  } as typeof ping;

  it("downloads only the part of the tool group and serves it from the cache afterwards", async () => {
    const registry = createSplitRegistryFetch(REGISTRY, split);
    const context = createRegistryContext({ dir: readDir(), registryUrl: REGISTRY, fetchImpl: registry.fetchImpl });
    await syncRegistry(context);
    const server = await readIndexServer();

    const manifest = await loadManifest(server, context, "a:x:run");
    await loadManifest(server, context, "a:x:run");

    expect(manifest.tools.map((candidate) => candidate.name)).toEqual(["a:x:run"]);
    expect(registry.requests).toEqual([
      `${REGISTRY}/index.json`,
      `${REGISTRY}/test/demo.json`,
      `${REGISTRY}/test/demo/a.json`,
    ]);
  });

  it("lists the groups from the shell alone, without downloading any part", async () => {
    const registry = createSplitRegistryFetch(REGISTRY, split);
    const context = createRegistryContext({ dir: readDir(), registryUrl: REGISTRY, fetchImpl: registry.fetchImpl });
    await syncRegistry(context);

    const groups = await loadGroups(await readIndexServer(), context);

    expect(groups).toEqual(["a", "b"]);
    expect(registry.requests).toEqual([`${REGISTRY}/index.json`, `${REGISTRY}/test/demo.json`]);
  });

  it("loads the tools of one group by its name", async () => {
    const registry = createSplitRegistryFetch(REGISTRY, split);
    const context = createRegistryContext({ dir: readDir(), registryUrl: REGISTRY, fetchImpl: registry.fetchImpl });
    await syncRegistry(context);

    const manifest = await loadGroupManifest(await readIndexServer(), context, "b");

    expect(manifest.tools.map((candidate) => candidate.name)).toEqual(["b:x:run"]);
  });

  it("rejects a tool group the shell does not list", async () => {
    const registry = createSplitRegistryFetch(REGISTRY, split);
    const context = createRegistryContext({ dir: readDir(), registryUrl: REGISTRY, fetchImpl: registry.fetchImpl });
    await syncRegistry(context);

    await expect(loadManifest(await readIndexServer(), context, "c:x:run")).rejects.toThrow(/no group "c"/);
  });
});
