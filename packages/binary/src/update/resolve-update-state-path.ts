import { join } from 'node:path';
import type { Env } from '@usemcpkit/core';
import { resolveHomeDir } from '@usemcpkit/core';
import { UPDATE_STATE_FILE_NAME } from '../const';

export const resolveUpdateStatePath = (env: Env) => join(resolveHomeDir(env), UPDATE_STATE_FILE_NAME);
