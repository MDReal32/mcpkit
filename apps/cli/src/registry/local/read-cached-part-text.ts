import { readFile } from "node:fs/promises";
import { isMissingFileError } from "@usemcpkit/core";
import { resolvePartPath } from "./part-path";

export const readCachedPartText = async (dir: string, id: string, partName: string) => {
  try {
    return await readFile(resolvePartPath(dir, id, partName), "utf8");
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
