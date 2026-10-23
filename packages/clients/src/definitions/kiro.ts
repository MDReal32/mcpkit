import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createEnabledEntry } from './create-enabled-entry';

export const kiro: ClientDefinition = {
  id: 'kiro',
  name: 'Kiro',
  format: 'json',
  detectPaths: (context) => [join(context.homeDir, '.kiro')],
  configPath: (context) => join(context.homeDir, '.kiro', 'settings', 'mcp.json'),
  serversPath: ['mcpServers'],
  createEntry: createEnabledEntry,
};
