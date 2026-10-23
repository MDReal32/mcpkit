import { AuthError } from '../auth-error';
import type { StoredTokens } from '../types/oauth/stored-tokens';
import { isStoredTokens } from './is-stored-tokens';
import { readTokensText } from './read-tokens-text';

/** A missing file means no sessions; a malformed one fails instead of being overwritten. */
export const readTokens = async (file: string) => {
  const text = await readTokensText(file);
  if (text === undefined) {
    const empty: StoredTokens = {};
    return empty;
  }
  const data: unknown = JSON.parse(text);
  if (!isStoredTokens(data)) {
    throw new AuthError(`${file} is not a valid tokens file`);
  }
  return data;
};
