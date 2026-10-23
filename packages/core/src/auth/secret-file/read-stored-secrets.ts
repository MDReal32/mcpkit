import { AuthError } from "../auth-error";
import { readTokensText } from "../token-store/read-tokens-text";
import type { StoredSecrets } from "../types/store/stored-secrets";
import { isStoredSecrets } from "./is-stored-secrets";

/** A missing file means nothing is saved; a malformed one fails instead of being overwritten. */
export const readStoredSecrets = async (file: string) => {
  const text = await readTokensText(file);
  if (text === undefined) {
    const empty: StoredSecrets = {};
    return empty;
  }
  const data: unknown = JSON.parse(text);
  if (!isStoredSecrets(data)) {
    throw new AuthError(`${file} is not a valid mcpkit secrets file`);
  }
  return data;
};
