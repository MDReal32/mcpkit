import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { ServerEntry } from './types/server-entry';

/** Every folder in serversDir is a server whose entry is `<dir>/<dir>.ts`. */
export const listServerEntries = async (serversDir: string) => {
  const dirents = await readdir(serversDir, { withFileTypes: true });
  return dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort()
    .map((dir) => {
      const entry: ServerEntry = { dir, file: join(serversDir, dir, `${dir}.ts`) };
      return entry;
    });
};
