import { securityAccessTokensTools } from './access-tokens';
import { securityCompliancePolicySettingsTools } from './compliance-policy-settings';
import { securityDependencyManagementTools } from './dependency-management';
import { securityGroupCredentialsInventoryTools } from './group-credentials-inventory';
import { securityLicensesTools } from './licenses';
import { securitySecurityScansTools } from './security-scans';
import { securitySoftwareCompositionAnalysisTools } from './software-composition-analysis';
import { securityVulnerabilitiesTools } from './vulnerabilities';

export const securityGroupTools = [
  ...securityAccessTokensTools,
  ...securityCompliancePolicySettingsTools,
  ...securityDependencyManagementTools,
  ...securityGroupCredentialsInventoryTools,
  ...securityLicensesTools,
  ...securitySecurityScansTools,
  ...securitySoftwareCompositionAnalysisTools,
  ...securityVulnerabilitiesTools,
];
