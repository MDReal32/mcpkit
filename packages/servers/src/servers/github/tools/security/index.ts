import { securityCodeScanningTools } from './code-scanning';
import { securityCodeSecurityTools } from './code-security';
import { securityCredentialsTools } from './credentials';
import { securityDependabotTools } from './dependabot';
import { securityDependencyGraphTools } from './dependency-graph';
import { securityPrivateRegistriesTools } from './private-registries';
import { securitySecretScanningTools } from './secret-scanning';
import { securitySecurityAdvisoriesTools } from './security-advisories';

export const securityGroupTools = [
  ...securityCodeScanningTools,
  ...securityCodeSecurityTools,
  ...securityCredentialsTools,
  ...securityDependabotTools,
  ...securityDependencyGraphTools,
  ...securityPrivateRegistriesTools,
  ...securitySecretScanningTools,
  ...securitySecurityAdvisoriesTools,
];
