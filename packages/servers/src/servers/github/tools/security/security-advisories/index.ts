import { securitySecurityAdvisoriesCreateFork } from "./create-fork";
import { securitySecurityAdvisoriesCreatePrivateVulnerabilityReport } from "./create-private-vulnerability-report";
import { securitySecurityAdvisoriesCreateRepositoryAdvisory } from "./create-repository-advisory";
import { securitySecurityAdvisoriesCreateRepositoryAdvisoryCveRequest } from "./create-repository-advisory-cve-request";
import { securitySecurityAdvisoriesGetGlobalAdvisory } from "./get-global-advisory";
import { securitySecurityAdvisoriesGetRepositoryAdvisory } from "./get-repository-advisory";
import { securitySecurityAdvisoriesListGlobalAdvisories } from "./list-global-advisories";
import { securitySecurityAdvisoriesListOrgRepositoryAdvisories } from "./list-org-repository-advisories";
import { securitySecurityAdvisoriesListRepositoryAdvisories } from "./list-repository-advisories";
import { securitySecurityAdvisoriesUpdateRepositoryAdvisory } from "./update-repository-advisory";

export const securitySecurityAdvisoriesTools = [
  securitySecurityAdvisoriesCreateFork,
  securitySecurityAdvisoriesCreatePrivateVulnerabilityReport,
  securitySecurityAdvisoriesCreateRepositoryAdvisory,
  securitySecurityAdvisoriesCreateRepositoryAdvisoryCveRequest,
  securitySecurityAdvisoriesGetGlobalAdvisory,
  securitySecurityAdvisoriesGetRepositoryAdvisory,
  securitySecurityAdvisoriesListGlobalAdvisories,
  securitySecurityAdvisoriesListOrgRepositoryAdvisories,
  securitySecurityAdvisoriesListRepositoryAdvisories,
  securitySecurityAdvisoriesUpdateRepositoryAdvisory,
];
