import { writePrivateTextFile } from "./write-private-text-file";

/** Writes `JSON.stringify(value, null, 2)` as a private file, the way writePrivateTextFile does. */
export const writeJsonFile = async (file: string, value: unknown) =>
  writePrivateTextFile(file, `${JSON.stringify(value, null, 2)}\n`);
