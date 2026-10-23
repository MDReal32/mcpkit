import { join } from 'node:path';
import type { Env } from '../../env';
import { resolveHomeDir } from '../../home';
import { CONFIG_FILE_NAME } from '../const';

export const resolveConfigFile = (env: Env) => join(resolveHomeDir(env), CONFIG_FILE_NAME);
