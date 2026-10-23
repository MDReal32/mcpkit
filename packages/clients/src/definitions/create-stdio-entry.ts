import type { LaunchCommand } from "../types/launch-command";

export const createStdioEntry = (launch: LaunchCommand) => ({
  type: "stdio",
  command: launch.command,
  args: [...launch.args],
});
