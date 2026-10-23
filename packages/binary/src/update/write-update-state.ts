import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { Env } from '@mcpkit/core';
import type { UpdateState } from '../types/update-state';
import { resolveUpdateStatePath } from './resolve-update-state-path';

export const writeUpdateState = async (env: Env, state: UpdateState) => {
  const path = resolveUpdateStatePath(env);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(state)}\n`);
};
