import { readFile } from "node:fs/promises";
import { isMissingFileError } from "@usemcpkit/core";

/** Undefined when the file does not exist. */
export const readTextFile = async (path: string) => {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
