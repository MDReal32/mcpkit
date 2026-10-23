import { readFile } from "node:fs/promises";
import { isMissingFileError } from "@usemcpkit/core";
import { resolveManifestPath } from "../ids/resolve-manifest-path";

export const readCachedManifestText = async (dir: string, id: string) => {
  try {
    return await readFile(resolveManifestPath(dir, id), "utf8");
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
