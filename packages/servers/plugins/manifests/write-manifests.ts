import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { INDEX_FILE_NAME } from './const';
import type { CompiledManifest } from './types/compiled-manifest';

const toManifestPath = ({ manifest }: CompiledManifest) => `${manifest.category}/${manifest.name}.json`;

const toIndexEntry = (entry: CompiledManifest, registryUrl: string | undefined) => {
  const path = toManifestPath(entry);
  return {
    id: `${entry.manifest.category}:${entry.manifest.name}`,
    version: entry.manifest.version,
    description: entry.manifest.description,
    tools: entry.manifest.tools.map((tool) => tool.name),
    url: registryUrl ? `${registryUrl.replace(/\/+$/, '')}/${path}` : path,
    sha256: createHash('sha256').update(entry.json).digest('hex'),
  };
};

/** Writes `<category>/<name>.json` per manifest plus the index.json the CLI syncs; tools are listed by name only. */
export const writeManifests = async (compiled: readonly CompiledManifest[], outDir: string, registryUrl?: string) => {
  await Promise.all(
    compiled.map(async (entry) => {
      const file = join(outDir, toManifestPath(entry));
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, entry.json);
    }),
  );
  await mkdir(outDir, { recursive: true });
  const index = { servers: compiled.map((entry) => toIndexEntry(entry, registryUrl)) };
  await writeFile(join(outDir, INDEX_FILE_NAME), `${JSON.stringify(index, null, 2)}\n`);
};
