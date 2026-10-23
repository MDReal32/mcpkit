import { join } from 'node:path';
import type { Env } from '@mcpkit/core';
import { resolveHomeDir } from '@mcpkit/core';
import { MANIFESTS_DIR_NAME } from '../const';

export const resolveUserDir = (env: Env = process.env) => join(resolveHomeDir(env), MANIFESTS_DIR_NAME);
