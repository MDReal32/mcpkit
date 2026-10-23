import { join } from 'node:path';
import type { Env } from '@usemcpkit/core';
import { resolveHomeDir } from '@usemcpkit/core';
import { BIN_DIR_NAME } from '../const';
import type { Target } from '../platform';
import { toBinaryFileName } from '../platform';

export const resolveInstalledBinaryPath = (target: Target, env: Env) =>
  join(resolveHomeDir(env), BIN_DIR_NAME, toBinaryFileName(target));
