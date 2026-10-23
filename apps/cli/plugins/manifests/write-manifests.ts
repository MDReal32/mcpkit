import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { INDEX_FILE_NAME } from './const';
import type { CompiledManifest } from './types/compiled-manifest';

/** Writes `<name>.json` per manifest plus the index.json that `mcpkit update` reads. */
export const writeManifests = async (compiled: readonly CompiledManifest[], outDir: string) => {
  await mkdir(outDir, { recursive: true });
  await Promise.all(compiled.map(({ manifest, json }) => writeFile(join(outDir, `${manifest.name}.json`), json)));
  const index = { manifests: compiled.map(({ manifest }) => `${manifest.name}.json`) };
  await writeFile(join(outDir, INDEX_FILE_NAME), `${JSON.stringify(index, null, 2)}\n`);
};
