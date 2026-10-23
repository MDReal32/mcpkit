import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import type { LaunchCommand } from '../types/launch-command';
import { resolveCopilotHome } from './resolve-copilot-home';

/** Also VS Code's portable "Copilot Global" MCP config. */
export const copilotCli: ClientDefinition = {
  id: 'copilot-cli',
  name: 'GitHub Copilot CLI',
  format: 'json',
  detectPaths: (context) => [resolveCopilotHome(context)],
  configPath: (context) => join(resolveCopilotHome(context), 'mcp-config.json'),
  serversPath: ['mcpServers'],
  createEntry: (launch: LaunchCommand) => ({
    type: 'local',
    command: launch.command,
    args: [...launch.args],
    tools: ['*'],
  }),
};
