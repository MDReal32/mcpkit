import { join } from 'node:path';
import type { Env } from '@usemcpkit/core';

export const resolveAppDataDir = (homeDir: string, platform: NodeJS.Platform, env: Env) => {
  if (platform === 'darwin') {
    return join(homeDir, 'Library', 'Application Support');
  }
  if (platform === 'win32') {
    return env.APPDATA ?? join(homeDir, 'AppData', 'Roaming');
  }
  return env.XDG_CONFIG_HOME ?? join(homeDir, '.config');
};
