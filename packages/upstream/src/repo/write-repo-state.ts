import { rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { RepoState } from "../types/repo-state";
import { READY_MARKER_FILE_NAME } from "./const";

export const writeRepoState = async (dir: string, state: RepoState) => {
  const file = join(dir, READY_MARKER_FILE_NAME);
  const pending = `${file}.${process.pid}.tmp`;
  await writeFile(pending, JSON.stringify(state));
  await rename(pending, file);
};
