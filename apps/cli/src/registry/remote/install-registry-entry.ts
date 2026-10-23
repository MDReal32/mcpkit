import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isValidManifest, validateManifest } from '@mcpkit/core';
import type { UpdateResult } from '../types/update-result';
import { fetchJson } from './fetch-json';

/** Manifest names match SERVER_NAME_PATTERN after validation, so they are safe file names. */
export const installRegistryEntry = async (
  baseUrl: string,
  entry: string,
  targetDir: string,
  fetchImpl: typeof fetch,
) => {
  const data = await fetchJson(`${baseUrl}/${encodeURIComponent(entry)}`, fetchImpl);
  if (!isValidManifest(data)) {
    const rejected: UpdateResult = { status: 'rejected', entry, errors: validateManifest(data) };
    return rejected;
  }
  await writeFile(join(targetDir, `${data.name}.json`), `${JSON.stringify(data, null, 2)}\n`);
  const updated: UpdateResult = {
    status: 'updated',
    entry,
    name: data.name,
    version: data.version,
  };
  return updated;
};
