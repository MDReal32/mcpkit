import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { INDEX_FILE_NAME } from './const';
import { splitManifest } from './split-manifest';
import type { CompiledManifest } from './types/compiled-manifest';
import type { SplitManifest } from './types/split-manifest';

const toManifestPath = ({ manifest }: CompiledManifest) => `${manifest.category}/${manifest.name}.json`;

const toIndexEntry = (entry: CompiledManifest, shellJson: string, registryUrl: string | undefined) => {
  const path = toManifestPath(entry);
  return {
    id: `${entry.manifest.category}:${entry.manifest.name}`,
    version: entry.manifest.version,
    description: entry.manifest.description,
    tools: entry.manifest.tools.map((tool) => tool.name),
    url: registryUrl ? `${registryUrl.replace(/\/+$/, '')}/${path}` : path,
    sha256: createHash('sha256').update(shellJson).digest('hex'),
  };
};

const writeText = async (file: string, text: string) => {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, text);
};

const writeEntry = async (entry: CompiledManifest, outDir: string, split: SplitManifest | undefined) => {
  await writeText(join(outDir, toManifestPath(entry)), split?.shellJson ?? entry.json);
  await Promise.all((split?.files ?? []).map((part) => writeText(join(outDir, part.path), part.json)));
};

/**
 * Writes `<category>/<name>.json` per manifest plus the index.json the CLI syncs; tools are listed by name only.
 * A server with grouped tool names is written as a shell plus one file per group (see splitManifest).
 */
export const writeManifests = async (compiled: readonly CompiledManifest[], outDir: string, registryUrl?: string) => {
  const splits = compiled.map((entry) => splitManifest(entry.manifest));
  await Promise.all(compiled.map((entry, position) => writeEntry(entry, outDir, splits[position])));
  const servers = compiled.map((entry, position) =>
    toIndexEntry(entry, splits[position]?.shellJson ?? entry.json, registryUrl),
  );
  await writeText(join(outDir, INDEX_FILE_NAME), `${JSON.stringify({ servers }, null, 2)}\n`);
};
