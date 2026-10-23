import { loadManifests } from '../../registry';
import { printError } from '../output/print-error';
import { autoSyncManifests } from './auto-sync-manifests';

export const loadReportedManifests = async () => {
  await autoSyncManifests();
  const { manifests, warnings } = await loadManifests();
  warnings.forEach(printError);
  if (manifests.size === 0) {
    printError('mcpkit: no manifests found; run `mcpkit update` to download them');
  }
  return manifests;
};
