import { readdir } from "node:fs/promises";
import { basename, join } from "node:path";
import { isServerGroup } from "./is-server-group";
import type { ServerEntry } from "./types/server-entry";

/**
 * A folder holding `<folder>.ts` is a server and a folder that only holds other folders groups them.
 * `dir` is the path below serversDir, so `github/actions/actions.ts` is the server `github_actions`.
 */
export const listServerEntries = async (serversDir: string, parent = ""): Promise<ServerEntry[]> => {
  const folders = (await readdir(join(serversDir, parent), { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => (parent ? `${parent}/${dirent.name}` : dirent.name))
    .sort();
  const nested = await Promise.all(
    folders.map(async (dir) => {
      const children = await readdir(join(serversDir, dir), { withFileTypes: true });
      if (isServerGroup(basename(dir), children)) {
        return listServerEntries(serversDir, dir);
      }
      const entry: ServerEntry = { dir, file: join(serversDir, dir, `${basename(dir)}.ts`) };
      return [entry];
    }),
  );
  return nested.flat();
};
