import type { LaunchCommand } from '../types/launch-command';

/** Shape of clients that keep a `disabled` switch next to each server (Cline, Kiro, Roo Code). */
export const createEnabledEntry = (launch: LaunchCommand) => ({
  command: launch.command,
  args: [...launch.args],
  disabled: false,
});
