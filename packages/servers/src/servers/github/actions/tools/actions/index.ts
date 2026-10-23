import { actionsAddCustomLabelsToSelfHostedRunnerForOrg } from './add-custom-labels-to-self-hosted-runner-for-org';
import { actionsAddCustomLabelsToSelfHostedRunnerForRepo } from './add-custom-labels-to-self-hosted-runner-for-repo';
import { actionsAddRepoAccessToSelfHostedRunnerGroupInOrg } from './add-repo-access-to-self-hosted-runner-group-in-org';
import { actionsAddSelectedRepoToOrgSecret } from './add-selected-repo-to-org-secret';
import { actionsAddSelectedRepoToOrgVariable } from './add-selected-repo-to-org-variable';
import { actionsAddSelfHostedRunnerToGroupForOrg } from './add-self-hosted-runner-to-group-for-org';
import { actionsApproveWorkflowRun } from './approve-workflow-run';
import { actionsCancelWorkflowRun } from './cancel-workflow-run';
import { actionsCreateEnvironmentVariable } from './create-environment-variable';
import { actionsCreateHostedRunnerForOrg } from './create-hosted-runner-for-org';
import { actionsCreateOrUpdateEnvironmentSecret } from './create-or-update-environment-secret';
import { actionsCreateOrUpdateOrgSecret } from './create-or-update-org-secret';
import { actionsCreateOrUpdateRepoSecret } from './create-or-update-repo-secret';
import { actionsCreateOrgActionsPolicy } from './create-org-actions-policy';
import { actionsCreateOrgVariable } from './create-org-variable';
import { actionsCreateRegistrationTokenForOrg } from './create-registration-token-for-org';
import { actionsCreateRegistrationTokenForRepo } from './create-registration-token-for-repo';
import { actionsCreateRemoveTokenForOrg } from './create-remove-token-for-org';
import { actionsCreateRemoveTokenForRepo } from './create-remove-token-for-repo';
import { actionsCreateRepoActionsPolicy } from './create-repo-actions-policy';
import { actionsCreateRepoVariable } from './create-repo-variable';
import { actionsCreateSelfHostedRunnerGroupForOrg } from './create-self-hosted-runner-group-for-org';
import { actionsCreateWorkflowDispatch } from './create-workflow-dispatch';
import { actionsDeleteActionsCacheById } from './delete-actions-cache-by-id';
import { actionsDeleteActionsCacheByKey } from './delete-actions-cache-by-key';
import { actionsDeleteArtifact } from './delete-artifact';
import { actionsDeleteCustomImageFromOrg } from './delete-custom-image-from-org';
import { actionsDeleteCustomImageVersionFromOrg } from './delete-custom-image-version-from-org';
import { actionsDeleteEnvironmentSecret } from './delete-environment-secret';
import { actionsDeleteEnvironmentVariable } from './delete-environment-variable';
import { actionsDeleteHostedRunnerForOrg } from './delete-hosted-runner-for-org';
import { actionsDeleteOrgActionsPolicy } from './delete-org-actions-policy';
import { actionsDeleteOrgSecret } from './delete-org-secret';
import { actionsDeleteOrgVariable } from './delete-org-variable';
import { actionsDeleteRepoActionsPolicy } from './delete-repo-actions-policy';
import { actionsDeleteRepoSecret } from './delete-repo-secret';
import { actionsDeleteRepoVariable } from './delete-repo-variable';
import { actionsDeleteSelfHostedRunnerFromOrg } from './delete-self-hosted-runner-from-org';
import { actionsDeleteSelfHostedRunnerFromRepo } from './delete-self-hosted-runner-from-repo';
import { actionsDeleteSelfHostedRunnerGroupFromOrg } from './delete-self-hosted-runner-group-from-org';
import { actionsDeleteWorkflowRun } from './delete-workflow-run';
import { actionsDeleteWorkflowRunLogs } from './delete-workflow-run-logs';
import { actionsDisableSelectedRepositoryGithubActionsOrganization } from './disable-selected-repository-github-actions-organization';
import { actionsDisableSelectedRepositorySelfHostedRunnersOrganization } from './disable-selected-repository-self-hosted-runners-organization';
import { actionsDisableWorkflow } from './disable-workflow';
import { actionsDownloadArtifact } from './download-artifact';
import { actionsDownloadJobLogsForWorkflowRun } from './download-job-logs-for-workflow-run';
import { actionsDownloadStepLogsForWorkflowRunJob } from './download-step-logs-for-workflow-run-job';
import { actionsDownloadWorkflowRunAttemptLogs } from './download-workflow-run-attempt-logs';
import { actionsDownloadWorkflowRunLogs } from './download-workflow-run-logs';
import { actionsEnableSelectedRepositoryGithubActionsOrganization } from './enable-selected-repository-github-actions-organization';
import { actionsEnableSelectedRepositorySelfHostedRunnersOrganization } from './enable-selected-repository-self-hosted-runners-organization';
import { actionsEnableWorkflow } from './enable-workflow';
import { actionsForceCancelWorkflowRun } from './force-cancel-workflow-run';
import { actionsGenerateRunnerJitconfigForOrg } from './generate-runner-jitconfig-for-org';
import { actionsGenerateRunnerJitconfigForRepo } from './generate-runner-jitconfig-for-repo';
import { actionsGetActionsCacheList } from './get-actions-cache-list';
import { actionsGetActionsCacheRetentionLimitForEnterprise } from './get-actions-cache-retention-limit-for-enterprise';
import { actionsGetActionsCacheRetentionLimitForOrganization } from './get-actions-cache-retention-limit-for-organization';
import { actionsGetActionsCacheRetentionLimitForRepository } from './get-actions-cache-retention-limit-for-repository';
import { actionsGetActionsCacheStorageLimitForEnterprise } from './get-actions-cache-storage-limit-for-enterprise';
import { actionsGetActionsCacheStorageLimitForOrganization } from './get-actions-cache-storage-limit-for-organization';
import { actionsGetActionsCacheStorageLimitForRepository } from './get-actions-cache-storage-limit-for-repository';
import { actionsGetActionsCacheUsage } from './get-actions-cache-usage';
import { actionsGetActionsCacheUsageByRepoForOrg } from './get-actions-cache-usage-by-repo-for-org';
import { actionsGetActionsCacheUsageForOrg } from './get-actions-cache-usage-for-org';
import { actionsGetAllowedActionsOrganization } from './get-allowed-actions-organization';
import { actionsGetAllowedActionsRepository } from './get-allowed-actions-repository';
import { actionsGetArtifact } from './get-artifact';
import { actionsGetArtifactAndLogRetentionSettingsOrganization } from './get-artifact-and-log-retention-settings-organization';
import { actionsGetArtifactAndLogRetentionSettingsRepository } from './get-artifact-and-log-retention-settings-repository';
import { actionsGetConcurrencyGroupForRepository } from './get-concurrency-group-for-repository';
import { actionsGetCustomImageForOrg } from './get-custom-image-for-org';
import { actionsGetCustomImageVersionForOrg } from './get-custom-image-version-for-org';
import { actionsGetCustomOidcSubClaimForRepo } from './get-custom-oidc-sub-claim-for-repo';
import { actionsGetEnvironmentPublicKey } from './get-environment-public-key';
import { actionsGetEnvironmentSecret } from './get-environment-secret';
import { actionsGetEnvironmentVariable } from './get-environment-variable';
import { actionsGetForkPrContributorApprovalPermissionsOrganization } from './get-fork-pr-contributor-approval-permissions-organization';
import { actionsGetForkPrContributorApprovalPermissionsRepository } from './get-fork-pr-contributor-approval-permissions-repository';
import { actionsGetGithubActionsDefaultWorkflowPermissionsOrganization } from './get-github-actions-default-workflow-permissions-organization';
import { actionsGetGithubActionsDefaultWorkflowPermissionsRepository } from './get-github-actions-default-workflow-permissions-repository';
import { actionsGetGithubActionsPermissionsOrganization } from './get-github-actions-permissions-organization';
import { actionsGetGithubActionsPermissionsRepository } from './get-github-actions-permissions-repository';
import { actionsGetHostedRunnerForOrg } from './get-hosted-runner-for-org';
import { actionsGetHostedRunnersGithubOwnedImagesForOrg } from './get-hosted-runners-github-owned-images-for-org';
import { actionsGetHostedRunnersLimitsForOrg } from './get-hosted-runners-limits-for-org';
import { actionsGetHostedRunnersMachineSpecsForOrg } from './get-hosted-runners-machine-specs-for-org';
import { actionsGetHostedRunnersPartnerImagesForOrg } from './get-hosted-runners-partner-images-for-org';
import { actionsGetHostedRunnersPlatformsForOrg } from './get-hosted-runners-platforms-for-org';
import { actionsGetJobForWorkflowRun } from './get-job-for-workflow-run';
import { actionsGetOrgActionsPolicies } from './get-org-actions-policies';
import { actionsGetOrgActionsPolicy } from './get-org-actions-policy';
import { actionsGetOrgPublicKey } from './get-org-public-key';
import { actionsGetOrgSecret } from './get-org-secret';
import { actionsGetOrgVariable } from './get-org-variable';
import { actionsGetPendingDeploymentsForRun } from './get-pending-deployments-for-run';
import { actionsGetPrivateRepoForkPrWorkflowsSettingsOrganization } from './get-private-repo-fork-pr-workflows-settings-organization';
import { actionsGetPrivateRepoForkPrWorkflowsSettingsRepository } from './get-private-repo-fork-pr-workflows-settings-repository';
import { actionsGetRepoActionsPolicies } from './get-repo-actions-policies';
import { actionsGetRepoActionsPolicy } from './get-repo-actions-policy';
import { actionsGetRepoPublicKey } from './get-repo-public-key';
import { actionsGetRepoSecret } from './get-repo-secret';
import { actionsGetRepoVariable } from './get-repo-variable';
import { actionsGetReviewsForRun } from './get-reviews-for-run';
import { actionsGetRunnerVersionDeprecationForOrg } from './get-runner-version-deprecation-for-org';
import { actionsGetRunnerVersionDeprecationForRepo } from './get-runner-version-deprecation-for-repo';
import { actionsGetSelfHostedRunnerForOrg } from './get-self-hosted-runner-for-org';
import { actionsGetSelfHostedRunnerForRepo } from './get-self-hosted-runner-for-repo';
import { actionsGetSelfHostedRunnerGroupForOrg } from './get-self-hosted-runner-group-for-org';
import { actionsGetSelfHostedRunnersPermissionsOrganization } from './get-self-hosted-runners-permissions-organization';
import { actionsGetWorkflow } from './get-workflow';
import { actionsGetWorkflowAccessToRepository } from './get-workflow-access-to-repository';
import { actionsGetWorkflowRun } from './get-workflow-run';
import { actionsGetWorkflowRunAttempt } from './get-workflow-run-attempt';
import { actionsGetWorkflowRunUsage } from './get-workflow-run-usage';
import { actionsGetWorkflowUsage } from './get-workflow-usage';
import { actionsListArtifactsForRepo } from './list-artifacts-for-repo';
import { actionsListConcurrencyGroupsForRepository } from './list-concurrency-groups-for-repository';
import { actionsListConcurrencyGroupsForWorkflowRun } from './list-concurrency-groups-for-workflow-run';
import { actionsListCustomImageVersionsForOrg } from './list-custom-image-versions-for-org';
import { actionsListCustomImagesForOrg } from './list-custom-images-for-org';
import { actionsListEnvironmentSecrets } from './list-environment-secrets';
import { actionsListEnvironmentVariables } from './list-environment-variables';
import { actionsListGithubHostedRunnersInGroupForOrg } from './list-github-hosted-runners-in-group-for-org';
import { actionsListHostedRunnersForOrg } from './list-hosted-runners-for-org';
import { actionsListJobsForWorkflowRun } from './list-jobs-for-workflow-run';
import { actionsListJobsForWorkflowRunAttempt } from './list-jobs-for-workflow-run-attempt';
import { actionsListLabelsForSelfHostedRunnerForOrg } from './list-labels-for-self-hosted-runner-for-org';
import { actionsListLabelsForSelfHostedRunnerForRepo } from './list-labels-for-self-hosted-runner-for-repo';
import { actionsListOrgSecrets } from './list-org-secrets';
import { actionsListOrgVariables } from './list-org-variables';
import { actionsListRepoAccessToSelfHostedRunnerGroupInOrg } from './list-repo-access-to-self-hosted-runner-group-in-org';
import { actionsListRepoOrganizationSecrets } from './list-repo-organization-secrets';
import { actionsListRepoOrganizationVariables } from './list-repo-organization-variables';
import { actionsListRepoSecrets } from './list-repo-secrets';
import { actionsListRepoVariables } from './list-repo-variables';
import { actionsListRepoWorkflows } from './list-repo-workflows';
import { actionsListRunnerApplicationsForOrg } from './list-runner-applications-for-org';
import { actionsListRunnerApplicationsForRepo } from './list-runner-applications-for-repo';
import { actionsListSelectedReposForOrgSecret } from './list-selected-repos-for-org-secret';
import { actionsListSelectedReposForOrgVariable } from './list-selected-repos-for-org-variable';
import { actionsListSelectedRepositoriesEnabledGithubActionsOrganization } from './list-selected-repositories-enabled-github-actions-organization';
import { actionsListSelectedRepositoriesSelfHostedRunnersOrganization } from './list-selected-repositories-self-hosted-runners-organization';
import { actionsListSelfHostedRunnerGroupsForOrg } from './list-self-hosted-runner-groups-for-org';
import { actionsListSelfHostedRunnersForOrg } from './list-self-hosted-runners-for-org';
import { actionsListSelfHostedRunnersForRepo } from './list-self-hosted-runners-for-repo';
import { actionsListSelfHostedRunnersInGroupForOrg } from './list-self-hosted-runners-in-group-for-org';
import { actionsListWorkflowRunArtifacts } from './list-workflow-run-artifacts';
import { actionsListWorkflowRuns } from './list-workflow-runs';
import { actionsListWorkflowRunsForRepo } from './list-workflow-runs-for-repo';
import { actionsReRunJobForWorkflowRun } from './re-run-job-for-workflow-run';
import { actionsReRunWorkflow } from './re-run-workflow';
import { actionsReRunWorkflowFailedJobs } from './re-run-workflow-failed-jobs';
import { actionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg } from './remove-all-custom-labels-from-self-hosted-runner-for-org';
import { actionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo } from './remove-all-custom-labels-from-self-hosted-runner-for-repo';
import { actionsRemoveCustomLabelFromSelfHostedRunnerForOrg } from './remove-custom-label-from-self-hosted-runner-for-org';
import { actionsRemoveCustomLabelFromSelfHostedRunnerForRepo } from './remove-custom-label-from-self-hosted-runner-for-repo';
import { actionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg } from './remove-repo-access-to-self-hosted-runner-group-in-org';
import { actionsRemoveSelectedRepoFromOrgSecret } from './remove-selected-repo-from-org-secret';
import { actionsRemoveSelectedRepoFromOrgVariable } from './remove-selected-repo-from-org-variable';
import { actionsRemoveSelfHostedRunnerFromGroupForOrg } from './remove-self-hosted-runner-from-group-for-org';
import { actionsReviewCustomGatesForRun } from './review-custom-gates-for-run';
import { actionsReviewPendingDeploymentsForRun } from './review-pending-deployments-for-run';
import { actionsSetActionsCacheRetentionLimitForEnterprise } from './set-actions-cache-retention-limit-for-enterprise';
import { actionsSetActionsCacheRetentionLimitForOrganization } from './set-actions-cache-retention-limit-for-organization';
import { actionsSetActionsCacheRetentionLimitForRepository } from './set-actions-cache-retention-limit-for-repository';
import { actionsSetActionsCacheStorageLimitForEnterprise } from './set-actions-cache-storage-limit-for-enterprise';
import { actionsSetActionsCacheStorageLimitForOrganization } from './set-actions-cache-storage-limit-for-organization';
import { actionsSetActionsCacheStorageLimitForRepository } from './set-actions-cache-storage-limit-for-repository';
import { actionsSetAllowedActionsOrganization } from './set-allowed-actions-organization';
import { actionsSetAllowedActionsRepository } from './set-allowed-actions-repository';
import { actionsSetArtifactAndLogRetentionSettingsOrganization } from './set-artifact-and-log-retention-settings-organization';
import { actionsSetArtifactAndLogRetentionSettingsRepository } from './set-artifact-and-log-retention-settings-repository';
import { actionsSetCustomLabelsForSelfHostedRunnerForOrg } from './set-custom-labels-for-self-hosted-runner-for-org';
import { actionsSetCustomLabelsForSelfHostedRunnerForRepo } from './set-custom-labels-for-self-hosted-runner-for-repo';
import { actionsSetCustomOidcSubClaimForRepo } from './set-custom-oidc-sub-claim-for-repo';
import { actionsSetForkPrContributorApprovalPermissionsOrganization } from './set-fork-pr-contributor-approval-permissions-organization';
import { actionsSetForkPrContributorApprovalPermissionsRepository } from './set-fork-pr-contributor-approval-permissions-repository';
import { actionsSetGithubActionsDefaultWorkflowPermissionsOrganization } from './set-github-actions-default-workflow-permissions-organization';
import { actionsSetGithubActionsDefaultWorkflowPermissionsRepository } from './set-github-actions-default-workflow-permissions-repository';
import { actionsSetGithubActionsPermissionsOrganization } from './set-github-actions-permissions-organization';
import { actionsSetGithubActionsPermissionsRepository } from './set-github-actions-permissions-repository';
import { actionsSetPrivateRepoForkPrWorkflowsSettingsOrganization } from './set-private-repo-fork-pr-workflows-settings-organization';
import { actionsSetPrivateRepoForkPrWorkflowsSettingsRepository } from './set-private-repo-fork-pr-workflows-settings-repository';
import { actionsSetRepoAccessToSelfHostedRunnerGroupInOrg } from './set-repo-access-to-self-hosted-runner-group-in-org';
import { actionsSetSelectedReposForOrgSecret } from './set-selected-repos-for-org-secret';
import { actionsSetSelectedReposForOrgVariable } from './set-selected-repos-for-org-variable';
import { actionsSetSelectedRepositoriesEnabledGithubActionsOrganization } from './set-selected-repositories-enabled-github-actions-organization';
import { actionsSetSelectedRepositoriesSelfHostedRunnersOrganization } from './set-selected-repositories-self-hosted-runners-organization';
import { actionsSetSelfHostedRunnersInGroupForOrg } from './set-self-hosted-runners-in-group-for-org';
import { actionsSetSelfHostedRunnersPermissionsOrganization } from './set-self-hosted-runners-permissions-organization';
import { actionsSetWorkflowAccessToRepository } from './set-workflow-access-to-repository';
import { actionsUpdateEnvironmentVariable } from './update-environment-variable';
import { actionsUpdateHostedRunnerForOrg } from './update-hosted-runner-for-org';
import { actionsUpdateOrgActionsPolicy } from './update-org-actions-policy';
import { actionsUpdateOrgVariable } from './update-org-variable';
import { actionsUpdateRepoActionsPolicy } from './update-repo-actions-policy';
import { actionsUpdateRepoVariable } from './update-repo-variable';
import { actionsUpdateSelfHostedRunnerGroupForOrg } from './update-self-hosted-runner-group-for-org';

export const actionsTools = [
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
];
