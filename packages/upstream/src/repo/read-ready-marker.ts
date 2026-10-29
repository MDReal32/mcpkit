import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { READY_MARKER_FILE_NAME } from "./const";

/** What the clone in `dir` was prepared from, or undefined when there is no finished clone. */
export const readReadyMarker = async (dir: string) => {
  try {
    return await readFile(join(dir, READY_MARKER_FILE_NAME), "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
};
