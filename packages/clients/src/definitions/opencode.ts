import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ClientDefinition } from "../types/client-definition";
import type { LaunchCommand } from "../types/launch-command";

export const opencode: ClientDefinition = {
  id: "opencode",
  name: "opencode",
  format: "json",
  detectPaths: (context) => [join(context.xdgConfigDir, "opencode")],
  configPath: (context) => {
    const jsoncPath = join(context.xdgConfigDir, "opencode", "opencode.jsonc");
    return existsSync(jsoncPath) ? jsoncPath : join(context.xdgConfigDir, "opencode", "opencode.json");
  },
  serversPath: ["mcp"],
  createEntry: (launch: LaunchCommand) => ({
    type: "local",
    command: [launch.command, ...launch.args],
    enabled: true,
  }),
};
