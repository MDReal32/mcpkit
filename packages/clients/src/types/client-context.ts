import type { Env } from '@mcpkit/core';

export interface ClientContext {
  homeDir: string;
  /** macOS `~/Library/Application Support`, Windows `%APPDATA%`, Linux `$XDG_CONFIG_HOME` or `~/.config`. */
  appDataDir: string;
  /** `$XDG_CONFIG_HOME` or `~/.config` on every OS; several cross-platform CLIs keep their config there. */
  xdgConfigDir: string;
  platform: NodeJS.Platform;
  env: Env;
}
