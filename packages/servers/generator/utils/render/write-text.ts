import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export const writeText = async (file: string, content: string) => {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
};
