import { rename } from "node:fs/promises";
import { isMissingFileError } from "@usemcpkit/core";

/** Moves `replacement` to `target`; what was there is moved to `previous` first, so `target` is never half-removed. */
export const replaceDirectory = async (target: string, replacement: string, previous: string) => {
  try {
    await rename(target, previous);
  } catch (error) {
    if (!isMissingFileError(error)) {
      throw error;
    }
  }
  await rename(replacement, target);
};
