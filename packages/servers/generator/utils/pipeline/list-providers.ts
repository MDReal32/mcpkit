import { readdir } from 'node:fs/promises';
import { PROVIDERS_DIR } from './const';

export const listProviders = async () => {
  const entries = await readdir(PROVIDERS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
};
