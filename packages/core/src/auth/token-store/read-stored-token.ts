import type { Env } from '../../env';
import { readTokens } from './read-tokens';
import { resolveTokensFile } from './resolve-tokens-file';

export const readStoredToken = async (env: Env, serverName: string) => {
  const tokens = await readTokens(resolveTokensFile(env));
  return tokens[serverName];
};
