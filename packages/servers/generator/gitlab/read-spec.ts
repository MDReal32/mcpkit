import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { SPEC_URL } from './const.ts';
import { createDereferencer } from './dereference.ts';
import type { OpenApiDocument } from './types/open-api-operation.ts';

interface RawDocument {
  paths: unknown;
  components?: { schemas?: Record<string, unknown> };
}

const readSource = async (localPath: string | undefined) => {
  if (localPath) {
    return readFile(localPath, 'utf8');
  }
  const response = await fetch(SPEC_URL);
  if (!response.ok) {
    throw new Error(`GET ${SPEC_URL} failed: ${response.status}`);
  }
  return response.text();
};

export const readSpec = async (localPath: string | undefined) => {
  const source = await readSource(localPath);
  const raw = (localPath?.endsWith('.json') ? JSON.parse(source) : parse(source)) as RawDocument;
  const dereference = createDereferencer(raw.components?.schemas ?? {});
  return { paths: dereference(raw.paths) } as OpenApiDocument;
};
