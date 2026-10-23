import { isJsonObject } from '@mcpkit/core';
import type { RegistryIndex } from '../types/registry-index';

export const parseRegistryIndex = (body: unknown) => {
  const entries = isJsonObject(body) ? body.manifests : undefined;
  if (!Array.isArray(entries) || !entries.every((entry) => typeof entry === 'string')) {
    throw new Error('registry index.json must contain a "manifests" array of file names');
  }
  const index: RegistryIndex = { manifests: entries };
  return index;
};
