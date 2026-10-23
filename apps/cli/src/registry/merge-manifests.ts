import type { Manifest } from '@usemcpkit/core';
import { compareVersions, isValidManifest, validateManifest } from '@usemcpkit/core';
import type { LoadResult } from './types/load-result';
import type { ManifestCandidate } from './types/manifest-candidate';

/** Later candidates replace earlier ones with the same name unless their version is lower. */
export const mergeManifests = (candidates: readonly ManifestCandidate[]) => {
  const manifests = new Map<string, Manifest>();
  const warnings: string[] = [];
  for (const { source, data, parseError } of candidates) {
    if (parseError !== undefined) {
      warnings.push(`skipping ${source}: ${parseError}`);
      continue;
    }
    if (!isValidManifest(data)) {
      warnings.push(`skipping ${source}: ${validateManifest(data).join('; ')}`);
      continue;
    }
    const current = manifests.get(data.name);
    if (current && compareVersions(data.version, current.version) < 0) {
      continue;
    }
    manifests.set(data.name, data);
  }
  const result: LoadResult = { manifests, warnings };
  return result;
};
