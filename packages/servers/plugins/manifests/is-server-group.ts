import type { Dirent } from "node:fs";

/** A folder without its own entry file that holds other folders (and no `tools`) only groups servers. */
export const isServerGroup = (name: string, children: Dirent[]) => {
  const hasEntry = children.some((child) => child.isFile() && child.name === `${name}.ts`);
  const hasTools = children.some((child) => child.isDirectory() && child.name === "tools");
  return !hasEntry && !hasTools && children.some((child) => child.isDirectory());
};
