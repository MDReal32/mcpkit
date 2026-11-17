import { lstat, mkdir, readlink, symlink, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { SERVE_LINK_NAME, SERVE_SCRIPT_SEGMENTS } from "./const";

/** Puts `serve.sh` on PATH next to the running `node`, since a client takes its PATH from the user's shell. */
export const linkServeScript = async (workspaceRoot: string, directory = dirname(process.execPath)) => {
  const target = join(workspaceRoot, ...SERVE_SCRIPT_SEGMENTS);
  const link = join(directory, SERVE_LINK_NAME);
  await mkdir(directory, { recursive: true });
  const existing = await lstat(link).catch(() => undefined);
  if (existing !== undefined) {
    if (!existing.isSymbolicLink()) {
      throw new Error(`${link} exists and is not a link`);
    }
    if ((await readlink(link)) === target) {
      return link;
    }
    await unlink(link);
  }
  await symlink(target, link);
  return link;
};
