import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createEnabledEntry } from './create-enabled-entry';
import { resolveRooStorageDir } from './resolve-roo-storage-dir';

export const rooCode: ClientDefinition = {
  id: 'roo-code',
  name: 'Roo Code (VS Code)',
  format: 'json',
  detectPaths: (context) => [resolveRooStorageDir(context)],
  configPath: (context) => join(resolveRooStorageDir(context), 'settings', 'mcp_settings.json'),
  serversPath: ['mcpServers'],
  createEntry: createEnabledEntry,
};
