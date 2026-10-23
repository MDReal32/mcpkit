import { securityVulnerabilitiesCreateProjectsVulnerabilities } from "./create-projects-vulnerabilities";
import { securityVulnerabilitiesCreateSecurityGroupsVulnerabilityExports } from "./create-security-groups-vulnerability-exports";
import { securityVulnerabilitiesCreateSecurityProjectsVulnerabilityArchiveExports } from "./create-security-projects-vulnerability-archive-exports";
import { securityVulnerabilitiesCreateSecurityProjectsVulnerabilityExports } from "./create-security-projects-vulnerability-exports";
import { securityVulnerabilitiesCreateSecurityVulnerabilityExports } from "./create-security-vulnerability-exports";
import { securityVulnerabilitiesCreateVulnerabilitiesConfirm } from "./create-vulnerabilities-confirm";
import { securityVulnerabilitiesCreateVulnerabilitiesDismiss } from "./create-vulnerabilities-dismiss";
import { securityVulnerabilitiesCreateVulnerabilitiesFlagsAiDetection } from "./create-vulnerabilities-flags-ai-detection";
import { securityVulnerabilitiesCreateVulnerabilitiesIssueLinks } from "./create-vulnerabilities-issue-links";
import { securityVulnerabilitiesCreateVulnerabilitiesResolve } from "./create-vulnerabilities-resolve";
import { securityVulnerabilitiesCreateVulnerabilitiesRevert } from "./create-vulnerabilities-revert";
import { securityVulnerabilitiesDeleteVulnerabilitiesIssueLinks } from "./delete-vulnerabilities-issue-links";
import { securityVulnerabilitiesGetSecurityVulnerabilityArchiveExports } from "./get-security-vulnerability-archive-exports";
import { securityVulnerabilitiesGetSecurityVulnerabilityArchiveExportsDownload } from "./get-security-vulnerability-archive-exports-download";
import { securityVulnerabilitiesGetSecurityVulnerabilityExports } from "./get-security-vulnerability-exports";
import { securityVulnerabilitiesGetSecurityVulnerabilityExportsDownload } from "./get-security-vulnerability-exports-download";
import { securityVulnerabilitiesGetVulnerabilities } from "./get-vulnerabilities";
import { securityVulnerabilitiesListProjectsVulnerabilities } from "./list-projects-vulnerabilities";
import { securityVulnerabilitiesListProjectsVulnerabilityFindings } from "./list-projects-vulnerability-findings";
import { securityVulnerabilitiesListVulnerabilitiesIssueLinks } from "./list-vulnerabilities-issue-links";

export const securityVulnerabilitiesTools = [
  securityVulnerabilitiesCreateProjectsVulnerabilities,
  securityVulnerabilitiesCreateSecurityGroupsVulnerabilityExports,
  securityVulnerabilitiesCreateSecurityProjectsVulnerabilityArchiveExports,
  securityVulnerabilitiesCreateSecurityProjectsVulnerabilityExports,
  securityVulnerabilitiesCreateSecurityVulnerabilityExports,
  securityVulnerabilitiesCreateVulnerabilitiesConfirm,
  securityVulnerabilitiesCreateVulnerabilitiesDismiss,
  securityVulnerabilitiesCreateVulnerabilitiesFlagsAiDetection,
  securityVulnerabilitiesCreateVulnerabilitiesIssueLinks,
  securityVulnerabilitiesCreateVulnerabilitiesResolve,
  securityVulnerabilitiesCreateVulnerabilitiesRevert,
  securityVulnerabilitiesDeleteVulnerabilitiesIssueLinks,
  securityVulnerabilitiesGetSecurityVulnerabilityArchiveExports,
  securityVulnerabilitiesGetSecurityVulnerabilityArchiveExportsDownload,
  securityVulnerabilitiesGetSecurityVulnerabilityExports,
  securityVulnerabilitiesGetSecurityVulnerabilityExportsDownload,
  securityVulnerabilitiesGetVulnerabilities,
  securityVulnerabilitiesListProjectsVulnerabilities,
  securityVulnerabilitiesListProjectsVulnerabilityFindings,
  securityVulnerabilitiesListVulnerabilitiesIssueLinks,
];
