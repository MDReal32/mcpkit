import { readFile } from 'node:fs/promises';
import { describeError } from '@usemcpkit/core';
import type { ManifestCandidate } from '../types/manifest-candidate';

export const readManifestCandidate = async (file: string) => {
  const text = await readFile(file, 'utf8');
  try {
    const candidate: ManifestCandidate = { source: file, data: JSON.parse(text) };
    return candidate;
  } catch (error) {
    const candidate: ManifestCandidate = { source: file, parseError: `invalid JSON: ${describeError(error)}` };
    return candidate;
  }
};
