import { homedir } from "node:os";
import { join } from "node:path";
import type { Env } from "../env";
import { LEGACY_HOME_DIR_NAME } from "./const";

/**
 * `~/.mcpkit`, where an older release kept its files, or undefined when `USEMCPKIT_HOME` picks the home folder, since
 * a chosen folder never adopts another one.
 */
export const resolveLegacyHomeDir = (env: Env = process.env) =>
  env.USEMCPKIT_HOME === undefined ? join(homedir(), LEGACY_HOME_DIR_NAME) : undefined;
