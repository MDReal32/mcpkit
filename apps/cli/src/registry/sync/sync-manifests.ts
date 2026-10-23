import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SYNC_MARKER_FILE_NAME } from '../const';
import { resolveUserDir } from '../local/resolve-user-dir';
import { resolveRegistryUrl } from '../remote/resolve-registry-url';
import { updateFromRegistry } from '../remote/update-from-registry';
import type { UpdateOptions } from '../types/update-options';

/** Marks the attempt before fetching so a failing registry is retried once a day, not on every start. */
export const syncManifests = async (
  registry?: string,
  { fetchImpl, targetDir = resolveUserDir() }: UpdateOptions = {},
) => {
  await mkdir(targetDir, { recursive: true });
  await writeFile(join(targetDir, SYNC_MARKER_FILE_NAME), `${new Date().toISOString()}\n`);
  return updateFromRegistry(resolveRegistryUrl(registry), { fetchImpl, targetDir });
};
