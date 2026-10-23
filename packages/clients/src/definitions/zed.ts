import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import type { LaunchCommand } from '../types/launch-command';
import { resolveZedDir } from './resolve-zed-dir';

export const zed: ClientDefinition = {
  id: 'zed',
  name: 'Zed',
  format: 'json',
  detectPaths: (context) => [resolveZedDir(context)],
  configPath: (context) => join(resolveZedDir(context), 'settings.json'),
  serversPath: ['context_servers'],
  createEntry: (launch: LaunchCommand) => ({ command: launch.command, args: [...launch.args], enabled: true }),
};
