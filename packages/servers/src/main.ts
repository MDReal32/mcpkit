import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SERVERS_DIR = dirname(fileURLToPath(import.meta.url));
