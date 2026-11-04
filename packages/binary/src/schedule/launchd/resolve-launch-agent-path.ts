import { homedir } from "node:os";
import { join } from "node:path";
import { LAUNCH_AGENTS_DIR } from "../const";

export const resolveLaunchAgentPath = (label: string) => join(homedir(), LAUNCH_AGENTS_DIR, `${label}.plist`);
