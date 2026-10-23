import { securityDependencyGraphCreateRepositorySnapshot } from './create-repository-snapshot';
import { securityDependencyGraphDiffRange } from './diff-range';
import { securityDependencyGraphExportSbom } from './export-sbom';
import { securityDependencyGraphFetchSbomReport } from './fetch-sbom-report';
import { securityDependencyGraphGenerateSbomReport } from './generate-sbom-report';

export const securityDependencyGraphTools = [
  securityDependencyGraphCreateRepositorySnapshot,
  securityDependencyGraphDiffRange,
  securityDependencyGraphExportSbom,
  securityDependencyGraphFetchSbomReport,
  securityDependencyGraphGenerateSbomReport,
];
