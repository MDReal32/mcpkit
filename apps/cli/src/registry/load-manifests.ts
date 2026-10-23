import { manifests as bundledManifests } from 'virtual:mcpkit/manifests';
import { readUserManifests } from './local/read-user-manifests';
import { resolveUserDir } from './local/resolve-user-dir';
import { mergeManifests } from './merge-manifests';
import type { ManifestCandidate } from './types/manifest-candidate';

export const loadManifests = async (userDir: string = resolveUserDir()) => {
  const bundled = bundledManifests.map((manifest) => {
    const candidate: ManifestCandidate = { source: `bundled:${manifest.name}`, data: manifest };
    return candidate;
  });
  return mergeManifests([...bundled, ...(await readUserManifests(userDir))]);
};
