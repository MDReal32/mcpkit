import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createStdioEntry } from './create-stdio-entry';

export const claudeCode: ClientDefinition = {
  id: 'claude-code',
  name: 'Claude Code',
  format: 'json',
  detectPaths: (context) => [join(context.homeDir, '.claude'), join(context.homeDir, '.claude.json')],
  configPath: (context) => join(context.homeDir, '.claude.json'),
  serversPath: ['mcpServers'],
  createEntry: createStdioEntry,
};
