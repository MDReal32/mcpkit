import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const FIRST_LOCAL_PATH_ARGUMENT = 2;

export const SERVERS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'src', 'servers');
