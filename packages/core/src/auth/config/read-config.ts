import { migrateData } from "../../migrations";
import { AuthError } from "../auth-error";
import { readTokensText } from "../token-store/read-tokens-text";
import type { McpkitConfig } from "../types/mcpkit-config";
import { CONFIG_MIGRATIONS, CONFIG_VERSION } from "./config-migrations";
import { isMcpkitConfig } from "./is-mcpkit-config";

/**
 * A missing file means no settings; an older version is migrated in memory (writing happens on the next save);
 * a malformed file or one from a newer mcpkit fails instead of being overwritten.
 */
export const readConfig = async (file: string) => {
  const text = await readTokensText(file);
  if (text === undefined) {
    const empty: McpkitConfig = { version: CONFIG_VERSION };
    return empty;
  }
  let migrated: unknown;
  try {
    migrated = migrateData(JSON.parse(text), CONFIG_MIGRATIONS);
  } catch (error) {
    throw new AuthError(`${file} ${error instanceof Error ? error.message : "is not a valid mcpkit config file"}`);
  }
  if (!isMcpkitConfig(migrated)) {
    throw new AuthError(`${file} is not a valid mcpkit config file`);
  }
  return migrated;
};
