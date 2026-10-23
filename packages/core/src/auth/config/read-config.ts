import { AuthError } from "../auth-error";
import { readTokensText } from "../token-store/read-tokens-text";
import type { McpkitConfig } from "../types/mcpkit-config";
import { isMcpkitConfig } from "./is-mcpkit-config";

/** A missing file means no settings; a malformed one fails instead of being overwritten. */
export const readConfig = async (file: string) => {
  const text = await readTokensText(file);
  if (text === undefined) {
    const empty: McpkitConfig = {};
    return empty;
  }
  const data: unknown = JSON.parse(text);
  if (!isMcpkitConfig(data)) {
    throw new AuthError(`${file} is not a valid mcpkit config file`);
  }
  return data;
};
