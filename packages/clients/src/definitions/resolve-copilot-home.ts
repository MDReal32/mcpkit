import { join } from 'node:path';
import type { ClientContext } from '../types/client-context';

export const resolveCopilotHome = (context: ClientContext) =>
  context.env.COPILOT_HOME ?? join(context.homeDir, '.copilot');
