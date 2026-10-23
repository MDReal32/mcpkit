import { listJsonFiles } from '../local/list-json-files';
import { resolveUserDir } from '../local/resolve-user-dir';
import { isSyncDue } from './is-sync-due';

export type SyncStatus = 'empty' | 'due' | 'fresh';

export const readSyncStatus = async (dir = resolveUserDir()) => {
  if ((await listJsonFiles(dir)).length === 0) {
    return 'empty' satisfies SyncStatus;
  }
  return (await isSyncDue(dir)) ? 'due' : 'fresh';
};
