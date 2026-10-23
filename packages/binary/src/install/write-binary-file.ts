import { chmod, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { isMissingFileError } from "@usemcpkit/core";
import { EXECUTABLE_MODE, REPLACED_BINARY_SUFFIX } from "../const";

/**
 * Replaces the binary atomically. Windows cannot overwrite a running .exe but can rename it,
 * so the current file is moved aside to `<path>.old` first; the next replacement deletes it.
 */
export const writeBinaryFile = async (path: string, bytes: Uint8Array) => {
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.${process.pid}.tmp`;
  try {
    await writeFile(temporaryPath, bytes, { mode: EXECUTABLE_MODE });
    await chmod(temporaryPath, EXECUTABLE_MODE);
    if (process.platform === "win32") {
      const replacedPath = `${path}${REPLACED_BINARY_SUFFIX}`;
      await rm(replacedPath, { force: true });
      await rename(path, replacedPath).catch((error: unknown) => {
        if (!isMissingFileError(error)) {
          throw error;
        }
      });
    }
    await rename(temporaryPath, path);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
};
