import { readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createPingManifest, useTempDir } from '@usemcpkit/testing';
import { describe, expect, it } from 'vitest';
import {
  createRegistryContext,
  loadManifest,
  readCachedIndex,
  readSyncStatus,
  resolveRegistryUrl,
  syncRegistry,
} from '../src/registry';
import { DEFAULT_REGISTRY_URL, MANIFEST_SYNC_INTERVAL_MS } from '../src/registry/const';
import { isSyncDue } from '../src/registry/sync/is-sync-due';
import { createRegistryFetch } from './fixtures/create-registry-fetch';

const REGISTRY = 'https://reg.example';

const readDir = useTempDir('mcpkit-registry-');

const setup = (description = '') => {
  const registry = createRegistryFetch(REGISTRY, [createPingManifest('1.0.0', description)]);
  const context = createRegistryContext({ dir: readDir(), registryUrl: REGISTRY, fetchImpl: registry.fetchImpl });
  return { registry, context };
};

const readIndexServer = async () => {
  const index = await readCachedIndex(readDir());
  const [server] = index?.servers ?? [];
  if (!server) {
    throw new Error('index has no server');
  }
  return server;
};

describe('syncRegistry', () => {
  it('downloads only the index, never a manifest nobody used', async () => {
    const { registry, context } = setup();

    const report = await syncRegistry(context);

    expect(report).toEqual({ servers: 1, refreshed: [], failed: [] });
    expect(registry.requests).toEqual([`${REGISTRY}/index.json`]);
    expect((await readIndexServer()).tools).toEqual(['ping']);
  });

  it('re-downloads a cached manifest whose content changed under the same version', async () => {
    const first = setup('one');
    await syncRegistry(first.context);
    await loadManifest(await readIndexServer(), first.context);

    const second = setup('two');
    const report = await syncRegistry(second.context);

    expect(report.refreshed).toEqual(['test:demo']);
    const cached: unknown = JSON.parse(await readFile(join(readDir(), 'test', 'demo.json'), 'utf8'));
    expect(cached).toMatchObject({ description: 'two' });
  });

  it('leaves an up-to-date cached manifest alone', async () => {
    const { registry, context } = setup();
    await syncRegistry(context);
    await loadManifest(await readIndexServer(), context);
    registry.requests.length = 0;

    const report = await syncRegistry(context);

    expect(report.refreshed).toEqual([]);
    expect(registry.requests).toEqual([`${REGISTRY}/index.json`]);
  });

  it('rejects a malformed index', async () => {
    const context = createRegistryContext({
      dir: readDir(),
      registryUrl: REGISTRY,
      fetchImpl: async () => new Response(JSON.stringify({ manifests: [] })),
    });

    await expect(syncRegistry(context)).rejects.toThrow();
  });
});

describe('loadManifest', () => {
  it('downloads on first use, then serves the cache', async () => {
    const { registry, context } = setup();
    await syncRegistry(context);
    const server = await readIndexServer();

    const first = await loadManifest(server, context);
    const second = await loadManifest(server, context);

    expect(first.name).toBe('demo');
    expect(second).toEqual(first);
    expect(registry.requests.filter((url) => url.endsWith('demo.json'))).toHaveLength(1);
  });

  it('refuses a download that does not match the index checksum', async () => {
    const { context } = setup();
    await syncRegistry(context);
    const server = await readIndexServer();
    const tampered = createRegistryContext({
      ...context,
      fetchImpl: async () => new Response('{"name":"demo"}'),
    });

    await expect(loadManifest(server, tampered)).rejects.toThrow(/checksum/);
    await expect(stat(join(readDir(), 'test', 'demo.json'))).rejects.toThrow();
  });

  it('re-downloads a cached copy that no longer matches the index', async () => {
    const { context } = setup();
    await syncRegistry(context);
    const server = await readIndexServer();
    await loadManifest(server, context);
    await writeFile(join(readDir(), 'test', 'demo.json'), 'edited');

    const manifest = await loadManifest(server, context);

    expect(manifest.version).toBe('1.0.0');
  });
});

describe('sync status', () => {
  it('reports an empty dir, then a fresh one right after a sync, then a due one a day later', async () => {
    const { context } = setup();

    const before = await readSyncStatus(readDir());
    await syncRegistry(context);
    const after = await readSyncStatus(readDir());
    const later = await isSyncDue(readDir(), Date.now() + MANIFEST_SYNC_INTERVAL_MS + 1000);

    expect([before, after, later]).toEqual(['empty', 'fresh', true]);
  });

  it('resolves the registry from the flag, then the environment, then the default', () => {
    expect(resolveRegistryUrl('https://flag.example', { MCPKIT_REGISTRY: 'https://env.example' })).toBe(
      'https://flag.example',
    );
    expect(resolveRegistryUrl(undefined, { MCPKIT_REGISTRY: 'https://env.example' })).toBe('https://env.example');
    expect(resolveRegistryUrl(undefined, {})).toBe(DEFAULT_REGISTRY_URL);
  });
});
