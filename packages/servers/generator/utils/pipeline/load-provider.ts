import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PROVIDERS_DIR } from './const';

export const loadProvider = async (name: string) => {
  const module: { generate: (localPaths: readonly string[]) => Promise<void> } = await import(
    pathToFileURL(join(PROVIDERS_DIR, name, 'generate')).href
  );
  return module.generate;
};
