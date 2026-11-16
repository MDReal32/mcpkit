import { access } from "node:fs/promises";
import { join } from "node:path";
import { PREREQUISITES } from "./const.ts";

export const checkPrerequisites = async (workspaceRoot: string) => {
  const missing: string[] = [];
  for (const { path, builtBy } of PREREQUISITES) {
    const file = join(workspaceRoot, ...path);
    try {
      await access(file);
    } catch {
      missing.push(`${file} (${builtBy})`);
    }
  }
  if (missing.length > 0) {
    throw new Error(`run "yarn build" once first, it makes:\n${missing.join("\n")}`);
  }
};
