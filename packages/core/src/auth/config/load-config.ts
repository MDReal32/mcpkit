import type { Env } from "../../env";
import { migrateConfig } from "./migrate-config";
import { needsMigration } from "./needs-migration";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";
import { runConfigExclusive } from "./run-config-exclusive";

/** Reads the config, first migrating an older file or an old `secrets.json` to the current version. */
export const loadConfig = async (env: Env) => {
  if (await needsMigration(env)) {
    await runConfigExclusive(() => migrateConfig(env));
  }
  return readConfig(resolveConfigFile(env));
};
