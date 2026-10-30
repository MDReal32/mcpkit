import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isMissingFileError } from "@usemcpkit/core";
import { READY_MARKER_FILE_NAME } from "./const";
import { parseRepoState } from "./parse-repo-state";

/** What is known about the clone in `dir`, or undefined when there is no finished clone. */
export const readRepoState = async (dir: string) => {
  try {
    return parseRepoState(await readFile(join(dir, READY_MARKER_FILE_NAME), "utf8"));
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
