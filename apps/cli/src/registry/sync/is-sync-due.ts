import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import { isMissingFileError } from '@usemcpkit/core';
import { MANIFEST_SYNC_INTERVAL_MS, SYNC_MARKER_FILE_NAME } from '../const';

export const isSyncDue = async (dir: string, now = Date.now()) => {
  try {
    const { mtimeMs } = await stat(join(dir, SYNC_MARKER_FILE_NAME));
    return now - mtimeMs >= MANIFEST_SYNC_INTERVAL_MS;
  } catch (error) {
    if (isMissingFileError(error)) {
      return true;
    }
    throw error;
  }
};
