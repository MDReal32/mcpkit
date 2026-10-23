import { readFile } from 'node:fs/promises';
import { SPEC_URL } from './const.ts';
import type { OpenApiDocument } from './types/open-api-operation.ts';

export const readSpec = async (localPath: string | undefined) => {
  if (localPath) {
    return JSON.parse(await readFile(localPath, 'utf8')) as OpenApiDocument;
  }
  const response = await fetch(SPEC_URL);
  if (!response.ok) {
    throw new Error(`GET ${SPEC_URL} failed: ${response.status}`);
  }
  return (await response.json()) as OpenApiDocument;
};
