import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createPingManifest, useTempDir } from '@usemcpkit/testing';
import { describe, expect, it } from 'vitest';
import { loadManifests, updateFromRegistry } from '../src/registry';
import { createRouteFetch } from './fixtures/create-route-fetch';

const readDir = useTempDir('mcpkit-registry-');

const writeUserManifest = (file: string, data: unknown) => writeFile(join(readDir(), file), JSON.stringify(data));

describe('loadManifests', () => {
  it('replaces a bundled manifest only with the same or a numerically higher version', async () => {
    await writeUserManifest('a.json', createPingManifest('1.10.0', 'newer', 'github'));
    await writeUserManifest('b.json', createPingManifest('0.9.0', 'older', 'github'));

    const { manifests } = await loadManifests(readDir());

    expect(manifests.get('github')?.description).toBe('newer');
  });

  it('keeps the bundled manifest over an older user version', async () => {
    await writeUserManifest('github.json', createPingManifest('0.9.9', 'older', 'github'));

    const { manifests } = await loadManifests(readDir());

    expect(manifests.get('github')?.version).toBe('1.0.0');
  });

  it('lets a user manifest win a version tie', async () => {
    await writeUserManifest('github.json', createPingManifest('1.0', 'user', 'github'));

    const { manifests } = await loadManifests(readDir());

    expect(manifests.get('github')?.description).toBe('user');
  });

  it('skips invalid manifests with a warning', async () => {
    await writeUserManifest('bad.json', { name: 'x' });

    const { manifests, warnings } = await loadManifests(readDir());

    expect(manifests.has('x')).toBe(false);
    expect(warnings[0]).toMatch(/^skipping .*bad\.json:/);
  });

  it('loads user manifests from disk and reports unreadable JSON', async () => {
    await writeFile(join(readDir(), 'demo.json'), JSON.stringify(createPingManifest('9.0.0')));
    await writeFile(join(readDir(), 'broken.json'), '{');

    const { manifests, warnings } = await loadManifests(readDir());

    expect(manifests.get('demo')?.version).toBe('9.0.0');
    expect(manifests.has('github')).toBe(true);
    expect(warnings.some((warning) => warning.includes('broken.json'))).toBe(true);
  });

  it('treats a missing user dir as empty', async () => {
    const { manifests, warnings } = await loadManifests(join(readDir(), 'missing'));

    expect(manifests.has('github')).toBe(true);
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

  it('rejects a malformed index', async () => {
    const fetchImpl = createRouteFetch({ 'https://reg.example/index.json': { files: [] } });

    await expect(updateFromRegistry('https://reg.example', { fetchImpl, targetDir: readDir() })).rejects.toThrow(
      /"manifests" array/,
    );
  });
});
