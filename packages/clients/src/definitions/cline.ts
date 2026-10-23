import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createEnabledEntry } from './create-enabled-entry';

/** One file shared by the Cline VS Code extension, CLI and JetBrains plugin. */
export const cline: ClientDefinition = {
  id: 'cline',
  name: 'Cline',
  format: 'json',
  detectPaths: (context) => [join(context.homeDir, '.cline')],
  configPath: (context) =>
    context.env.CLINE_MCP_SETTINGS_PATH ??
    join(context.homeDir, '.cline', 'data', 'settings', 'cline_mcp_settings.json'),
  serversPath: ['mcpServers'],
  createEntry: createEnabledEntry,
};
