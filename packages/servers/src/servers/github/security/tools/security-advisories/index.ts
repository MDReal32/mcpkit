import { securityAdvisoriesCreateFork } from './create-fork';
import { securityAdvisoriesCreatePrivateVulnerabilityReport } from './create-private-vulnerability-report';
import { securityAdvisoriesCreateRepositoryAdvisory } from './create-repository-advisory';
import { securityAdvisoriesCreateRepositoryAdvisoryCveRequest } from './create-repository-advisory-cve-request';
import { securityAdvisoriesGetGlobalAdvisory } from './get-global-advisory';
import { securityAdvisoriesGetRepositoryAdvisory } from './get-repository-advisory';
import { securityAdvisoriesListGlobalAdvisories } from './list-global-advisories';
import { securityAdvisoriesListOrgRepositoryAdvisories } from './list-org-repository-advisories';
import { securityAdvisoriesListRepositoryAdvisories } from './list-repository-advisories';
import { securityAdvisoriesUpdateRepositoryAdvisory } from './update-repository-advisory';

export const securityAdvisoriesTools = [
  securityAdvisoriesCreateFork,
  securityAdvisoriesCreatePrivateVulnerabilityReport,
  securityAdvisoriesCreateRepositoryAdvisory,
  securityAdvisoriesCreateRepositoryAdvisoryCveRequest,
  securityAdvisoriesGetGlobalAdvisory,
  securityAdvisoriesGetRepositoryAdvisory,
  securityAdvisoriesListGlobalAdvisories,
  securityAdvisoriesListOrgRepositoryAdvisories,
  securityAdvisoriesListRepositoryAdvisories,
  securityAdvisoriesUpdateRepositoryAdvisory,
];
