import { rm } from "node:fs/promises";
import type { Env } from "../../env";
import { mergeLegacySecrets } from "../secret-file/merge-legacy-secrets";
import { readStoredSecrets } from "../secret-file/read-stored-secrets";
import { resolveSecretsFile } from "../secret-file/resolve-secrets-file";
import { writeJsonFile } from "../secrets/write-json-file";
import { readTokensText } from "../token-store/read-tokens-text";
import { needsMigration } from "./needs-migration";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";

/** Writes the config in the current version and folds in the old `secrets.json`, then removes it. Call it under the config lock. */
export const migrateConfig = async (env: Env) => {
  if (!(await needsMigration(env))) {
    return;
  }
  const configFile = resolveConfigFile(env);
  const legacyFile = resolveSecretsFile(env);
  const config = await readConfig(configFile);
  const legacy = (await readTokensText(legacyFile)) === undefined ? undefined : await readStoredSecrets(legacyFile);
  await writeJsonFile(configFile, legacy ? mergeLegacySecrets(config, legacy) : config);
  if (legacy) {
    await rm(legacyFile);
  }
};
