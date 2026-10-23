import { securitySoftwareCompositionAnalysisCreateJobsSbomScans } from "./create-jobs-sbom-scans";
import { securitySoftwareCompositionAnalysisCreateJobsSbomScansAuthorize } from "./create-jobs-sbom-scans-authorize";
import { securitySoftwareCompositionAnalysisCreateJobsSbomScansPost } from "./create-jobs-sbom-scans-post";

export const securitySoftwareCompositionAnalysisTools = [
  securitySoftwareCompositionAnalysisCreateJobsSbomScans,
  securitySoftwareCompositionAnalysisCreateJobsSbomScansAuthorize,
  securitySoftwareCompositionAnalysisCreateJobsSbomScansPost,
];
