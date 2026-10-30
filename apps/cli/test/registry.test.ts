import { readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DEFAULT_REGISTRY_URL } from "@usemcpkit/servers";
import { createPingManifest, useTempDir } from "@usemcpkit/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { RegistryContext } from "../src/registry";
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
import { readCacheMap } from "../src/registry/cache/read-cache-map";
import { writeCacheMap } from "../src/registry/cache/write-cache-map";
import { INDEX_CHECK_INTERVAL_MS } from "../src/registry/const";
import { hashText } from "../src/registry/ids/hash-text";
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

    const before = await readSyncStatus(context);
    await syncRegistry(context);
    const after = await readSyncStatus(context);
    const later = await isSyncDue(context, Date.now() + INDEX_CHECK_INTERVAL_MS + 1000);

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

const makeIndexStale = async (context: RegistryContext) => {
  const map = await readCacheMap(context);
  const entry = map["index.json"];
  if (!entry) {
    throw new Error("the index is not in the cache map");
  }
  await writeCacheMap(context.dir, { ...map, "index.json": { ...entry, checkedAt: 0 } });
};

describe("cache map", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("notes the hash and the time every cached file last changed and was last checked, by its path", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(1_000);
    const first = setup("one");
    await syncRegistry(first.context);
    await loadManifest(await readIndexServer(), first.context, "ping:run");
    const manifestText = await readFile(join(readDir(), "test", "demo.json"), "utf8");

    expect((await readCacheMap(first.context))["test/demo.json"]).toEqual({
      updatedAt: 1_000,
      checkedAt: 1_000,
      sha256: hashText(manifestText),
    });

    vi.setSystemTime(2_000);
    await syncRegistry(first.context);
    expect((await readCacheMap(first.context))["test/demo.json"]).toMatchObject({ updatedAt: 1_000, checkedAt: 2_000 });

    vi.setSystemTime(3_000);
    const second = setup("two");
    await syncRegistry(second.context);
    const map = await readCacheMap(second.context);
    expect(map["test/demo.json"]).toMatchObject({ updatedAt: 3_000, checkedAt: 3_000 });
    expect(map["index.json"]).toMatchObject({ checkedAt: 3_000 });
  });

  it("rebuilds an unreadable map and says so", async () => {
    const { context } = setup();
    await syncRegistry(context);
    await writeFile(join(readDir(), "cache.json"), "not json");
    const warnings: string[] = [];

    const map = await readCacheMap({ ...context, warn: (message) => warnings.push(message) });

    expect(map).toEqual({});
    expect(warnings).toHaveLength(1);
  });
});

describe("checking the registry on use", () => {
  const indexRequests = (requests: readonly string[]) => requests.filter((url) => url.endsWith("index.json"));

  it("serves the cache without asking the registry while the index was checked recently", async () => {
    const { registry, context } = setup();
    await syncRegistry(context);

    await loadManifest(await readIndexServer(), context, "ping:run");

    expect(indexRequests(registry.requests)).toHaveLength(1);
  });

  it("re-checks a stale index on use and loads what changed, without a sync", async () => {
    const first = setup("one");
    await syncRegistry(first.context);
    const staleServer = await readIndexServer();
    await loadManifest(staleServer, first.context, "ping:run");
    await makeIndexStale(first.context);
    const second = setup("two");

    const manifest = await loadManifest(staleServer, second.context, "ping:run");

    expect(manifest.description).toBe("two");
    expect(second.registry.requests).toEqual([`${REGISTRY}/index.json`, `${REGISTRY}/test/demo.json`]);
    expect((await readCacheMap(second.context))["index.json"]?.checkedAt).toBeGreaterThan(0);
  });

  it("keeps serving the cache and warns when the registry cannot be reached for the check", async () => {
    const first = setup("one");
    await syncRegistry(first.context);
    const server = await readIndexServer();
    await loadManifest(server, first.context, "ping:run");
    await makeIndexStale(first.context);
    const warnings: string[] = [];
    const offline = createRegistryContext({
      dir: readDir(),
      registryUrl: REGISTRY,
      fetchImpl: async () => {
        throw new Error("offline");
      },
      warn: (message) => warnings.push(message),
    });

    const manifest = await loadManifest(server, offline, "ping:run");
    await loadManifest(server, offline, "ping:run");

    expect(manifest.description).toBe("one");
    expect(warnings).toEqual([expect.stringContaining("using the cache: offline")]);
  });

  it("leaves the index alone when checking on use is turned off", async () => {
    const first = setup("one");
    await syncRegistry(first.context);
    const server = await readIndexServer();
    await loadManifest(server, first.context, "ping:run");
    await makeIndexStale(first.context);
    const second = setup("two");

    const manifest = await loadManifest(server, { ...second.context, revalidate: false }, "ping:run");

    expect(manifest.description).toBe("one");
    expect(second.registry.requests).toEqual([]);
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
