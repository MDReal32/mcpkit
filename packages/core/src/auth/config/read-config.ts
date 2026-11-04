import { migrateData } from "../../migrations";
import { AuthError } from "../auth-error";
import { readTokensText } from "../token-store/read-tokens-text";
import type { UsemcpkitConfig } from "../types/usemcpkit-config";
import { CONFIG_MIGRATIONS, CONFIG_VERSION } from "./config-migrations";
import { isUsemcpkitConfig } from "./is-usemcpkit-config";

/**
 * A missing file means no settings; an older version is migrated in memory (writing happens on the next save);
 * a malformed file or one from a newer usemcpkit fails instead of being overwritten.
 */
export const readConfig = async (file: string) => {
  const text = await readTokensText(file);
  if (text === undefined) {
    const empty: UsemcpkitConfig = { version: CONFIG_VERSION };
    return empty;
  }
  let migrated: unknown;
  try {
    migrated = migrateData(JSON.parse(text), CONFIG_MIGRATIONS);
  } catch (error) {
    throw new AuthError(`${file} ${error instanceof Error ? error.message : "is not a valid usemcpkit config file"}`);
  }
  if (!isUsemcpkitConfig(migrated)) {
    throw new AuthError(`${file} is not a valid usemcpkit config file`);
  }
  return migrated;
};
