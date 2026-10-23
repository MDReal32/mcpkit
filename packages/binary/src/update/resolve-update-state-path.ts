import { join } from 'node:path';
import type { Env } from '@mcpkit/core';
import { resolveHomeDir } from '@mcpkit/core';
import { UPDATE_STATE_FILE_NAME } from '../const';

export const resolveUpdateStatePath = (env: Env) => join(resolveHomeDir(env), UPDATE_STATE_FILE_NAME);
