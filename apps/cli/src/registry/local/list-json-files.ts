import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { isMissingFileError } from '@mcpkit/core';

export const listJsonFiles = async (dir: string) => {
  try {
    const entries = await readdir(dir);
    return entries.filter((entry) => entry.endsWith('.json')).map((entry) => join(dir, entry));
  } catch (error) {
    if (isMissingFileError(error)) {
      return [];
    }
    throw error;
  }
};
