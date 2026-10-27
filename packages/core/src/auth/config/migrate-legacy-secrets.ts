import { rm } from "node:fs/promises";
import type { Env } from "../../env";
import { mergeLegacySecrets } from "../secret-file/merge-legacy-secrets";
import { readStoredSecrets } from "../secret-file/read-stored-secrets";
import { resolveSecretsFile } from "../secret-file/resolve-secrets-file";
import { writeJsonFile } from "../secrets/write-json-file";
import { readTokensText } from "../token-store/read-tokens-text";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";

export const hasLegacySecrets = async (env: Env) => (await readTokensText(resolveSecretsFile(env))) !== undefined;

/** Moves the credentials of the old `secrets.json` into the config file, then removes the old file. Call it under the config lock. */
export const migrateLegacySecrets = async (env: Env) => {
  const legacyFile = resolveSecretsFile(env);
  if (!(await hasLegacySecrets(env))) {
    return;
  }
  const configFile = resolveConfigFile(env);
  const merged = mergeLegacySecrets(await readConfig(configFile), await readStoredSecrets(legacyFile));
  await writeJsonFile(configFile, merged);
  await rm(legacyFile);
};
