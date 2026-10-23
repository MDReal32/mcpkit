import { listJsonFiles } from './list-json-files';
import { readManifestCandidate } from './read-manifest-candidate';

export const readUserManifests = async (dir: string) =>
  Promise.all((await listJsonFiles(dir)).map(readManifestCandidate));
