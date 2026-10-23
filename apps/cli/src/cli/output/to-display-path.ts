import { homedir } from "node:os";
import { sep } from "node:path";

/** Shortens paths under the home directory to `~/...` for terminal output. */
export const toDisplayPath = (path: string, homeDir: string = homedir()) =>
  path === homeDir || path.startsWith(`${homeDir}${sep}`) ? `~${path.slice(homeDir.length)}` : path;
