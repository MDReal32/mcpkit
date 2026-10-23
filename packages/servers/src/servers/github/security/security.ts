import { defineGithubServer } from '../../../providers/github';

import { codeScanningCommitAutofix } from './tools/code-scanning/commit-autofix';
import { codeScanningCreateAutofix } from './tools/code-scanning/create-autofix';
import { codeScanningCreateVariantAnalysis } from './tools/code-scanning/create-variant-analysis';
import { codeScanningDeleteAnalysis } from './tools/code-scanning/delete-analysis';
import { codeScanningDeleteCodeqlDatabase } from './tools/code-scanning/delete-codeql-database';
import { codeScanningGetAiScanEnablement } from './tools/code-scanning/get-ai-scan-enablement';
import { codeScanningGetAiScanEnablementForOrg } from './tools/code-scanning/get-ai-scan-enablement-for-org';
import { codeScanningGetAlert } from './tools/code-scanning/get-alert';
import { codeScanningGetAnalysis } from './tools/code-scanning/get-analysis';
import { codeScanningGetAutofix } from './tools/code-scanning/get-autofix';
import { codeScanningGetCodeqlDatabase } from './tools/code-scanning/get-codeql-database';
import { codeScanningGetDefaultSetup } from './tools/code-scanning/get-default-setup';
import { codeScanningGetSarif } from './tools/code-scanning/get-sarif';
import { codeScanningGetVariantAnalysis } from './tools/code-scanning/get-variant-analysis';
import { codeScanningGetVariantAnalysisRepoTask } from './tools/code-scanning/get-variant-analysis-repo-task';
import { codeScanningListAlertInstances } from './tools/code-scanning/list-alert-instances';
import { codeScanningListAlertsForOrg } from './tools/code-scanning/list-alerts-for-org';
import { codeScanningListAlertsForRepo } from './tools/code-scanning/list-alerts-for-repo';
import { codeScanningListCodeqlDatabases } from './tools/code-scanning/list-codeql-databases';
import { codeScanningListRecentAnalyses } from './tools/code-scanning/list-recent-analyses';
import { codeScanningUpdateAiScanEnablement } from './tools/code-scanning/update-ai-scan-enablement';
import { codeScanningUpdateAiScanEnablementForOrg } from './tools/code-scanning/update-ai-scan-enablement-for-org';
import { codeScanningUpdateAlert } from './tools/code-scanning/update-alert';
import { codeScanningUpdateDefaultSetup } from './tools/code-scanning/update-default-setup';
import { codeScanningUploadSarif } from './tools/code-scanning/upload-sarif';
import { codeSecurityAttachConfiguration } from './tools/code-security/attach-configuration';
import { codeSecurityAttachEnterpriseConfiguration } from './tools/code-security/attach-enterprise-configuration';
import { codeSecurityCreateConfiguration } from './tools/code-security/create-configuration';
import { codeSecurityCreateConfigurationForEnterprise } from './tools/code-security/create-configuration-for-enterprise';
import { codeSecurityDeleteConfiguration } from './tools/code-security/delete-configuration';
import { codeSecurityDeleteConfigurationForEnterprise } from './tools/code-security/delete-configuration-for-enterprise';
import { codeSecurityDetachConfiguration } from './tools/code-security/detach-configuration';
import { codeSecurityGetConfiguration } from './tools/code-security/get-configuration';
import { codeSecurityGetConfigurationForRepository } from './tools/code-security/get-configuration-for-repository';
import { codeSecurityGetConfigurationsForEnterprise } from './tools/code-security/get-configurations-for-enterprise';
import { codeSecurityGetConfigurationsForOrg } from './tools/code-security/get-configurations-for-org';
import { codeSecurityGetDefaultConfigurations } from './tools/code-security/get-default-configurations';
import { codeSecurityGetDefaultConfigurationsForEnterprise } from './tools/code-security/get-default-configurations-for-enterprise';
import { codeSecurityGetRepositoriesForConfiguration } from './tools/code-security/get-repositories-for-configuration';
import { codeSecurityGetRepositoriesForEnterpriseConfiguration } from './tools/code-security/get-repositories-for-enterprise-configuration';
import { codeSecurityGetSingleConfigurationForEnterprise } from './tools/code-security/get-single-configuration-for-enterprise';
import { codeSecuritySetConfigurationAsDefault } from './tools/code-security/set-configuration-as-default';
import { codeSecuritySetConfigurationAsDefaultForEnterprise } from './tools/code-security/set-configuration-as-default-for-enterprise';
import { codeSecurityUpdateConfiguration } from './tools/code-security/update-configuration';
import { codeSecurityUpdateEnterpriseConfiguration } from './tools/code-security/update-enterprise-configuration';
import { credentialsRevoke } from './tools/credentials/revoke';
import { dependabotAddSelectedRepoToOrgSecret } from './tools/dependabot/add-selected-repo-to-org-secret';
import { dependabotCreateOrUpdateOrgSecret } from './tools/dependabot/create-or-update-org-secret';
import { dependabotCreateOrUpdateRepoSecret } from './tools/dependabot/create-or-update-repo-secret';
import { dependabotDeleteOrgSecret } from './tools/dependabot/delete-org-secret';
import { dependabotDeleteRepoSecret } from './tools/dependabot/delete-repo-secret';
import { dependabotGetAlert } from './tools/dependabot/get-alert';
import { dependabotGetOrgPublicKey } from './tools/dependabot/get-org-public-key';
import { dependabotGetOrgSecret } from './tools/dependabot/get-org-secret';
import { dependabotGetRepoPublicKey } from './tools/dependabot/get-repo-public-key';
import { dependabotGetRepoSecret } from './tools/dependabot/get-repo-secret';
import { dependabotListAlertsForEnterprise } from './tools/dependabot/list-alerts-for-enterprise';
import { dependabotListAlertsForOrg } from './tools/dependabot/list-alerts-for-org';
import { dependabotListAlertsForRepo } from './tools/dependabot/list-alerts-for-repo';
import { dependabotListOrgSecrets } from './tools/dependabot/list-org-secrets';
import { dependabotListRepoSecrets } from './tools/dependabot/list-repo-secrets';
import { dependabotListSelectedReposForOrgSecret } from './tools/dependabot/list-selected-repos-for-org-secret';
import { dependabotRemoveSelectedRepoFromOrgSecret } from './tools/dependabot/remove-selected-repo-from-org-secret';
import { dependabotRepositoryAccessForEnterprise } from './tools/dependabot/repository-access-for-enterprise';
import { dependabotRepositoryAccessForOrg } from './tools/dependabot/repository-access-for-org';
import { dependabotSetRepositoryAccessDefaultLevel } from './tools/dependabot/set-repository-access-default-level';
import { dependabotSetRepositoryAccessDefaultLevelForEnterprise } from './tools/dependabot/set-repository-access-default-level-for-enterprise';
import { dependabotSetSelectedReposForOrgSecret } from './tools/dependabot/set-selected-repos-for-org-secret';
import { dependabotUpdateAlert } from './tools/dependabot/update-alert';
import { dependabotUpdateRepositoryAccessForEnterprise } from './tools/dependabot/update-repository-access-for-enterprise';
import { dependabotUpdateRepositoryAccessForOrg } from './tools/dependabot/update-repository-access-for-org';
import { dependencyGraphCreateRepositorySnapshot } from './tools/dependency-graph/create-repository-snapshot';
import { dependencyGraphDiffRange } from './tools/dependency-graph/diff-range';
import { dependencyGraphExportSbom } from './tools/dependency-graph/export-sbom';
import { dependencyGraphFetchSbomReport } from './tools/dependency-graph/fetch-sbom-report';
import { dependencyGraphGenerateSbomReport } from './tools/dependency-graph/generate-sbom-report';
import { privateRegistriesCreateOrgPrivateRegistry } from './tools/private-registries/create-org-private-registry';
import { privateRegistriesDeleteOrgPrivateRegistry } from './tools/private-registries/delete-org-private-registry';
import { privateRegistriesGetOrgPrivateRegistry } from './tools/private-registries/get-org-private-registry';
import { privateRegistriesGetOrgPublicKey } from './tools/private-registries/get-org-public-key';
import { privateRegistriesListOrgPrivateRegistries } from './tools/private-registries/list-org-private-registries';
import { privateRegistriesUpdateOrgPrivateRegistry } from './tools/private-registries/update-org-private-registry';
import { secretScanningBulkCreateOrgCustomPatterns } from './tools/secret-scanning/bulk-create-org-custom-patterns';
import { secretScanningBulkCreateRepoCustomPatterns } from './tools/secret-scanning/bulk-create-repo-custom-patterns';
import { secretScanningBulkDeleteOrgCustomPatterns } from './tools/secret-scanning/bulk-delete-org-custom-patterns';
import { secretScanningBulkDeleteRepoCustomPatterns } from './tools/secret-scanning/bulk-delete-repo-custom-patterns';
import { secretScanningCreatePushProtectionBypass } from './tools/secret-scanning/create-push-protection-bypass';
import { secretScanningGetAlert } from './tools/secret-scanning/get-alert';
import { secretScanningGetScanHistory } from './tools/secret-scanning/get-scan-history';
import { secretScanningListAlertsForOrg } from './tools/secret-scanning/list-alerts-for-org';
import { secretScanningListAlertsForRepo } from './tools/secret-scanning/list-alerts-for-repo';
import { secretScanningListLocationsForAlert } from './tools/secret-scanning/list-locations-for-alert';
import { secretScanningListOrgCustomPatterns } from './tools/secret-scanning/list-org-custom-patterns';
import { secretScanningListOrgPatternConfigs } from './tools/secret-scanning/list-org-pattern-configs';
import { secretScanningListRepoCustomPatterns } from './tools/secret-scanning/list-repo-custom-patterns';
import { secretScanningUpdateAlert } from './tools/secret-scanning/update-alert';
import { secretScanningUpdateOrgCustomPattern } from './tools/secret-scanning/update-org-custom-pattern';
import { secretScanningUpdateOrgPatternConfigs } from './tools/secret-scanning/update-org-pattern-configs';
import { secretScanningUpdateRepoCustomPattern } from './tools/secret-scanning/update-repo-custom-pattern';
import { securityAdvisoriesCreateFork } from './tools/security-advisories/create-fork';
import { securityAdvisoriesCreatePrivateVulnerabilityReport } from './tools/security-advisories/create-private-vulnerability-report';
import { securityAdvisoriesCreateRepositoryAdvisory } from './tools/security-advisories/create-repository-advisory';
import { securityAdvisoriesCreateRepositoryAdvisoryCveRequest } from './tools/security-advisories/create-repository-advisory-cve-request';
import { securityAdvisoriesGetGlobalAdvisory } from './tools/security-advisories/get-global-advisory';
import { securityAdvisoriesGetRepositoryAdvisory } from './tools/security-advisories/get-repository-advisory';
import { securityAdvisoriesListGlobalAdvisories } from './tools/security-advisories/list-global-advisories';
import { securityAdvisoriesListOrgRepositoryAdvisories } from './tools/security-advisories/list-org-repository-advisories';
import { securityAdvisoriesListRepositoryAdvisories } from './tools/security-advisories/list-repository-advisories';
import { securityAdvisoriesUpdateRepositoryAdvisory } from './tools/security-advisories/update-repository-advisory';

export const githubSecurity = defineGithubServer({
  name: 'github_security',
  description: 'GitHub REST API: code scanning, secret scanning, Dependabot, dependency graph, security advisories.',
  tools: [
    codeScanningCommitAutofix,
    codeScanningCreateAutofix,
    codeScanningCreateVariantAnalysis,
    codeScanningDeleteAnalysis,
    codeScanningDeleteCodeqlDatabase,
    codeScanningGetAiScanEnablement,
    codeScanningGetAiScanEnablementForOrg,
    codeScanningGetAlert,
    codeScanningGetAnalysis,
    codeScanningGetAutofix,
    codeScanningGetCodeqlDatabase,
    codeScanningGetDefaultSetup,
    codeScanningGetSarif,
    codeScanningGetVariantAnalysis,
    codeScanningGetVariantAnalysisRepoTask,
    codeScanningListAlertInstances,
    codeScanningListAlertsForOrg,
    codeScanningListAlertsForRepo,
    codeScanningListCodeqlDatabases,
    codeScanningListRecentAnalyses,
    codeScanningUpdateAiScanEnablement,
    codeScanningUpdateAiScanEnablementForOrg,
    codeScanningUpdateAlert,
    codeScanningUpdateDefaultSetup,
    codeScanningUploadSarif,
    codeSecurityAttachConfiguration,
    codeSecurityAttachEnterpriseConfiguration,
    codeSecurityCreateConfiguration,
    codeSecurityCreateConfigurationForEnterprise,
    codeSecurityDeleteConfiguration,
    codeSecurityDeleteConfigurationForEnterprise,
    codeSecurityDetachConfiguration,
    codeSecurityGetConfiguration,
    codeSecurityGetConfigurationForRepository,
    codeSecurityGetConfigurationsForEnterprise,
    codeSecurityGetConfigurationsForOrg,
    codeSecurityGetDefaultConfigurations,
    codeSecurityGetDefaultConfigurationsForEnterprise,
    codeSecurityGetRepositoriesForConfiguration,
    codeSecurityGetRepositoriesForEnterpriseConfiguration,
    codeSecurityGetSingleConfigurationForEnterprise,
    codeSecuritySetConfigurationAsDefault,
    codeSecuritySetConfigurationAsDefaultForEnterprise,
    codeSecurityUpdateConfiguration,
    codeSecurityUpdateEnterpriseConfiguration,
    credentialsRevoke,
    dependabotAddSelectedRepoToOrgSecret,
    dependabotCreateOrUpdateOrgSecret,
    dependabotCreateOrUpdateRepoSecret,
    dependabotDeleteOrgSecret,
    dependabotDeleteRepoSecret,
    dependabotGetAlert,
    dependabotGetOrgPublicKey,
    dependabotGetOrgSecret,
    dependabotGetRepoPublicKey,
    dependabotGetRepoSecret,
    dependabotListAlertsForEnterprise,
    dependabotListAlertsForOrg,
    dependabotListAlertsForRepo,
    dependabotListOrgSecrets,
    dependabotListRepoSecrets,
    dependabotListSelectedReposForOrgSecret,
    dependabotRemoveSelectedRepoFromOrgSecret,
    dependabotRepositoryAccessForEnterprise,
    dependabotRepositoryAccessForOrg,
    dependabotSetRepositoryAccessDefaultLevel,
    dependabotSetRepositoryAccessDefaultLevelForEnterprise,
    dependabotSetSelectedReposForOrgSecret,
    dependabotUpdateAlert,
    dependabotUpdateRepositoryAccessForEnterprise,
    dependabotUpdateRepositoryAccessForOrg,
    dependencyGraphCreateRepositorySnapshot,
    dependencyGraphDiffRange,
    dependencyGraphExportSbom,
    dependencyGraphFetchSbomReport,
    dependencyGraphGenerateSbomReport,
    privateRegistriesCreateOrgPrivateRegistry,
    privateRegistriesDeleteOrgPrivateRegistry,
    privateRegistriesGetOrgPrivateRegistry,
    privateRegistriesGetOrgPublicKey,
    privateRegistriesListOrgPrivateRegistries,
    privateRegistriesUpdateOrgPrivateRegistry,
    secretScanningBulkCreateOrgCustomPatterns,
    secretScanningBulkCreateRepoCustomPatterns,
    secretScanningBulkDeleteOrgCustomPatterns,
    secretScanningBulkDeleteRepoCustomPatterns,
    secretScanningCreatePushProtectionBypass,
    secretScanningGetAlert,
    secretScanningGetScanHistory,
    secretScanningListAlertsForOrg,
    secretScanningListAlertsForRepo,
    secretScanningListLocationsForAlert,
    secretScanningListOrgCustomPatterns,
    secretScanningListOrgPatternConfigs,
    secretScanningListRepoCustomPatterns,
    secretScanningUpdateAlert,
    secretScanningUpdateOrgCustomPattern,
    secretScanningUpdateOrgPatternConfigs,
    secretScanningUpdateRepoCustomPattern,
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
  ],
});
