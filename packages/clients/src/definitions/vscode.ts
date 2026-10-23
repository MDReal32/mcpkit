import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createStdioEntry } from './create-stdio-entry';
import { resolveVscodeUserDir } from './resolve-vscode-user-dir';

export const vscode: ClientDefinition = {
  id: 'vscode',
  name: 'VS Code',
  format: 'json',
  detectPaths: (context) => [resolveVscodeUserDir(context, 'Code')],
  configPath: (context) => join(resolveVscodeUserDir(context, 'Code'), 'mcp.json'),
  serversPath: ['servers'],
  createEntry: createStdioEntry,
};
