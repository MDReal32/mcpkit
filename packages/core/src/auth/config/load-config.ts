import type { Env } from "../../env";
import { hasLegacySecrets, migrateLegacySecrets } from "./migrate-legacy-secrets";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";
import { runConfigExclusive } from "./run-config-exclusive";

/** Reads the config, first folding in an old `secrets.json` when one is still there. */
export const loadConfig = async (env: Env) => {
  if (await hasLegacySecrets(env)) {
    await runConfigExclusive(() => migrateLegacySecrets(env));
  }
  return readConfig(resolveConfigFile(env));
};
