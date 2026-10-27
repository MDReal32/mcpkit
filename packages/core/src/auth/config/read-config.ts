import { AuthError } from "../auth-error";
import { CONFIG_VERSION, FIRST_CONFIG_VERSION } from "../const";
import { readTokensText } from "../token-store/read-tokens-text";
import type { McpkitConfig } from "../types/mcpkit-config";
import { isConfigV1 } from "./is-config-v1";
import { isMcpkitConfig } from "./is-mcpkit-config";
import { readConfigVersion } from "./read-config-version";
import { upgradeConfigV1 } from "./upgrade-config-v1";

/**
 * A missing file means no settings; an older version is upgraded in memory (writing happens on the next save);
 * a malformed file or one from a newer mcpkit fails instead of being overwritten.
 */
export const readConfig = async (file: string) => {
  const text = await readTokensText(file);
  if (text === undefined) {
    const empty: McpkitConfig = { version: CONFIG_VERSION };
    return empty;
  }
  const data: unknown = JSON.parse(text);
  const version = readConfigVersion(data);
  if (typeof version === "number" && version > CONFIG_VERSION) {
    throw new AuthError(
      `${file} is version ${version}; this mcpkit reads up to version ${CONFIG_VERSION}, update mcpkit`,
    );
  }
  if (version === FIRST_CONFIG_VERSION && isConfigV1(data)) {
    return upgradeConfigV1(data);
  }
  if (!isMcpkitConfig(data)) {
    throw new AuthError(`${file} is not a valid mcpkit config file`);
  }
  return data;
};
