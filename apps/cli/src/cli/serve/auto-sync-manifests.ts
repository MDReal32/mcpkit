import { AUTO_UPDATE_ENV } from '@usemcpkit/binary';
import { readSyncStatus } from '../../registry';
import { syncQuietly } from './sync-quietly';

/**
 * No manifests ship in the binary. With none on disk the first sync is awaited; afterwards a daily check
 * runs in the background and its result applies the next time the server starts.
 */
export const autoSyncManifests = async (env = process.env) => {
  const status = await readSyncStatus();
  if (status === 'empty') {
    await syncQuietly();
    return;
  }
  if (status === 'due' && env[AUTO_UPDATE_ENV] !== '0') {
    void syncQuietly();
  }
};
