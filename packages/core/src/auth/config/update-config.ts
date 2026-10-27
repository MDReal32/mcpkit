import type { Env } from "../../env";
import { writeJsonFile } from "../secrets/write-json-file";
import type { McpkitConfig } from "../types/mcpkit-config";
import { migrateConfig } from "./migrate-config";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";
import { runConfigExclusive } from "./run-config-exclusive";

/** Read-modify-write of the whole config, serialized so concurrent saves never lose each other's changes. */
export const updateConfig = (env: Env, change: (current: McpkitConfig) => McpkitConfig) =>
  runConfigExclusive(async () => {
    await migrateConfig(env);
    const file = resolveConfigFile(env);
    await writeJsonFile(file, change(await readConfig(file)));
    return file;
  });
