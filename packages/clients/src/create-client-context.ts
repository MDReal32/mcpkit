import { homedir } from "node:os";
import { join } from "node:path";
import type { Env } from "@usemcpkit/core";
import { resolveAppDataDir } from "./paths/resolve-app-data-dir";
import type { ClientContext } from "./types/client-context";

export const createClientContext = (
  env: Env = process.env,
  platform: NodeJS.Platform = process.platform,
  homeDir: string = homedir(),
) => {
  const context: ClientContext = {
    homeDir,
    appDataDir: resolveAppDataDir(homeDir, platform, env),
    xdgConfigDir: env.XDG_CONFIG_HOME ?? join(homeDir, ".config"),
    platform,
    env,
  };
  return context;
};
