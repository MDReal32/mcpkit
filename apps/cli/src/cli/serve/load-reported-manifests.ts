import { loadManifests } from '../../registry';
import { printError } from '../output/print-error';

export const loadReportedManifests = async () => {
  const { manifests, warnings } = await loadManifests();
  warnings.forEach(printError);
  return manifests;
};
