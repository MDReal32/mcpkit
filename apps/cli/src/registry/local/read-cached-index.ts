import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isMissingFileError } from '@usemcpkit/core';
import { INDEX_FILE_NAME } from '../const';
import { parseRegistryIndex } from '../remote/parse-registry-index';

export const readCachedIndex = async (dir: string) => {
  try {
    const body: unknown = JSON.parse(await readFile(join(dir, INDEX_FILE_NAME), 'utf8'));
    return parseRegistryIndex(body);
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
