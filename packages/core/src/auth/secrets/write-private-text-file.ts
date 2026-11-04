import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { PRIVATE_DIR_MODE, PRIVATE_FILE_MODE } from "../const";

/** Writes through a temp file and rename so a crash never leaves a half-written file; the folder is 0700, the file 0600. */
export const writePrivateTextFile = async (file: string, text: string) => {
  await mkdir(dirname(file), { recursive: true, mode: PRIVATE_DIR_MODE });
  const tempFile = `${file}.${process.pid}.tmp`;
  await writeFile(tempFile, text, { mode: PRIVATE_FILE_MODE });
  await rename(tempFile, file);
};
