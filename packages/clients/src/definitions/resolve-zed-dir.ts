import { join } from 'node:path';
import type { ClientContext } from '../types/client-context';

export const resolveZedDir = (context: ClientContext) =>
  context.platform === 'win32' ? join(context.appDataDir, 'Zed') : join(context.xdgConfigDir, 'zed');
