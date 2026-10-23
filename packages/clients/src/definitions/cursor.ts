import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createStdioEntry } from './create-stdio-entry';

export const cursor: ClientDefinition = {
  id: 'cursor',
  name: 'Cursor',
  format: 'json',
  detectPaths: (context) => [join(context.homeDir, '.cursor')],
  configPath: (context) => join(context.homeDir, '.cursor', 'mcp.json'),
  serversPath: ['mcpServers'],
  createEntry: createStdioEntry,
};
