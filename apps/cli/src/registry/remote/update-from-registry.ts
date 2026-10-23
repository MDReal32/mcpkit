import { mkdir } from 'node:fs/promises';
import { resolveUserDir } from '../local/resolve-user-dir';
import type { UpdateOptions } from '../types/update-options';
import type { UpdateResult } from '../types/update-result';
import { fetchJson } from './fetch-json';
import { installRegistryEntry } from './install-registry-entry';
import { parseRegistryIndex } from './parse-registry-index';

export const updateFromRegistry = async (
  registryUrl: string,
  { fetchImpl = fetch, targetDir = resolveUserDir() }: UpdateOptions = {},
) => {
  const baseUrl = registryUrl.replace(/\/$/, '');
  const index = parseRegistryIndex(await fetchJson(`${baseUrl}/index.json`, fetchImpl));
  await mkdir(targetDir, { recursive: true });
  const results: UpdateResult[] = [];
  for (const entry of index.manifests) {
    results.push(await installRegistryEntry(baseUrl, entry, targetDir, fetchImpl));
  }
  return results;
};
