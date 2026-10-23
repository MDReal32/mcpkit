import type { Env } from '../../env';
import { writeJsonFile } from '../secrets/write-json-file';
import type { StoredToken } from '../types/oauth/stored-token';
import { readTokens } from './read-tokens';
import { resolveTokensFile } from './resolve-tokens-file';

export const saveToken = async (env: Env, serverName: string, token: StoredToken) => {
  const file = resolveTokensFile(env);
  const tokens = await readTokens(file);
  await writeJsonFile(file, { ...tokens, [serverName]: token });
  return file;
};
