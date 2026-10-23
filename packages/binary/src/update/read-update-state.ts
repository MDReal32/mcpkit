import { readFile } from 'node:fs/promises';
import type { Env } from '@usemcpkit/core';
import { isJsonObject, isMissingFileError } from '@usemcpkit/core';
import type { UpdateState } from '../types/update-state';
import { resolveUpdateStatePath } from './resolve-update-state-path';

/** A missing or unreadable state file means "never checked". */
export const readUpdateState = async (env: Env) => {
  const empty: UpdateState = { checkedAt: 0 };
  try {
    const data: unknown = JSON.parse(await readFile(resolveUpdateStatePath(env), 'utf8'));
    if (!isJsonObject(data) || typeof data.checkedAt !== 'number') {
      return empty;
    }
    const state: UpdateState = { checkedAt: data.checkedAt };
    return state;
  } catch (error) {
    if (isMissingFileError(error) || error instanceof SyntaxError) {
      return empty;
    }
    throw error;
  }
};
