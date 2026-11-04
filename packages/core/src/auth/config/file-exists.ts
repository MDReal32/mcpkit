import { access } from "node:fs/promises";
import { isMissingFileError } from "../../errors";

/** A missing file is false; any other failure to reach it is thrown. */
export const fileExists = async (file: string) => {
  try {
    await access(file);
    return true;
  } catch (error) {
    if (isMissingFileError(error)) {
      return false;
    }
    throw error;
  }
};
