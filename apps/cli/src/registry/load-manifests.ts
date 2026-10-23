import { readUserManifests } from './local/read-user-manifests';
import { resolveUserDir } from './local/resolve-user-dir';
import { mergeManifests } from './merge-manifests';

export const loadManifests = async (userDir: string = resolveUserDir()) =>
  mergeManifests(await readUserManifests(userDir));
