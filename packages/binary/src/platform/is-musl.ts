import { readdir } from 'node:fs/promises';
import { isMissingFileError } from '@usemcpkit/core';
import { MUSL_LOADER_DIR, MUSL_LOADER_PREFIX } from './const';

/** musl systems ship their dynamic loader as `/lib/ld-musl-<arch>.so.1`. */
export const isMusl = async () => {
  try {
    const entries = await readdir(MUSL_LOADER_DIR);
    return entries.some((entry) => entry.startsWith(MUSL_LOADER_PREFIX));
  } catch (error) {
    if (isMissingFileError(error)) {
      return false;
    }
    throw error;
  }
};
