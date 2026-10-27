import type { Env } from "../../env";
import { readVersion } from "../../migrations";
import { resolveSecretsFile } from "../secret-file/resolve-secrets-file";
import { readTokensText } from "../token-store/read-tokens-text";
import { CONFIG_VERSION } from "./config-migrations";
import { resolveConfigFile } from "./resolve-config-file";

/** True when the config file is an older version or the old `secrets.json` is still there. */
export const needsMigration = async (env: Env) => {
  if ((await readTokensText(resolveSecretsFile(env))) !== undefined) {
    return true;
  }
  const text = await readTokensText(resolveConfigFile(env));
  return text !== undefined && readVersion(JSON.parse(text)) !== CONFIG_VERSION;
};
