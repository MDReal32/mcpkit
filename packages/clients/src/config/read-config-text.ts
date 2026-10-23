import { readFile } from "node:fs/promises";
import { isMissingFileError } from "@usemcpkit/core";

/** A missing config file reads as empty, so the first entry creates it. */
export const readConfigText = async (path: string) => {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (isMissingFileError(error)) {
      return "";
    }
    throw error;
  }
};
