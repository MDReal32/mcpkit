import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createCommandEntry } from './create-command-entry';

export const junie: ClientDefinition = {
  id: 'junie',
  name: 'JetBrains Junie',
  format: 'json',
  detectPaths: (context) => [join(context.homeDir, '.junie')],
  configPath: (context) => join(context.homeDir, '.junie', 'mcp', 'mcp.json'),
  serversPath: ['mcpServers'],
  createEntry: createCommandEntry,
};
