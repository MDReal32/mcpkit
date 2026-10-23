import { join } from 'node:path';
import type { ClientDefinition } from '../types/client-definition';
import { createCommandEntry } from './create-command-entry';
import { resolveCodexHome } from './resolve-codex-home';

export const codex: ClientDefinition = {
  id: 'codex',
  name: 'OpenAI Codex',
  format: 'toml',
  detectPaths: (context) => [resolveCodexHome(context)],
  configPath: (context) => join(resolveCodexHome(context), 'config.toml'),
  serversPath: ['mcp_servers'],
  createEntry: createCommandEntry,
};
