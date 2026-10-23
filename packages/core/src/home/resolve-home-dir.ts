import { homedir } from "node:os";
import { join } from "node:path";
import type { Env } from "../env";

export const resolveHomeDir = (env: Env = process.env) => env.MCPKIT_HOME ?? join(homedir(), ".mcpkit");
