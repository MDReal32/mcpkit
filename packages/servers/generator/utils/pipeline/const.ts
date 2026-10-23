import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SERVERS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'src', 'servers');

export const PROVIDERS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'providers');

export const ALL_PROVIDERS = 'all';
