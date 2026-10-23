import { defineGithubServer } from '../../providers/github';

import { actionsAddCustomLabelsToSelfHostedRunnerForOrg } from './tools/actions/add-custom-labels-to-self-hosted-runner-for-org';
import { actionsAddCustomLabelsToSelfHostedRunnerForRepo } from './tools/actions/add-custom-labels-to-self-hosted-runner-for-repo';
import { actionsAddRepoAccessToSelfHostedRunnerGroupInOrg } from './tools/actions/add-repo-access-to-self-hosted-runner-group-in-org';
import { actionsAddSelectedRepoToOrgSecret } from './tools/actions/add-selected-repo-to-org-secret';
import { actionsAddSelectedRepoToOrgVariable } from './tools/actions/add-selected-repo-to-org-variable';
import { actionsAddSelfHostedRunnerToGroupForOrg } from './tools/actions/add-self-hosted-runner-to-group-for-org';
import { actionsApproveWorkflowRun } from './tools/actions/approve-workflow-run';
import { actionsCancelWorkflowRun } from './tools/actions/cancel-workflow-run';
import { actionsCreateEnvironmentVariable } from './tools/actions/create-environment-variable';
import { actionsCreateHostedRunnerForOrg } from './tools/actions/create-hosted-runner-for-org';
import { actionsCreateOrUpdateEnvironmentSecret } from './tools/actions/create-or-update-environment-secret';
import { actionsCreateOrUpdateOrgSecret } from './tools/actions/create-or-update-org-secret';
import { actionsCreateOrUpdateRepoSecret } from './tools/actions/create-or-update-repo-secret';
import { actionsCreateOrgActionsPolicy } from './tools/actions/create-org-actions-policy';
import { actionsCreateOrgVariable } from './tools/actions/create-org-variable';
import { actionsCreateRegistrationTokenForOrg } from './tools/actions/create-registration-token-for-org';
import { actionsCreateRegistrationTokenForRepo } from './tools/actions/create-registration-token-for-repo';
import { actionsCreateRemoveTokenForOrg } from './tools/actions/create-remove-token-for-org';
import { actionsCreateRemoveTokenForRepo } from './tools/actions/create-remove-token-for-repo';
import { actionsCreateRepoActionsPolicy } from './tools/actions/create-repo-actions-policy';
import { actionsCreateRepoVariable } from './tools/actions/create-repo-variable';
import { actionsCreateSelfHostedRunnerGroupForOrg } from './tools/actions/create-self-hosted-runner-group-for-org';
import { actionsCreateWorkflowDispatch } from './tools/actions/create-workflow-dispatch';
import { actionsDeleteActionsCacheById } from './tools/actions/delete-actions-cache-by-id';
import { actionsDeleteActionsCacheByKey } from './tools/actions/delete-actions-cache-by-key';
import { actionsDeleteArtifact } from './tools/actions/delete-artifact';
import { actionsDeleteCustomImageFromOrg } from './tools/actions/delete-custom-image-from-org';
import { actionsDeleteCustomImageVersionFromOrg } from './tools/actions/delete-custom-image-version-from-org';
import { actionsDeleteEnvironmentSecret } from './tools/actions/delete-environment-secret';
import { actionsDeleteEnvironmentVariable } from './tools/actions/delete-environment-variable';
import { actionsDeleteHostedRunnerForOrg } from './tools/actions/delete-hosted-runner-for-org';
import { actionsDeleteOrgActionsPolicy } from './tools/actions/delete-org-actions-policy';
import { actionsDeleteOrgSecret } from './tools/actions/delete-org-secret';
import { actionsDeleteOrgVariable } from './tools/actions/delete-org-variable';
import { actionsDeleteRepoActionsPolicy } from './tools/actions/delete-repo-actions-policy';
import { actionsDeleteRepoSecret } from './tools/actions/delete-repo-secret';
import { actionsDeleteRepoVariable } from './tools/actions/delete-repo-variable';
import { actionsDeleteSelfHostedRunnerFromOrg } from './tools/actions/delete-self-hosted-runner-from-org';
import { actionsDeleteSelfHostedRunnerFromRepo } from './tools/actions/delete-self-hosted-runner-from-repo';
import { actionsDeleteSelfHostedRunnerGroupFromOrg } from './tools/actions/delete-self-hosted-runner-group-from-org';
import { actionsDeleteWorkflowRun } from './tools/actions/delete-workflow-run';
import { actionsDeleteWorkflowRunLogs } from './tools/actions/delete-workflow-run-logs';
import { actionsDisableSelectedRepositoryGithubActionsOrganization } from './tools/actions/disable-selected-repository-github-actions-organization';
import { actionsDisableSelectedRepositorySelfHostedRunnersOrganization } from './tools/actions/disable-selected-repository-self-hosted-runners-organization';
import { actionsDisableWorkflow } from './tools/actions/disable-workflow';
import { actionsDownloadArtifact } from './tools/actions/download-artifact';
import { actionsDownloadJobLogsForWorkflowRun } from './tools/actions/download-job-logs-for-workflow-run';
import { actionsDownloadStepLogsForWorkflowRunJob } from './tools/actions/download-step-logs-for-workflow-run-job';
import { actionsDownloadWorkflowRunAttemptLogs } from './tools/actions/download-workflow-run-attempt-logs';
import { actionsDownloadWorkflowRunLogs } from './tools/actions/download-workflow-run-logs';
import { actionsEnableSelectedRepositoryGithubActionsOrganization } from './tools/actions/enable-selected-repository-github-actions-organization';
import { actionsEnableSelectedRepositorySelfHostedRunnersOrganization } from './tools/actions/enable-selected-repository-self-hosted-runners-organization';
import { actionsEnableWorkflow } from './tools/actions/enable-workflow';
import { actionsForceCancelWorkflowRun } from './tools/actions/force-cancel-workflow-run';
import { actionsGenerateRunnerJitconfigForOrg } from './tools/actions/generate-runner-jitconfig-for-org';
import { actionsGenerateRunnerJitconfigForRepo } from './tools/actions/generate-runner-jitconfig-for-repo';
import { actionsGetActionsCacheList } from './tools/actions/get-actions-cache-list';
import { actionsGetActionsCacheRetentionLimitForEnterprise } from './tools/actions/get-actions-cache-retention-limit-for-enterprise';
import { actionsGetActionsCacheRetentionLimitForOrganization } from './tools/actions/get-actions-cache-retention-limit-for-organization';
import { actionsGetActionsCacheRetentionLimitForRepository } from './tools/actions/get-actions-cache-retention-limit-for-repository';
import { actionsGetActionsCacheStorageLimitForEnterprise } from './tools/actions/get-actions-cache-storage-limit-for-enterprise';
import { actionsGetActionsCacheStorageLimitForOrganization } from './tools/actions/get-actions-cache-storage-limit-for-organization';
import { actionsGetActionsCacheStorageLimitForRepository } from './tools/actions/get-actions-cache-storage-limit-for-repository';
import { actionsGetActionsCacheUsage } from './tools/actions/get-actions-cache-usage';
import { actionsGetActionsCacheUsageByRepoForOrg } from './tools/actions/get-actions-cache-usage-by-repo-for-org';
import { actionsGetActionsCacheUsageForOrg } from './tools/actions/get-actions-cache-usage-for-org';
import { actionsGetAllowedActionsOrganization } from './tools/actions/get-allowed-actions-organization';
import { actionsGetAllowedActionsRepository } from './tools/actions/get-allowed-actions-repository';
import { actionsGetArtifact } from './tools/actions/get-artifact';
import { actionsGetArtifactAndLogRetentionSettingsOrganization } from './tools/actions/get-artifact-and-log-retention-settings-organization';
import { actionsGetArtifactAndLogRetentionSettingsRepository } from './tools/actions/get-artifact-and-log-retention-settings-repository';
import { actionsGetConcurrencyGroupForRepository } from './tools/actions/get-concurrency-group-for-repository';
import { actionsGetCustomImageForOrg } from './tools/actions/get-custom-image-for-org';
import { actionsGetCustomImageVersionForOrg } from './tools/actions/get-custom-image-version-for-org';
import { actionsGetCustomOidcSubClaimForRepo } from './tools/actions/get-custom-oidc-sub-claim-for-repo';
import { actionsGetEnvironmentPublicKey } from './tools/actions/get-environment-public-key';
import { actionsGetEnvironmentSecret } from './tools/actions/get-environment-secret';
import { actionsGetEnvironmentVariable } from './tools/actions/get-environment-variable';
import { actionsGetForkPrContributorApprovalPermissionsOrganization } from './tools/actions/get-fork-pr-contributor-approval-permissions-organization';
import { actionsGetForkPrContributorApprovalPermissionsRepository } from './tools/actions/get-fork-pr-contributor-approval-permissions-repository';
import { actionsGetGithubActionsDefaultWorkflowPermissionsOrganization } from './tools/actions/get-github-actions-default-workflow-permissions-organization';
import { actionsGetGithubActionsDefaultWorkflowPermissionsRepository } from './tools/actions/get-github-actions-default-workflow-permissions-repository';
import { actionsGetGithubActionsPermissionsOrganization } from './tools/actions/get-github-actions-permissions-organization';
import { actionsGetGithubActionsPermissionsRepository } from './tools/actions/get-github-actions-permissions-repository';
import { actionsGetHostedRunnerForOrg } from './tools/actions/get-hosted-runner-for-org';
import { actionsGetHostedRunnersGithubOwnedImagesForOrg } from './tools/actions/get-hosted-runners-github-owned-images-for-org';
import { actionsGetHostedRunnersLimitsForOrg } from './tools/actions/get-hosted-runners-limits-for-org';
import { actionsGetHostedRunnersMachineSpecsForOrg } from './tools/actions/get-hosted-runners-machine-specs-for-org';
import { actionsGetHostedRunnersPartnerImagesForOrg } from './tools/actions/get-hosted-runners-partner-images-for-org';
import { actionsGetHostedRunnersPlatformsForOrg } from './tools/actions/get-hosted-runners-platforms-for-org';
import { actionsGetJobForWorkflowRun } from './tools/actions/get-job-for-workflow-run';
import { actionsGetOrgActionsPolicies } from './tools/actions/get-org-actions-policies';
import { actionsGetOrgActionsPolicy } from './tools/actions/get-org-actions-policy';
import { actionsGetOrgPublicKey } from './tools/actions/get-org-public-key';
import { actionsGetOrgSecret } from './tools/actions/get-org-secret';
import { actionsGetOrgVariable } from './tools/actions/get-org-variable';
import { actionsGetPendingDeploymentsForRun } from './tools/actions/get-pending-deployments-for-run';
import { actionsGetPrivateRepoForkPrWorkflowsSettingsOrganization } from './tools/actions/get-private-repo-fork-pr-workflows-settings-organization';
import { actionsGetPrivateRepoForkPrWorkflowsSettingsRepository } from './tools/actions/get-private-repo-fork-pr-workflows-settings-repository';
import { actionsGetRepoActionsPolicies } from './tools/actions/get-repo-actions-policies';
import { actionsGetRepoActionsPolicy } from './tools/actions/get-repo-actions-policy';
import { actionsGetRepoPublicKey } from './tools/actions/get-repo-public-key';
import { actionsGetRepoSecret } from './tools/actions/get-repo-secret';
import { actionsGetRepoVariable } from './tools/actions/get-repo-variable';
import { actionsGetReviewsForRun } from './tools/actions/get-reviews-for-run';
import { actionsGetRunnerVersionDeprecationForOrg } from './tools/actions/get-runner-version-deprecation-for-org';
import { actionsGetRunnerVersionDeprecationForRepo } from './tools/actions/get-runner-version-deprecation-for-repo';
import { actionsGetSelfHostedRunnerForOrg } from './tools/actions/get-self-hosted-runner-for-org';
import { actionsGetSelfHostedRunnerForRepo } from './tools/actions/get-self-hosted-runner-for-repo';
import { actionsGetSelfHostedRunnerGroupForOrg } from './tools/actions/get-self-hosted-runner-group-for-org';
import { actionsGetSelfHostedRunnersPermissionsOrganization } from './tools/actions/get-self-hosted-runners-permissions-organization';
import { actionsGetWorkflow } from './tools/actions/get-workflow';
import { actionsGetWorkflowAccessToRepository } from './tools/actions/get-workflow-access-to-repository';
import { actionsGetWorkflowRun } from './tools/actions/get-workflow-run';
import { actionsGetWorkflowRunAttempt } from './tools/actions/get-workflow-run-attempt';
import { actionsGetWorkflowRunUsage } from './tools/actions/get-workflow-run-usage';
import { actionsGetWorkflowUsage } from './tools/actions/get-workflow-usage';
import { actionsListArtifactsForRepo } from './tools/actions/list-artifacts-for-repo';
import { actionsListConcurrencyGroupsForRepository } from './tools/actions/list-concurrency-groups-for-repository';
import { actionsListConcurrencyGroupsForWorkflowRun } from './tools/actions/list-concurrency-groups-for-workflow-run';
import { actionsListCustomImageVersionsForOrg } from './tools/actions/list-custom-image-versions-for-org';
import { actionsListCustomImagesForOrg } from './tools/actions/list-custom-images-for-org';
import { actionsListEnvironmentSecrets } from './tools/actions/list-environment-secrets';
import { actionsListEnvironmentVariables } from './tools/actions/list-environment-variables';
import { actionsListGithubHostedRunnersInGroupForOrg } from './tools/actions/list-github-hosted-runners-in-group-for-org';
import { actionsListHostedRunnersForOrg } from './tools/actions/list-hosted-runners-for-org';
import { actionsListJobsForWorkflowRun } from './tools/actions/list-jobs-for-workflow-run';
import { actionsListJobsForWorkflowRunAttempt } from './tools/actions/list-jobs-for-workflow-run-attempt';
import { actionsListLabelsForSelfHostedRunnerForOrg } from './tools/actions/list-labels-for-self-hosted-runner-for-org';
import { actionsListLabelsForSelfHostedRunnerForRepo } from './tools/actions/list-labels-for-self-hosted-runner-for-repo';
import { actionsListOrgSecrets } from './tools/actions/list-org-secrets';
import { actionsListOrgVariables } from './tools/actions/list-org-variables';
import { actionsListRepoAccessToSelfHostedRunnerGroupInOrg } from './tools/actions/list-repo-access-to-self-hosted-runner-group-in-org';
import { actionsListRepoOrganizationSecrets } from './tools/actions/list-repo-organization-secrets';
import { actionsListRepoOrganizationVariables } from './tools/actions/list-repo-organization-variables';
import { actionsListRepoSecrets } from './tools/actions/list-repo-secrets';
import { actionsListRepoVariables } from './tools/actions/list-repo-variables';
import { actionsListRepoWorkflows } from './tools/actions/list-repo-workflows';
import { actionsListRunnerApplicationsForOrg } from './tools/actions/list-runner-applications-for-org';
import { actionsListRunnerApplicationsForRepo } from './tools/actions/list-runner-applications-for-repo';
import { actionsListSelectedReposForOrgSecret } from './tools/actions/list-selected-repos-for-org-secret';
import { actionsListSelectedReposForOrgVariable } from './tools/actions/list-selected-repos-for-org-variable';
import { actionsListSelectedRepositoriesEnabledGithubActionsOrganization } from './tools/actions/list-selected-repositories-enabled-github-actions-organization';
import { actionsListSelectedRepositoriesSelfHostedRunnersOrganization } from './tools/actions/list-selected-repositories-self-hosted-runners-organization';
import { actionsListSelfHostedRunnerGroupsForOrg } from './tools/actions/list-self-hosted-runner-groups-for-org';
import { actionsListSelfHostedRunnersForOrg } from './tools/actions/list-self-hosted-runners-for-org';
import { actionsListSelfHostedRunnersForRepo } from './tools/actions/list-self-hosted-runners-for-repo';
import { actionsListSelfHostedRunnersInGroupForOrg } from './tools/actions/list-self-hosted-runners-in-group-for-org';
import { actionsListWorkflowRunArtifacts } from './tools/actions/list-workflow-run-artifacts';
import { actionsListWorkflowRuns } from './tools/actions/list-workflow-runs';
import { actionsListWorkflowRunsForRepo } from './tools/actions/list-workflow-runs-for-repo';
import { actionsReRunJobForWorkflowRun } from './tools/actions/re-run-job-for-workflow-run';
import { actionsReRunWorkflow } from './tools/actions/re-run-workflow';
import { actionsReRunWorkflowFailedJobs } from './tools/actions/re-run-workflow-failed-jobs';
import { actionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg } from './tools/actions/remove-all-custom-labels-from-self-hosted-runner-for-org';
import { actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo } from './tools/actions/remove-all-custom-labels-from-self-hosted-runner-for-repo';
import { actionsRemoveCustomLabelFromSelfHostedRunnerForOrg } from './tools/actions/remove-custom-label-from-self-hosted-runner-for-org';
import { actionsRemoveCustomLabelFromSelfHostedRunnerForRepo } from './tools/actions/remove-custom-label-from-self-hosted-runner-for-repo';
import { actionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg } from './tools/actions/remove-repo-access-to-self-hosted-runner-group-in-org';
import { actionsRemoveSelectedRepoFromOrgSecret } from './tools/actions/remove-selected-repo-from-org-secret';
import { actionsRemoveSelectedRepoFromOrgVariable } from './tools/actions/remove-selected-repo-from-org-variable';
import { actionsRemoveSelfHostedRunnerFromGroupForOrg } from './tools/actions/remove-self-hosted-runner-from-group-for-org';
import { actionsReviewCustomGatesForRun } from './tools/actions/review-custom-gates-for-run';
import { actionsReviewPendingDeploymentsForRun } from './tools/actions/review-pending-deployments-for-run';
import { actionsSetActionsCacheRetentionLimitForEnterprise } from './tools/actions/set-actions-cache-retention-limit-for-enterprise';
import { actionsSetActionsCacheRetentionLimitForOrganization } from './tools/actions/set-actions-cache-retention-limit-for-organization';
import { actionsSetActionsCacheRetentionLimitForRepository } from './tools/actions/set-actions-cache-retention-limit-for-repository';
import { actionsSetActionsCacheStorageLimitForEnterprise } from './tools/actions/set-actions-cache-storage-limit-for-enterprise';
import { actionsSetActionsCacheStorageLimitForOrganization } from './tools/actions/set-actions-cache-storage-limit-for-organization';
import { actionsSetActionsCacheStorageLimitForRepository } from './tools/actions/set-actions-cache-storage-limit-for-repository';
import { actionsSetAllowedActionsOrganization } from './tools/actions/set-allowed-actions-organization';
import { actionsSetAllowedActionsRepository } from './tools/actions/set-allowed-actions-repository';
import { actionsSetArtifactAndLogRetentionSettingsOrganization } from './tools/actions/set-artifact-and-log-retention-settings-organization';
import { actionsSetArtifactAndLogRetentionSettingsRepository } from './tools/actions/set-artifact-and-log-retention-settings-repository';
import { actionsSetCustomLabelsForSelfHostedRunnerForOrg } from './tools/actions/set-custom-labels-for-self-hosted-runner-for-org';
import { actionsSetCustomLabelsForSelfHostedRunnerForRepo } from './tools/actions/set-custom-labels-for-self-hosted-runner-for-repo';
import { actionsSetCustomOidcSubClaimForRepo } from './tools/actions/set-custom-oidc-sub-claim-for-repo';
import { actionsSetForkPrContributorApprovalPermissionsOrganization } from './tools/actions/set-fork-pr-contributor-approval-permissions-organization';
import { actionsSetForkPrContributorApprovalPermissionsRepository } from './tools/actions/set-fork-pr-contributor-approval-permissions-repository';
import { actionsSetGithubActionsDefaultWorkflowPermissionsOrganization } from './tools/actions/set-github-actions-default-workflow-permissions-organization';
import { actionsSetGithubActionsDefaultWorkflowPermissionsRepository } from './tools/actions/set-github-actions-default-workflow-permissions-repository';
import { actionsSetGithubActionsPermissionsOrganization } from './tools/actions/set-github-actions-permissions-organization';
import { actionsSetGithubActionsPermissionsRepository } from './tools/actions/set-github-actions-permissions-repository';
import { actionsSetPrivateRepoForkPrWorkflowsSettingsOrganization } from './tools/actions/set-private-repo-fork-pr-workflows-settings-organization';
import { actionsSetPrivateRepoForkPrWorkflowsSettingsRepository } from './tools/actions/set-private-repo-fork-pr-workflows-settings-repository';
import { actionsSetRepoAccessToSelfHostedRunnerGroupInOrg } from './tools/actions/set-repo-access-to-self-hosted-runner-group-in-org';
import { actionsSetSelectedReposForOrgSecret } from './tools/actions/set-selected-repos-for-org-secret';
import { actionsSetSelectedReposForOrgVariable } from './tools/actions/set-selected-repos-for-org-variable';
import { actionsSetSelectedRepositoriesEnabledGithubActionsOrganization } from './tools/actions/set-selected-repositories-enabled-github-actions-organization';
import { actionsSetSelectedRepositoriesSelfHostedRunnersOrganization } from './tools/actions/set-selected-repositories-self-hosted-runners-organization';
import { actionsSetSelfHostedRunnersInGroupForOrg } from './tools/actions/set-self-hosted-runners-in-group-for-org';
import { actionsSetSelfHostedRunnersPermissionsOrganization } from './tools/actions/set-self-hosted-runners-permissions-organization';
import { actionsSetWorkflowAccessToRepository } from './tools/actions/set-workflow-access-to-repository';
import { actionsUpdateEnvironmentVariable } from './tools/actions/update-environment-variable';
import { actionsUpdateHostedRunnerForOrg } from './tools/actions/update-hosted-runner-for-org';
import { actionsUpdateOrgActionsPolicy } from './tools/actions/update-org-actions-policy';
import { actionsUpdateOrgVariable } from './tools/actions/update-org-variable';
import { actionsUpdateRepoActionsPolicy } from './tools/actions/update-repo-actions-policy';
import { actionsUpdateRepoVariable } from './tools/actions/update-repo-variable';
import { actionsUpdateSelfHostedRunnerGroupForOrg } from './tools/actions/update-self-hosted-runner-group-for-org';
import { oidcCreateOidcCustomPropertyInclusionForEnterprise } from './tools/oidc/create-oidc-custom-property-inclusion-for-enterprise';
import { oidcCreateOidcCustomPropertyInclusionForOrg } from './tools/oidc/create-oidc-custom-property-inclusion-for-org';
import { oidcDeleteOidcCustomPropertyInclusionForEnterprise } from './tools/oidc/delete-oidc-custom-property-inclusion-for-enterprise';
import { oidcDeleteOidcCustomPropertyInclusionForOrg } from './tools/oidc/delete-oidc-custom-property-inclusion-for-org';
import { oidcGetOidcCustomSubTemplateForOrg } from './tools/oidc/get-oidc-custom-sub-template-for-org';
import { oidcListOidcCustomPropertyInclusionsForEnterprise } from './tools/oidc/list-oidc-custom-property-inclusions-for-enterprise';
import { oidcListOidcCustomPropertyInclusionsForOrg } from './tools/oidc/list-oidc-custom-property-inclusions-for-org';
import { oidcUpdateOidcCustomSubTemplateForOrg } from './tools/oidc/update-oidc-custom-sub-template-for-org';

export const githubActions = defineGithubServer({
  name: 'github_actions',
  description: 'GitHub REST API: Actions workflows, runs, runners, secrets, variables, caches, artifacts.',
  tools: [
    actionsAddCustomLabelsToSelfHostedRunnerForOrg,
    actionsAddCustomLabelsToSelfHostedRunnerForRepo,
    actionsAddRepoAccessToSelfHostedRunnerGroupInOrg,
    actionsAddSelectedRepoToOrgSecret,
    actionsAddSelectedRepoToOrgVariable,
    actionsAddSelfHostedRunnerToGroupForOrg,
    actionsApproveWorkflowRun,
    actionsCancelWorkflowRun,
    actionsCreateEnvironmentVariable,
    actionsCreateHostedRunnerForOrg,
    actionsCreateOrUpdateEnvironmentSecret,
    actionsCreateOrUpdateOrgSecret,
    actionsCreateOrUpdateRepoSecret,
    actionsCreateOrgActionsPolicy,
    actionsCreateOrgVariable,
    actionsCreateRegistrationTokenForOrg,
    actionsCreateRegistrationTokenForRepo,
    actionsCreateRemoveTokenForOrg,
    actionsCreateRemoveTokenForRepo,
    actionsCreateRepoActionsPolicy,
    actionsCreateRepoVariable,
    actionsCreateSelfHostedRunnerGroupForOrg,
    actionsCreateWorkflowDispatch,
    actionsDeleteActionsCacheById,
    actionsDeleteActionsCacheByKey,
    actionsDeleteArtifact,
    actionsDeleteCustomImageFromOrg,
    actionsDeleteCustomImageVersionFromOrg,
    actionsDeleteEnvironmentSecret,
    actionsDeleteEnvironmentVariable,
    actionsDeleteHostedRunnerForOrg,
    actionsDeleteOrgActionsPolicy,
    actionsDeleteOrgSecret,
    actionsDeleteOrgVariable,
    actionsDeleteRepoActionsPolicy,
    actionsDeleteRepoSecret,
    actionsDeleteRepoVariable,
    actionsDeleteSelfHostedRunnerFromOrg,
    actionsDeleteSelfHostedRunnerFromRepo,
    actionsDeleteSelfHostedRunnerGroupFromOrg,
    actionsDeleteWorkflowRun,
    actionsDeleteWorkflowRunLogs,
    actionsDisableSelectedRepositoryGithubActionsOrganization,
    actionsDisableSelectedRepositorySelfHostedRunnersOrganization,
    actionsDisableWorkflow,
    actionsDownloadArtifact,
    actionsDownloadJobLogsForWorkflowRun,
    actionsDownloadStepLogsForWorkflowRunJob,
    actionsDownloadWorkflowRunAttemptLogs,
    actionsDownloadWorkflowRunLogs,
    actionsEnableSelectedRepositoryGithubActionsOrganization,
    actionsEnableSelectedRepositorySelfHostedRunnersOrganization,
    actionsEnableWorkflow,
    actionsForceCancelWorkflowRun,
    actionsGenerateRunnerJitconfigForOrg,
    actionsGenerateRunnerJitconfigForRepo,
    actionsGetActionsCacheList,
    actionsGetActionsCacheRetentionLimitForEnterprise,
    actionsGetActionsCacheRetentionLimitForOrganization,
    actionsGetActionsCacheRetentionLimitForRepository,
    actionsGetActionsCacheStorageLimitForEnterprise,
    actionsGetActionsCacheStorageLimitForOrganization,
    actionsGetActionsCacheStorageLimitForRepository,
    actionsGetActionsCacheUsage,
    actionsGetActionsCacheUsageByRepoForOrg,
    actionsGetActionsCacheUsageForOrg,
    actionsGetAllowedActionsOrganization,
    actionsGetAllowedActionsRepository,
    actionsGetArtifact,
    actionsGetArtifactAndLogRetentionSettingsOrganization,
    actionsGetArtifactAndLogRetentionSettingsRepository,
    actionsGetConcurrencyGroupForRepository,
    actionsGetCustomImageForOrg,
    actionsGetCustomImageVersionForOrg,
    actionsGetCustomOidcSubClaimForRepo,
    actionsGetEnvironmentPublicKey,
    actionsGetEnvironmentSecret,
    actionsGetEnvironmentVariable,
    actionsGetForkPrContributorApprovalPermissionsOrganization,
    actionsGetForkPrContributorApprovalPermissionsRepository,
    actionsGetGithubActionsDefaultWorkflowPermissionsOrganization,
    actionsGetGithubActionsDefaultWorkflowPermissionsRepository,
    actionsGetGithubActionsPermissionsOrganization,
    actionsGetGithubActionsPermissionsRepository,
    actionsGetHostedRunnerForOrg,
    actionsGetHostedRunnersGithubOwnedImagesForOrg,
    actionsGetHostedRunnersLimitsForOrg,
    actionsGetHostedRunnersMachineSpecsForOrg,
    actionsGetHostedRunnersPartnerImagesForOrg,
    actionsGetHostedRunnersPlatformsForOrg,
    actionsGetJobForWorkflowRun,
    actionsGetOrgActionsPolicies,
    actionsGetOrgActionsPolicy,
    actionsGetOrgPublicKey,
    actionsGetOrgSecret,
    actionsGetOrgVariable,
    actionsGetPendingDeploymentsForRun,
    actionsGetPrivateRepoForkPrWorkflowsSettingsOrganization,
    actionsGetPrivateRepoForkPrWorkflowsSettingsRepository,
    actionsGetRepoActionsPolicies,
    actionsGetRepoActionsPolicy,
    actionsGetRepoPublicKey,
    actionsGetRepoSecret,
    actionsGetRepoVariable,
    actionsGetReviewsForRun,
    actionsGetRunnerVersionDeprecationForOrg,
    actionsGetRunnerVersionDeprecationForRepo,
    actionsGetSelfHostedRunnerForOrg,
    actionsGetSelfHostedRunnerForRepo,
    actionsGetSelfHostedRunnerGroupForOrg,
    actionsGetSelfHostedRunnersPermissionsOrganization,
    actionsGetWorkflow,
    actionsGetWorkflowAccessToRepository,
    actionsGetWorkflowRun,
    actionsGetWorkflowRunAttempt,
    actionsGetWorkflowRunUsage,
    actionsGetWorkflowUsage,
    actionsListArtifactsForRepo,
    actionsListConcurrencyGroupsForRepository,
    actionsListConcurrencyGroupsForWorkflowRun,
    actionsListCustomImageVersionsForOrg,
    actionsListCustomImagesForOrg,
    actionsListEnvironmentSecrets,
    actionsListEnvironmentVariables,
    actionsListGithubHostedRunnersInGroupForOrg,
    actionsListHostedRunnersForOrg,
    actionsListJobsForWorkflowRun,
    actionsListJobsForWorkflowRunAttempt,
    actionsListLabelsForSelfHostedRunnerForOrg,
    actionsListLabelsForSelfHostedRunnerForRepo,
    actionsListOrgSecrets,
    actionsListOrgVariables,
    actionsListRepoAccessToSelfHostedRunnerGroupInOrg,
    actionsListRepoOrganizationSecrets,
    actionsListRepoOrganizationVariables,
    actionsListRepoSecrets,
    actionsListRepoVariables,
    actionsListRepoWorkflows,
    actionsListRunnerApplicationsForOrg,
    actionsListRunnerApplicationsForRepo,
    actionsListSelectedReposForOrgSecret,
    actionsListSelectedReposForOrgVariable,
    actionsListSelectedRepositoriesEnabledGithubActionsOrganization,
    actionsListSelectedRepositoriesSelfHostedRunnersOrganization,
    actionsListSelfHostedRunnerGroupsForOrg,
    actionsListSelfHostedRunnersForOrg,
    actionsListSelfHostedRunnersForRepo,
    actionsListSelfHostedRunnersInGroupForOrg,
    actionsListWorkflowRunArtifacts,
    actionsListWorkflowRuns,
    actionsListWorkflowRunsForRepo,
    actionsReRunJobForWorkflowRun,
    actionsReRunWorkflow,
    actionsReRunWorkflowFailedJobs,
    actionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg,
    actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo,
    actionsRemoveCustomLabelFromSelfHostedRunnerForOrg,
    actionsRemoveCustomLabelFromSelfHostedRunnerForRepo,
    actionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg,
    actionsRemoveSelectedRepoFromOrgSecret,
    actionsRemoveSelectedRepoFromOrgVariable,
    actionsRemoveSelfHostedRunnerFromGroupForOrg,
    actionsReviewCustomGatesForRun,
    actionsReviewPendingDeploymentsForRun,
    actionsSetActionsCacheRetentionLimitForEnterprise,
    actionsSetActionsCacheRetentionLimitForOrganization,
    actionsSetActionsCacheRetentionLimitForRepository,
    actionsSetActionsCacheStorageLimitForEnterprise,
    actionsSetActionsCacheStorageLimitForOrganization,
    actionsSetActionsCacheStorageLimitForRepository,
    actionsSetAllowedActionsOrganization,
    actionsSetAllowedActionsRepository,
    actionsSetArtifactAndLogRetentionSettingsOrganization,
    actionsSetArtifactAndLogRetentionSettingsRepository,
    actionsSetCustomLabelsForSelfHostedRunnerForOrg,
    actionsSetCustomLabelsForSelfHostedRunnerForRepo,
    actionsSetCustomOidcSubClaimForRepo,
    actionsSetForkPrContributorApprovalPermissionsOrganization,
    actionsSetForkPrContributorApprovalPermissionsRepository,
    actionsSetGithubActionsDefaultWorkflowPermissionsOrganization,
    actionsSetGithubActionsDefaultWorkflowPermissionsRepository,
    actionsSetGithubActionsPermissionsOrganization,
    actionsSetGithubActionsPermissionsRepository,
    actionsSetPrivateRepoForkPrWorkflowsSettingsOrganization,
    actionsSetPrivateRepoForkPrWorkflowsSettingsRepository,
    actionsSetRepoAccessToSelfHostedRunnerGroupInOrg,
    actionsSetSelectedReposForOrgSecret,
    actionsSetSelectedReposForOrgVariable,
    actionsSetSelectedRepositoriesEnabledGithubActionsOrganization,
    actionsSetSelectedRepositoriesSelfHostedRunnersOrganization,
    actionsSetSelfHostedRunnersInGroupForOrg,
    actionsSetSelfHostedRunnersPermissionsOrganization,
    actionsSetWorkflowAccessToRepository,
    actionsUpdateEnvironmentVariable,
    actionsUpdateHostedRunnerForOrg,
    actionsUpdateOrgActionsPolicy,
    actionsUpdateOrgVariable,
    actionsUpdateRepoActionsPolicy,
    actionsUpdateRepoVariable,
    actionsUpdateSelfHostedRunnerGroupForOrg,
    oidcCreateOidcCustomPropertyInclusionForEnterprise,
    oidcCreateOidcCustomPropertyInclusionForOrg,
    oidcDeleteOidcCustomPropertyInclusionForEnterprise,
    oidcDeleteOidcCustomPropertyInclusionForOrg,
    oidcGetOidcCustomSubTemplateForOrg,
    oidcListOidcCustomPropertyInclusionsForEnterprise,
    oidcListOidcCustomPropertyInclusionsForOrg,
    oidcUpdateOidcCustomSubTemplateForOrg,
  ],
});
