import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createPingManifest, useTempDir } from '@usemcpkit/testing';
import { describe, expect, it } from 'vitest';
import { loadManifests, readSyncStatus, resolveRegistryUrl, syncManifests, updateFromRegistry } from '../src/registry';
import { DEFAULT_REGISTRY_URL, MANIFEST_SYNC_INTERVAL_MS } from '../src/registry/const';
import { isSyncDue } from '../src/registry/sync/is-sync-due';
import { createRouteFetch } from './fixtures/create-route-fetch';

const readDir = useTempDir('mcpkit-registry-');

const writeUserManifest = (file: string, data: unknown) => writeFile(join(readDir(), file), JSON.stringify(data));

describe('loadManifests', () => {
  it('prefers the higher version when two files declare the same server', async () => {
    await writeUserManifest('a.json', createPingManifest('1.10.0', 'newer', 'github'));
    await writeUserManifest('b.json', createPingManifest('0.9.0', 'older', 'github'));

    const { manifests } = await loadManifests(readDir());

    expect(manifests.get('github')?.description).toBe('newer');
  });

  it('skips invalid manifests with a warning', async () => {
    await writeUserManifest('bad.json', { name: 'x' });

    const { manifests, warnings } = await loadManifests(readDir());

    expect(manifests.has('x')).toBe(false);
    expect(warnings[0]).toMatch(/^skipping .*bad\.json:/);
  });

  it('loads manifests from disk and reports unreadable JSON', async () => {
    await writeFile(join(readDir(), 'demo.json'), JSON.stringify(createPingManifest('9.0.0')));
    await writeFile(join(readDir(), 'broken.json'), '{');

    const { manifests, warnings } = await loadManifests(readDir());

    expect(manifests.get('demo')?.version).toBe('9.0.0');
    expect(warnings.some((warning) => warning.includes('broken.json'))).toBe(true);
  });

  it('has no manifests when the dir is missing, since none ship in the binary', async () => {
    const { manifests, warnings } = await loadManifests(join(readDir(), 'missing'));

    expect(manifests.size).toBe(0);
    expect(warnings).toEqual([]);
  });
});

describe('updateFromRegistry', () => {
  it('writes only valid manifests', async () => {
    const fetchImpl = createRouteFetch({
      'https://reg.example/index.json': { manifests: ['demo.json', 'bad.json'] },
      'https://reg.example/demo.json': createPingManifest('3.0.0'),
      'https://reg.example/bad.json': { name: 'bad' },
    });

    const results = await updateFromRegistry('https://reg.example/', { fetchImpl, targetDir: readDir() });

    expect(results.map((result) => [result.entry, result.status])).toEqual([
      ['demo.json', 'updated'],
      ['bad.json', 'rejected'],
    ]);
    const written: unknown = JSON.parse(await readFile(join(readDir(), 'demo.json'), 'utf8'));
    expect(written).toMatchObject({ version: '3.0.0' });
  });

  it('rewrites a same-version manifest whose content changed and leaves identical ones alone', async () => {
    const route = (description: string) =>
      createRouteFetch({
        'https://reg.example/index.json': { manifests: ['demo.json'] },
        'https://reg.example/demo.json': createPingManifest('1.0.0', description),
      });

    const first = await updateFromRegistry('https://reg.example', { fetchImpl: route('one'), targetDir: readDir() });
    const same = await updateFromRegistry('https://reg.example', { fetchImpl: route('one'), targetDir: readDir() });
    const edited = await updateFromRegistry('https://reg.example', { fetchImpl: route('two'), targetDir: readDir() });

    expect([first, same, edited].map(([result]) => result?.status)).toEqual(['updated', 'unchanged', 'updated']);
    const written: unknown = JSON.parse(await readFile(join(readDir(), 'demo.json'), 'utf8'));
    expect(written).toMatchObject({ description: 'two' });
  });

  it('rejects a malformed index', async () => {
    const fetchImpl = createRouteFetch({ 'https://reg.example/index.json': { files: [] } });

    await expect(updateFromRegistry('https://reg.example', { fetchImpl, targetDir: readDir() })).rejects.toThrow(
      /"manifests" array/,
    );
  });
});

describe('manifest sync', () => {
  it('reports an empty dir, then a fresh one right after a sync, then a due one a day later', async () => {
    const fetchImpl = createRouteFetch({
      'https://reg.example/index.json': { manifests: ['demo.json'] },
      'https://reg.example/demo.json': createPingManifest('1.0.0'),
    });

    const before = await readSyncStatus(readDir());
    await syncManifests('https://reg.example', { fetchImpl, targetDir: readDir() });
    const after = await readSyncStatus(readDir());
    const later = await isSyncDue(readDir(), Date.now() + MANIFEST_SYNC_INTERVAL_MS);

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
