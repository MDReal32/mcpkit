import { readFile } from 'node:fs/promises';
import type { OpenApiDocument } from './types/open-api-operation.ts';
import type { SpecSource } from './types/spec-source.ts';

export const readSpec = async (source: SpecSource, localPath: string | undefined) => {
  if (localPath) {
    return JSON.parse(await readFile(localPath, 'utf8')) as OpenApiDocument;
  }
  const response = await fetch(source.url);
  if (!response.ok) {
    throw new Error(`GET ${source.url} failed: ${response.status}`);
  }
  return (await response.json()) as OpenApiDocument;
};
