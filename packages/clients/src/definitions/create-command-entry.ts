import type { LaunchCommand } from '../types/launch-command';

export const createCommandEntry = (launch: LaunchCommand) => ({ command: launch.command, args: [...launch.args] });
