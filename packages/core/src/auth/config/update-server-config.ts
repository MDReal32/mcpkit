import type { Env } from "../../env";
import { writeJsonFile } from "../secrets/write-json-file";
import type { McpkitConfig } from "../types/mcpkit-config";
import type { ServerConfig } from "../types/server-config";
import type { ServerKey } from "../types/server-key";
import { migrateConfig } from "./migrate-config";
import { readConfig } from "./read-config";
import { readServerConfig } from "./read-server-config";
import { resolveConfigFile } from "./resolve-config-file";
import { runConfigExclusive } from "./run-config-exclusive";

/** Read-modify-write of one server's entry, serialized so concurrent saves never lose each other's changes. */
export const updateServerConfig = (env: Env, server: ServerKey, change: (current: ServerConfig) => ServerConfig) =>
  runConfigExclusive(async () => {
    await migrateConfig(env);
    const file = resolveConfigFile(env);
    const config = await readConfig(file);
    const updated: McpkitConfig = {
      ...config,
      servers: {
        ...config.servers,
        [server.category]: {
          ...config.servers?.[server.category],
          [server.name]: change(readServerConfig(config, server) ?? {}),
        },
      },
    };
    await writeJsonFile(file, updated);
    return file;
  });
