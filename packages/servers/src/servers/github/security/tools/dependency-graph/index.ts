import { dependencyGraphCreateRepositorySnapshot } from './create-repository-snapshot';
import { dependencyGraphDiffRange } from './diff-range';
import { dependencyGraphExportSbom } from './export-sbom';
import { dependencyGraphFetchSbomReport } from './fetch-sbom-report';
import { dependencyGraphGenerateSbomReport } from './generate-sbom-report';

export const dependencyGraphTools = [
  dependencyGraphCreateRepositorySnapshot,
  dependencyGraphDiffRange,
  dependencyGraphExportSbom,
  dependencyGraphFetchSbomReport,
  dependencyGraphGenerateSbomReport,
];
