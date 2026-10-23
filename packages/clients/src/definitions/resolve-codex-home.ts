import { join } from 'node:path';
import type { ClientContext } from '../types/client-context';

export const resolveCodexHome = (context: ClientContext) => context.env.CODEX_HOME ?? join(context.homeDir, '.codex');
