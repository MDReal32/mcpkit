import { readFile } from 'node:fs/promises';
import { dereference } from './dereference.ts';
import type { OpenApiDocument } from './types/open-api-operation.ts';
import type { SpecSource } from './types/spec-source.ts';

const loadText = async (source: SpecSource, localPath: string | undefined) => {
  if (localPath) {
    return readFile(localPath, 'utf8');
  }
  const response = await fetch(source.url);
  if (!response.ok) {
    throw new Error(`GET ${source.url} failed: ${response.status}`);
  }
  return response.text();
};

export const readSpec = async (source: SpecSource, localPath: string | undefined) => {
  const document: unknown = JSON.parse(await loadText(source, localPath));
  return dereference(document) as OpenApiDocument;
};
