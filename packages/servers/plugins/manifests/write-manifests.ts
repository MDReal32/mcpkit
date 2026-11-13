import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { INDEX_FILE_NAME } from "./const";
import { splitManifest } from "./split-manifest";
import { toRegistryJson } from "./to-registry-json";
import type { CompiledManifest } from "./types/compiled-manifest";
import type { SplitManifest } from "./types/split-manifest";

const toManifestPath = ({ manifest }: CompiledManifest) => `${manifest.category}/${manifest.name}.json`;

const toIndexEntry = (entry: CompiledManifest, shellJson: string) => ({
  id: `${entry.manifest.category}:${entry.manifest.name}`,
  version: entry.manifest.version,
  description: entry.manifest.description,
  ...(entry.manifest.upstream ? { upstream: true } : {}),
  ...(entry.manifest.openapi ? { openapi: true } : {}),
  url: toManifestPath(entry),
  sha256: createHash("sha256").update(shellJson).digest("hex"),
});

const writeText = async (file: string, text: string) => {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, text);
};

const writeEntry = async (entry: CompiledManifest, outDir: string, split: SplitManifest | undefined) => {
  await writeText(join(outDir, toManifestPath(entry)), split?.shellJson ?? entry.json);
  const files = [...(split?.files ?? []), ...entry.specs];
  await Promise.all(files.map((part) => writeText(join(outDir, part.path), part.json)));
};

/**
 * Writes `<category>/<name>.json` per manifest plus the index.json the CLI syncs; the index lists servers only, their parts and tools live in their own files.
 * Every link is relative to the registry folder, so the same files serve the root and each `v<version>/` copy.
 * A server with grouped tool names is written as a shell plus one file per group (see splitManifest), and a server's
 * hand-written OpenAPI documents next to it (see publishLocalSpecs).
 */
export const writeManifests = async (compiled: readonly CompiledManifest[], outDir: string) => {
  const splits = compiled.map((entry) => splitManifest(entry.manifest));
  await Promise.all(compiled.map((entry, position) => writeEntry(entry, outDir, splits[position])));
  const servers = compiled.map((entry, position) => toIndexEntry(entry, splits[position]?.shellJson ?? entry.json));
  await writeText(join(outDir, INDEX_FILE_NAME), toRegistryJson({ servers }));
};
