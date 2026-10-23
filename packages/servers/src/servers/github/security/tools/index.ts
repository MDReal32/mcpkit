import { codeScanningTools } from './code-scanning';
import { codeSecurityTools } from './code-security';
import { credentialsTools } from './credentials';
import { dependabotTools } from './dependabot';
import { dependencyGraphTools } from './dependency-graph';
import { privateRegistriesTools } from './private-registries';
import { secretScanningTools } from './secret-scanning';
import { securityAdvisoriesTools } from './security-advisories';

export const githubSecurityTools = [
  ...codeScanningTools,
  ...codeSecurityTools,
  ...credentialsTools,
  ...dependabotTools,
  ...dependencyGraphTools,
  ...privateRegistriesTools,
  ...secretScanningTools,
  ...securityAdvisoriesTools,
];
