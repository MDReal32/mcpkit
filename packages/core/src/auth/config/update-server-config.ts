import type { Env } from "../../env";
import { writeJsonFile } from "../secrets/write-json-file";
import type { McpkitConfig } from "../types/mcpkit-config";
import type { ServerConfig } from "../types/server-config";
import { migrateLegacySecrets } from "./migrate-legacy-secrets";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";
import { runConfigExclusive } from "./run-config-exclusive";

/** Read-modify-write of one server's entry, serialized so concurrent saves never lose each other's changes. */
export const updateServerConfig = (env: Env, serverName: string, change: (current: ServerConfig) => ServerConfig) =>
  runConfigExclusive(async () => {
    await migrateLegacySecrets(env);
    const file = resolveConfigFile(env);
    const config = await readConfig(file);
    const updated: McpkitConfig = {
      ...config,
      servers: { ...config.servers, [serverName]: change(config.servers?.[serverName] ?? {}) },
    };
    await writeJsonFile(file, updated);
    return file;
  });
