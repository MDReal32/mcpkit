import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { PRIVATE_DIR_MODE, PRIVATE_FILE_MODE } from '../const';

/** Writes through a temp file and rename so a crash never leaves a half-written file. */
export const writeJsonFile = async (file: string, value: unknown) => {
  await mkdir(dirname(file), { recursive: true, mode: PRIVATE_DIR_MODE });
  const tempFile = `${file}.${process.pid}.tmp`;
  await writeFile(tempFile, `${JSON.stringify(value, null, 2)}\n`, { mode: PRIVATE_FILE_MODE });
  await rename(tempFile, file);
};
