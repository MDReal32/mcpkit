import { stat } from "node:fs/promises";

/** Changes whenever the file is replaced or rewritten. */
export const readFileSignature = async (path: string) => {
  const { ino, size, mtimeMs } = await stat(path);
  return `${ino}:${size}:${mtimeMs}`;
};
