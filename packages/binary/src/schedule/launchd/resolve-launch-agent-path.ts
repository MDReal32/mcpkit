import { homedir } from "node:os";
import { join } from "node:path";
import { LAUNCH_AGENT_LABEL, LAUNCH_AGENTS_DIR } from "../const";

export const resolveLaunchAgentPath = () => join(homedir(), LAUNCH_AGENTS_DIR, `${LAUNCH_AGENT_LABEL}.plist`);
