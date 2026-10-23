import { copyFile, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { BACKUP_SUFFIX, NEW_CONFIG_FILE_MODE } from "../const";
import { readFileMode } from "./read-file-mode";

/** Keeps a copy of the previous file at `<path>.mcpkit-backup`, then swaps the new content in atomically. */
export const writeConfigText = async (path: string, text: string) => {
  await mkdir(dirname(path), { recursive: true });
  const mode = await readFileMode(path);
  if (mode !== undefined) {
    await copyFile(path, `${path}${BACKUP_SUFFIX}`);
  }
  const temporaryPath = `${path}.${process.pid}.tmp`;
  try {
    await writeFile(temporaryPath, text, { mode: mode ?? NEW_CONFIG_FILE_MODE });
    await rename(temporaryPath, path);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
};
