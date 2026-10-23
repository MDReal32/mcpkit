import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isMissingFileError, isValidManifest, validateManifest } from '@usemcpkit/core';
import type { UpdateResult } from '../types/update-result';
import { fetchJson } from './fetch-json';

const readExisting = async (file: string) => {
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};

/**
 * Manifest names match SERVER_NAME_PATTERN after validation, so they are safe file names.
 * Content is compared, not the version, so an edit published without a version bump still lands.
 */
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
  const file = join(targetDir, `${data.name}.json`);
  const content = `${JSON.stringify(data, null, 2)}\n`;
  const changed = (await readExisting(file)) !== content;
  if (changed) {
    await writeFile(file, content);
  }
  const result: UpdateResult = {
    status: changed ? 'updated' : 'unchanged',
    entry,
    name: data.name,
    version: data.version,
  };
  return result;
};
