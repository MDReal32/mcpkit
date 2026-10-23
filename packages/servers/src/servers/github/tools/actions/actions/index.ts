import { actionsActionsAddCustomLabelsToSelfHostedRunnerForOrg } from "./add-custom-labels-to-self-hosted-runner-for-org";
import { actionsActionsAddCustomLabelsToSelfHostedRunnerForRepo } from "./add-custom-labels-to-self-hosted-runner-for-repo";
import { actionsActionsAddRepoAccessToSelfHostedRunnerGroupInOrg } from "./add-repo-access-to-self-hosted-runner-group-in-org";
import { actionsActionsAddSelectedRepoToOrgSecret } from "./add-selected-repo-to-org-secret";
import { actionsActionsAddSelectedRepoToOrgVariable } from "./add-selected-repo-to-org-variable";
import { actionsActionsAddSelfHostedRunnerToGroupForOrg } from "./add-self-hosted-runner-to-group-for-org";
import { actionsActionsApproveWorkflowRun } from "./approve-workflow-run";
import { actionsActionsCancelWorkflowRun } from "./cancel-workflow-run";
import { actionsActionsCreateEnvironmentVariable } from "./create-environment-variable";
import { actionsActionsCreateHostedRunnerForOrg } from "./create-hosted-runner-for-org";
import { actionsActionsCreateOrUpdateEnvironmentSecret } from "./create-or-update-environment-secret";
import { actionsActionsCreateOrUpdateOrgSecret } from "./create-or-update-org-secret";
import { actionsActionsCreateOrUpdateRepoSecret } from "./create-or-update-repo-secret";
import { actionsActionsCreateOrgActionsPolicy } from "./create-org-actions-policy";
import { actionsActionsCreateOrgVariable } from "./create-org-variable";
import { actionsActionsCreateRegistrationTokenForOrg } from "./create-registration-token-for-org";
import { actionsActionsCreateRegistrationTokenForRepo } from "./create-registration-token-for-repo";
import { actionsActionsCreateRemoveTokenForOrg } from "./create-remove-token-for-org";
import { actionsActionsCreateRemoveTokenForRepo } from "./create-remove-token-for-repo";
import { actionsActionsCreateRepoActionsPolicy } from "./create-repo-actions-policy";
import { actionsActionsCreateRepoVariable } from "./create-repo-variable";
import { actionsActionsCreateSelfHostedRunnerGroupForOrg } from "./create-self-hosted-runner-group-for-org";
import { actionsActionsCreateWorkflowDispatch } from "./create-workflow-dispatch";
import { actionsActionsDeleteActionsCacheById } from "./delete-actions-cache-by-id";
import { actionsActionsDeleteActionsCacheByKey } from "./delete-actions-cache-by-key";
import { actionsActionsDeleteArtifact } from "./delete-artifact";
import { actionsActionsDeleteCustomImageFromOrg } from "./delete-custom-image-from-org";
import { actionsActionsDeleteCustomImageVersionFromOrg } from "./delete-custom-image-version-from-org";
import { actionsActionsDeleteEnvironmentSecret } from "./delete-environment-secret";
import { actionsActionsDeleteEnvironmentVariable } from "./delete-environment-variable";
import { actionsActionsDeleteHostedRunnerForOrg } from "./delete-hosted-runner-for-org";
import { actionsActionsDeleteOrgActionsPolicy } from "./delete-org-actions-policy";
import { actionsActionsDeleteOrgSecret } from "./delete-org-secret";
import { actionsActionsDeleteOrgVariable } from "./delete-org-variable";
import { actionsActionsDeleteRepoActionsPolicy } from "./delete-repo-actions-policy";
import { actionsActionsDeleteRepoSecret } from "./delete-repo-secret";
import { actionsActionsDeleteRepoVariable } from "./delete-repo-variable";
import { actionsActionsDeleteSelfHostedRunnerFromOrg } from "./delete-self-hosted-runner-from-org";
import { actionsActionsDeleteSelfHostedRunnerFromRepo } from "./delete-self-hosted-runner-from-repo";
import { actionsActionsDeleteSelfHostedRunnerGroupFromOrg } from "./delete-self-hosted-runner-group-from-org";
import { actionsActionsDeleteWorkflowRun } from "./delete-workflow-run";
import { actionsActionsDeleteWorkflowRunLogs } from "./delete-workflow-run-logs";
import { actionsActionsDisableSelectedRepositoryGithubActionsOrganization } from "./disable-selected-repository-github-actions-organization";
import { actionsActionsDisableSelectedRepositorySelfHostedRunnersOrganization } from "./disable-selected-repository-self-hosted-runners-organization";
import { actionsActionsDisableWorkflow } from "./disable-workflow";
import { actionsActionsDownloadArtifact } from "./download-artifact";
import { actionsActionsDownloadJobLogsForWorkflowRun } from "./download-job-logs-for-workflow-run";
import { actionsActionsDownloadStepLogsForWorkflowRunJob } from "./download-step-logs-for-workflow-run-job";
import { actionsActionsDownloadWorkflowRunAttemptLogs } from "./download-workflow-run-attempt-logs";
import { actionsActionsDownloadWorkflowRunLogs } from "./download-workflow-run-logs";
import { actionsActionsEnableSelectedRepositoryGithubActionsOrganization } from "./enable-selected-repository-github-actions-organization";
import { actionsActionsEnableSelectedRepositorySelfHostedRunnersOrganization } from "./enable-selected-repository-self-hosted-runners-organization";
import { actionsActionsEnableWorkflow } from "./enable-workflow";
import { actionsActionsForceCancelWorkflowRun } from "./force-cancel-workflow-run";
import { actionsActionsGenerateRunnerJitconfigForOrg } from "./generate-runner-jitconfig-for-org";
import { actionsActionsGenerateRunnerJitconfigForRepo } from "./generate-runner-jitconfig-for-repo";
import { actionsActionsGetActionsCacheList } from "./get-actions-cache-list";
import { actionsActionsGetActionsCacheRetentionLimitForEnterprise } from "./get-actions-cache-retention-limit-for-enterprise";
import { actionsActionsGetActionsCacheRetentionLimitForOrganization } from "./get-actions-cache-retention-limit-for-organization";
import { actionsActionsGetActionsCacheRetentionLimitForRepository } from "./get-actions-cache-retention-limit-for-repository";
import { actionsActionsGetActionsCacheStorageLimitForEnterprise } from "./get-actions-cache-storage-limit-for-enterprise";
import { actionsActionsGetActionsCacheStorageLimitForOrganization } from "./get-actions-cache-storage-limit-for-organization";
import { actionsActionsGetActionsCacheStorageLimitForRepository } from "./get-actions-cache-storage-limit-for-repository";
import { actionsActionsGetActionsCacheUsage } from "./get-actions-cache-usage";
import { actionsActionsGetActionsCacheUsageByRepoForOrg } from "./get-actions-cache-usage-by-repo-for-org";
import { actionsActionsGetActionsCacheUsageForOrg } from "./get-actions-cache-usage-for-org";
import { actionsActionsGetAllowedActionsOrganization } from "./get-allowed-actions-organization";
import { actionsActionsGetAllowedActionsRepository } from "./get-allowed-actions-repository";
import { actionsActionsGetArtifact } from "./get-artifact";
import { actionsActionsGetArtifactAndLogRetentionSettingsOrganization } from "./get-artifact-and-log-retention-settings-organization";
import { actionsActionsGetArtifactAndLogRetentionSettingsRepository } from "./get-artifact-and-log-retention-settings-repository";
import { actionsActionsGetConcurrencyGroupForRepository } from "./get-concurrency-group-for-repository";
import { actionsActionsGetCustomImageForOrg } from "./get-custom-image-for-org";
import { actionsActionsGetCustomImageVersionForOrg } from "./get-custom-image-version-for-org";
import { actionsActionsGetCustomOidcSubClaimForRepo } from "./get-custom-oidc-sub-claim-for-repo";
import { actionsActionsGetEnvironmentPublicKey } from "./get-environment-public-key";
import { actionsActionsGetEnvironmentSecret } from "./get-environment-secret";
import { actionsActionsGetEnvironmentVariable } from "./get-environment-variable";
import { actionsActionsGetForkPrContributorApprovalPermissionsOrganization } from "./get-fork-pr-contributor-approval-permissions-organization";
import { actionsActionsGetForkPrContributorApprovalPermissionsRepository } from "./get-fork-pr-contributor-approval-permissions-repository";
import { actionsActionsGetGithubActionsDefaultWorkflowPermissionsOrganization } from "./get-github-actions-default-workflow-permissions-organization";
import { actionsActionsGetGithubActionsDefaultWorkflowPermissionsRepository } from "./get-github-actions-default-workflow-permissions-repository";
import { actionsActionsGetGithubActionsPermissionsOrganization } from "./get-github-actions-permissions-organization";
import { actionsActionsGetGithubActionsPermissionsRepository } from "./get-github-actions-permissions-repository";
import { actionsActionsGetHostedRunnerForOrg } from "./get-hosted-runner-for-org";
import { actionsActionsGetHostedRunnersGithubOwnedImagesForOrg } from "./get-hosted-runners-github-owned-images-for-org";
import { actionsActionsGetHostedRunnersLimitsForOrg } from "./get-hosted-runners-limits-for-org";
import { actionsActionsGetHostedRunnersMachineSpecsForOrg } from "./get-hosted-runners-machine-specs-for-org";
import { actionsActionsGetHostedRunnersPartnerImagesForOrg } from "./get-hosted-runners-partner-images-for-org";
import { actionsActionsGetHostedRunnersPlatformsForOrg } from "./get-hosted-runners-platforms-for-org";
import { actionsActionsGetJobForWorkflowRun } from "./get-job-for-workflow-run";
import { actionsActionsGetOrgActionsPolicies } from "./get-org-actions-policies";
import { actionsActionsGetOrgActionsPolicy } from "./get-org-actions-policy";
import { actionsActionsGetOrgPublicKey } from "./get-org-public-key";
import { actionsActionsGetOrgSecret } from "./get-org-secret";
import { actionsActionsGetOrgVariable } from "./get-org-variable";
import { actionsActionsGetPendingDeploymentsForRun } from "./get-pending-deployments-for-run";
import { actionsActionsGetPrivateRepoForkPrWorkflowsSettingsOrganization } from "./get-private-repo-fork-pr-workflows-settings-organization";
import { actionsActionsGetPrivateRepoForkPrWorkflowsSettingsRepository } from "./get-private-repo-fork-pr-workflows-settings-repository";
import { actionsActionsGetRepoActionsPolicies } from "./get-repo-actions-policies";
import { actionsActionsGetRepoActionsPolicy } from "./get-repo-actions-policy";
import { actionsActionsGetRepoPublicKey } from "./get-repo-public-key";
import { actionsActionsGetRepoSecret } from "./get-repo-secret";
import { actionsActionsGetRepoVariable } from "./get-repo-variable";
import { actionsActionsGetReviewsForRun } from "./get-reviews-for-run";
import { actionsActionsGetRunnerVersionDeprecationForOrg } from "./get-runner-version-deprecation-for-org";
import { actionsActionsGetRunnerVersionDeprecationForRepo } from "./get-runner-version-deprecation-for-repo";
import { actionsActionsGetSelfHostedRunnerForOrg } from "./get-self-hosted-runner-for-org";
import { actionsActionsGetSelfHostedRunnerForRepo } from "./get-self-hosted-runner-for-repo";
import { actionsActionsGetSelfHostedRunnerGroupForOrg } from "./get-self-hosted-runner-group-for-org";
import { actionsActionsGetSelfHostedRunnersPermissionsOrganization } from "./get-self-hosted-runners-permissions-organization";
import { actionsActionsGetWorkflow } from "./get-workflow";
import { actionsActionsGetWorkflowAccessToRepository } from "./get-workflow-access-to-repository";
import { actionsActionsGetWorkflowRun } from "./get-workflow-run";
import { actionsActionsGetWorkflowRunAttempt } from "./get-workflow-run-attempt";
import { actionsActionsGetWorkflowRunUsage } from "./get-workflow-run-usage";
import { actionsActionsGetWorkflowUsage } from "./get-workflow-usage";
import { actionsActionsListArtifactsForRepo } from "./list-artifacts-for-repo";
import { actionsActionsListConcurrencyGroupsForRepository } from "./list-concurrency-groups-for-repository";
import { actionsActionsListConcurrencyGroupsForWorkflowRun } from "./list-concurrency-groups-for-workflow-run";
import { actionsActionsListCustomImageVersionsForOrg } from "./list-custom-image-versions-for-org";
import { actionsActionsListCustomImagesForOrg } from "./list-custom-images-for-org";
import { actionsActionsListEnvironmentSecrets } from "./list-environment-secrets";
import { actionsActionsListEnvironmentVariables } from "./list-environment-variables";
import { actionsActionsListGithubHostedRunnersInGroupForOrg } from "./list-github-hosted-runners-in-group-for-org";
import { actionsActionsListHostedRunnersForOrg } from "./list-hosted-runners-for-org";
import { actionsActionsListJobsForWorkflowRun } from "./list-jobs-for-workflow-run";
import { actionsActionsListJobsForWorkflowRunAttempt } from "./list-jobs-for-workflow-run-attempt";
import { actionsActionsListLabelsForSelfHostedRunnerForOrg } from "./list-labels-for-self-hosted-runner-for-org";
import { actionsActionsListLabelsForSelfHostedRunnerForRepo } from "./list-labels-for-self-hosted-runner-for-repo";
import { actionsActionsListOrgSecrets } from "./list-org-secrets";
import { actionsActionsListOrgVariables } from "./list-org-variables";
import { actionsActionsListRepoAccessToSelfHostedRunnerGroupInOrg } from "./list-repo-access-to-self-hosted-runner-group-in-org";
import { actionsActionsListRepoOrganizationSecrets } from "./list-repo-organization-secrets";
import { actionsActionsListRepoOrganizationVariables } from "./list-repo-organization-variables";
import { actionsActionsListRepoSecrets } from "./list-repo-secrets";
import { actionsActionsListRepoVariables } from "./list-repo-variables";
import { actionsActionsListRepoWorkflows } from "./list-repo-workflows";
import { actionsActionsListRunnerApplicationsForOrg } from "./list-runner-applications-for-org";
import { actionsActionsListRunnerApplicationsForRepo } from "./list-runner-applications-for-repo";
import { actionsActionsListSelectedReposForOrgSecret } from "./list-selected-repos-for-org-secret";
import { actionsActionsListSelectedReposForOrgVariable } from "./list-selected-repos-for-org-variable";
import { actionsActionsListSelectedRepositoriesEnabledGithubActionsOrganization } from "./list-selected-repositories-enabled-github-actions-organization";
import { actionsActionsListSelectedRepositoriesSelfHostedRunnersOrganization } from "./list-selected-repositories-self-hosted-runners-organization";
import { actionsActionsListSelfHostedRunnerGroupsForOrg } from "./list-self-hosted-runner-groups-for-org";
import { actionsActionsListSelfHostedRunnersForOrg } from "./list-self-hosted-runners-for-org";
import { actionsActionsListSelfHostedRunnersForRepo } from "./list-self-hosted-runners-for-repo";
import { actionsActionsListSelfHostedRunnersInGroupForOrg } from "./list-self-hosted-runners-in-group-for-org";
import { actionsActionsListWorkflowRunArtifacts } from "./list-workflow-run-artifacts";
import { actionsActionsListWorkflowRuns } from "./list-workflow-runs";
import { actionsActionsListWorkflowRunsForRepo } from "./list-workflow-runs-for-repo";
import { actionsActionsReRunJobForWorkflowRun } from "./re-run-job-for-workflow-run";
import { actionsActionsReRunWorkflow } from "./re-run-workflow";
import { actionsActionsReRunWorkflowFailedJobs } from "./re-run-workflow-failed-jobs";
import { actionsActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg } from "./remove-all-custom-labels-from-self-hosted-runner-for-org";
import { actionsActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo } from "./remove-all-custom-labels-from-self-hosted-runner-for-repo";
import { actionsActionsRemoveCustomLabelFromSelfHostedRunnerForOrg } from "./remove-custom-label-from-self-hosted-runner-for-org";
import { actionsActionsRemoveCustomLabelFromSelfHostedRunnerForRepo } from "./remove-custom-label-from-self-hosted-runner-for-repo";
import { actionsActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg } from "./remove-repo-access-to-self-hosted-runner-group-in-org";
import { actionsActionsRemoveSelectedRepoFromOrgSecret } from "./remove-selected-repo-from-org-secret";
import { actionsActionsRemoveSelectedRepoFromOrgVariable } from "./remove-selected-repo-from-org-variable";
import { actionsActionsRemoveSelfHostedRunnerFromGroupForOrg } from "./remove-self-hosted-runner-from-group-for-org";
import { actionsActionsReviewCustomGatesForRun } from "./review-custom-gates-for-run";
import { actionsActionsReviewPendingDeploymentsForRun } from "./review-pending-deployments-for-run";
import { actionsActionsSetActionsCacheRetentionLimitForEnterprise } from "./set-actions-cache-retention-limit-for-enterprise";
import { actionsActionsSetActionsCacheRetentionLimitForOrganization } from "./set-actions-cache-retention-limit-for-organization";
import { actionsActionsSetActionsCacheRetentionLimitForRepository } from "./set-actions-cache-retention-limit-for-repository";
import { actionsActionsSetActionsCacheStorageLimitForEnterprise } from "./set-actions-cache-storage-limit-for-enterprise";
import { actionsActionsSetActionsCacheStorageLimitForOrganization } from "./set-actions-cache-storage-limit-for-organization";
import { actionsActionsSetActionsCacheStorageLimitForRepository } from "./set-actions-cache-storage-limit-for-repository";
import { actionsActionsSetAllowedActionsOrganization } from "./set-allowed-actions-organization";
import { actionsActionsSetAllowedActionsRepository } from "./set-allowed-actions-repository";
import { actionsActionsSetArtifactAndLogRetentionSettingsOrganization } from "./set-artifact-and-log-retention-settings-organization";
import { actionsActionsSetArtifactAndLogRetentionSettingsRepository } from "./set-artifact-and-log-retention-settings-repository";
import { actionsActionsSetCustomLabelsForSelfHostedRunnerForOrg } from "./set-custom-labels-for-self-hosted-runner-for-org";
import { actionsActionsSetCustomLabelsForSelfHostedRunnerForRepo } from "./set-custom-labels-for-self-hosted-runner-for-repo";
import { actionsActionsSetCustomOidcSubClaimForRepo } from "./set-custom-oidc-sub-claim-for-repo";
import { actionsActionsSetForkPrContributorApprovalPermissionsOrganization } from "./set-fork-pr-contributor-approval-permissions-organization";
import { actionsActionsSetForkPrContributorApprovalPermissionsRepository } from "./set-fork-pr-contributor-approval-permissions-repository";
import { actionsActionsSetGithubActionsDefaultWorkflowPermissionsOrganization } from "./set-github-actions-default-workflow-permissions-organization";
import { actionsActionsSetGithubActionsDefaultWorkflowPermissionsRepository } from "./set-github-actions-default-workflow-permissions-repository";
import { actionsActionsSetGithubActionsPermissionsOrganization } from "./set-github-actions-permissions-organization";
import { actionsActionsSetGithubActionsPermissionsRepository } from "./set-github-actions-permissions-repository";
import { actionsActionsSetPrivateRepoForkPrWorkflowsSettingsOrganization } from "./set-private-repo-fork-pr-workflows-settings-organization";
import { actionsActionsSetPrivateRepoForkPrWorkflowsSettingsRepository } from "./set-private-repo-fork-pr-workflows-settings-repository";
import { actionsActionsSetRepoAccessToSelfHostedRunnerGroupInOrg } from "./set-repo-access-to-self-hosted-runner-group-in-org";
import { actionsActionsSetSelectedReposForOrgSecret } from "./set-selected-repos-for-org-secret";
import { actionsActionsSetSelectedReposForOrgVariable } from "./set-selected-repos-for-org-variable";
import { actionsActionsSetSelectedRepositoriesEnabledGithubActionsOrganization } from "./set-selected-repositories-enabled-github-actions-organization";
import { actionsActionsSetSelectedRepositoriesSelfHostedRunnersOrganization } from "./set-selected-repositories-self-hosted-runners-organization";
import { actionsActionsSetSelfHostedRunnersInGroupForOrg } from "./set-self-hosted-runners-in-group-for-org";
import { actionsActionsSetSelfHostedRunnersPermissionsOrganization } from "./set-self-hosted-runners-permissions-organization";
import { actionsActionsSetWorkflowAccessToRepository } from "./set-workflow-access-to-repository";
import { actionsActionsUpdateEnvironmentVariable } from "./update-environment-variable";
import { actionsActionsUpdateHostedRunnerForOrg } from "./update-hosted-runner-for-org";
import { actionsActionsUpdateOrgActionsPolicy } from "./update-org-actions-policy";
import { actionsActionsUpdateOrgVariable } from "./update-org-variable";
import { actionsActionsUpdateRepoActionsPolicy } from "./update-repo-actions-policy";
import { actionsActionsUpdateRepoVariable } from "./update-repo-variable";
import { actionsActionsUpdateSelfHostedRunnerGroupForOrg } from "./update-self-hosted-runner-group-for-org";

export const actionsActionsTools = [
  actionsActionsAddCustomLabelsToSelfHostedRunnerForOrg,
  actionsActionsAddCustomLabelsToSelfHostedRunnerForRepo,
  actionsActionsAddRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsActionsAddSelectedRepoToOrgSecret,
  actionsActionsAddSelectedRepoToOrgVariable,
  actionsActionsAddSelfHostedRunnerToGroupForOrg,
  actionsActionsApproveWorkflowRun,
  actionsActionsCancelWorkflowRun,
  actionsActionsCreateEnvironmentVariable,
  actionsActionsCreateHostedRunnerForOrg,
  actionsActionsCreateOrUpdateEnvironmentSecret,
  actionsActionsCreateOrUpdateOrgSecret,
  actionsActionsCreateOrUpdateRepoSecret,
  actionsActionsCreateOrgActionsPolicy,
  actionsActionsCreateOrgVariable,
  actionsActionsCreateRegistrationTokenForOrg,
  actionsActionsCreateRegistrationTokenForRepo,
  actionsActionsCreateRemoveTokenForOrg,
  actionsActionsCreateRemoveTokenForRepo,
  actionsActionsCreateRepoActionsPolicy,
  actionsActionsCreateRepoVariable,
  actionsActionsCreateSelfHostedRunnerGroupForOrg,
  actionsActionsCreateWorkflowDispatch,
  actionsActionsDeleteActionsCacheById,
  actionsActionsDeleteActionsCacheByKey,
  actionsActionsDeleteArtifact,
  actionsActionsDeleteCustomImageFromOrg,
  actionsActionsDeleteCustomImageVersionFromOrg,
  actionsActionsDeleteEnvironmentSecret,
  actionsActionsDeleteEnvironmentVariable,
  actionsActionsDeleteHostedRunnerForOrg,
  actionsActionsDeleteOrgActionsPolicy,
  actionsActionsDeleteOrgSecret,
  actionsActionsDeleteOrgVariable,
  actionsActionsDeleteRepoActionsPolicy,
  actionsActionsDeleteRepoSecret,
  actionsActionsDeleteRepoVariable,
  actionsActionsDeleteSelfHostedRunnerFromOrg,
  actionsActionsDeleteSelfHostedRunnerFromRepo,
  actionsActionsDeleteSelfHostedRunnerGroupFromOrg,
  actionsActionsDeleteWorkflowRun,
  actionsActionsDeleteWorkflowRunLogs,
  actionsActionsDisableSelectedRepositoryGithubActionsOrganization,
  actionsActionsDisableSelectedRepositorySelfHostedRunnersOrganization,
  actionsActionsDisableWorkflow,
  actionsActionsDownloadArtifact,
  actionsActionsDownloadJobLogsForWorkflowRun,
  actionsActionsDownloadStepLogsForWorkflowRunJob,
  actionsActionsDownloadWorkflowRunAttemptLogs,
  actionsActionsDownloadWorkflowRunLogs,
  actionsActionsEnableSelectedRepositoryGithubActionsOrganization,
  actionsActionsEnableSelectedRepositorySelfHostedRunnersOrganization,
  actionsActionsEnableWorkflow,
  actionsActionsForceCancelWorkflowRun,
  actionsActionsGenerateRunnerJitconfigForOrg,
  actionsActionsGenerateRunnerJitconfigForRepo,
  actionsActionsGetActionsCacheList,
  actionsActionsGetActionsCacheRetentionLimitForEnterprise,
  actionsActionsGetActionsCacheRetentionLimitForOrganization,
  actionsActionsGetActionsCacheRetentionLimitForRepository,
  actionsActionsGetActionsCacheStorageLimitForEnterprise,
  actionsActionsGetActionsCacheStorageLimitForOrganization,
  actionsActionsGetActionsCacheStorageLimitForRepository,
  actionsActionsGetActionsCacheUsage,
  actionsActionsGetActionsCacheUsageByRepoForOrg,
  actionsActionsGetActionsCacheUsageForOrg,
  actionsActionsGetAllowedActionsOrganization,
  actionsActionsGetAllowedActionsRepository,
  actionsActionsGetArtifact,
  actionsActionsGetArtifactAndLogRetentionSettingsOrganization,
  actionsActionsGetArtifactAndLogRetentionSettingsRepository,
  actionsActionsGetConcurrencyGroupForRepository,
  actionsActionsGetCustomImageForOrg,
  actionsActionsGetCustomImageVersionForOrg,
  actionsActionsGetCustomOidcSubClaimForRepo,
  actionsActionsGetEnvironmentPublicKey,
  actionsActionsGetEnvironmentSecret,
  actionsActionsGetEnvironmentVariable,
  actionsActionsGetForkPrContributorApprovalPermissionsOrganization,
  actionsActionsGetForkPrContributorApprovalPermissionsRepository,
  actionsActionsGetGithubActionsDefaultWorkflowPermissionsOrganization,
  actionsActionsGetGithubActionsDefaultWorkflowPermissionsRepository,
  actionsActionsGetGithubActionsPermissionsOrganization,
  actionsActionsGetGithubActionsPermissionsRepository,
  actionsActionsGetHostedRunnerForOrg,
  actionsActionsGetHostedRunnersGithubOwnedImagesForOrg,
  actionsActionsGetHostedRunnersLimitsForOrg,
  actionsActionsGetHostedRunnersMachineSpecsForOrg,
  actionsActionsGetHostedRunnersPartnerImagesForOrg,
  actionsActionsGetHostedRunnersPlatformsForOrg,
  actionsActionsGetJobForWorkflowRun,
  actionsActionsGetOrgActionsPolicies,
  actionsActionsGetOrgActionsPolicy,
  actionsActionsGetOrgPublicKey,
  actionsActionsGetOrgSecret,
  actionsActionsGetOrgVariable,
  actionsActionsGetPendingDeploymentsForRun,
  actionsActionsGetPrivateRepoForkPrWorkflowsSettingsOrganization,
  actionsActionsGetPrivateRepoForkPrWorkflowsSettingsRepository,
  actionsActionsGetRepoActionsPolicies,
  actionsActionsGetRepoActionsPolicy,
  actionsActionsGetRepoPublicKey,
  actionsActionsGetRepoSecret,
  actionsActionsGetRepoVariable,
  actionsActionsGetReviewsForRun,
  actionsActionsGetRunnerVersionDeprecationForOrg,
  actionsActionsGetRunnerVersionDeprecationForRepo,
  actionsActionsGetSelfHostedRunnerForOrg,
  actionsActionsGetSelfHostedRunnerForRepo,
  actionsActionsGetSelfHostedRunnerGroupForOrg,
  actionsActionsGetSelfHostedRunnersPermissionsOrganization,
  actionsActionsGetWorkflow,
  actionsActionsGetWorkflowAccessToRepository,
  actionsActionsGetWorkflowRun,
  actionsActionsGetWorkflowRunAttempt,
  actionsActionsGetWorkflowRunUsage,
  actionsActionsGetWorkflowUsage,
  actionsActionsListArtifactsForRepo,
  actionsActionsListConcurrencyGroupsForRepository,
  actionsActionsListConcurrencyGroupsForWorkflowRun,
  actionsActionsListCustomImageVersionsForOrg,
  actionsActionsListCustomImagesForOrg,
  actionsActionsListEnvironmentSecrets,
  actionsActionsListEnvironmentVariables,
  actionsActionsListGithubHostedRunnersInGroupForOrg,
  actionsActionsListHostedRunnersForOrg,
  actionsActionsListJobsForWorkflowRun,
  actionsActionsListJobsForWorkflowRunAttempt,
  actionsActionsListLabelsForSelfHostedRunnerForOrg,
  actionsActionsListLabelsForSelfHostedRunnerForRepo,
  actionsActionsListOrgSecrets,
  actionsActionsListOrgVariables,
  actionsActionsListRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsActionsListRepoOrganizationSecrets,
  actionsActionsListRepoOrganizationVariables,
  actionsActionsListRepoSecrets,
  actionsActionsListRepoVariables,
  actionsActionsListRepoWorkflows,
  actionsActionsListRunnerApplicationsForOrg,
  actionsActionsListRunnerApplicationsForRepo,
  actionsActionsListSelectedReposForOrgSecret,
  actionsActionsListSelectedReposForOrgVariable,
  actionsActionsListSelectedRepositoriesEnabledGithubActionsOrganization,
  actionsActionsListSelectedRepositoriesSelfHostedRunnersOrganization,
  actionsActionsListSelfHostedRunnerGroupsForOrg,
  actionsActionsListSelfHostedRunnersForOrg,
  actionsActionsListSelfHostedRunnersForRepo,
  actionsActionsListSelfHostedRunnersInGroupForOrg,
  actionsActionsListWorkflowRunArtifacts,
  actionsActionsListWorkflowRuns,
  actionsActionsListWorkflowRunsForRepo,
  actionsActionsReRunJobForWorkflowRun,
  actionsActionsReRunWorkflow,
  actionsActionsReRunWorkflowFailedJobs,
  actionsActionsRemoveAllCustomLabelsFromSelfHostedRunnerForOrg,
  actionsActionsRemoveAllCustomLabelsFromSelfHostedRunnerForRepo,
  actionsActionsRemoveCustomLabelFromSelfHostedRunnerForOrg,
  actionsActionsRemoveCustomLabelFromSelfHostedRunnerForRepo,
  actionsActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsActionsRemoveSelectedRepoFromOrgSecret,
  actionsActionsRemoveSelectedRepoFromOrgVariable,
  actionsActionsRemoveSelfHostedRunnerFromGroupForOrg,
  actionsActionsReviewCustomGatesForRun,
  actionsActionsReviewPendingDeploymentsForRun,
  actionsActionsSetActionsCacheRetentionLimitForEnterprise,
  actionsActionsSetActionsCacheRetentionLimitForOrganization,
  actionsActionsSetActionsCacheRetentionLimitForRepository,
  actionsActionsSetActionsCacheStorageLimitForEnterprise,
  actionsActionsSetActionsCacheStorageLimitForOrganization,
  actionsActionsSetActionsCacheStorageLimitForRepository,
  actionsActionsSetAllowedActionsOrganization,
  actionsActionsSetAllowedActionsRepository,
  actionsActionsSetArtifactAndLogRetentionSettingsOrganization,
  actionsActionsSetArtifactAndLogRetentionSettingsRepository,
  actionsActionsSetCustomLabelsForSelfHostedRunnerForOrg,
  actionsActionsSetCustomLabelsForSelfHostedRunnerForRepo,
  actionsActionsSetCustomOidcSubClaimForRepo,
  actionsActionsSetForkPrContributorApprovalPermissionsOrganization,
  actionsActionsSetForkPrContributorApprovalPermissionsRepository,
  actionsActionsSetGithubActionsDefaultWorkflowPermissionsOrganization,
  actionsActionsSetGithubActionsDefaultWorkflowPermissionsRepository,
  actionsActionsSetGithubActionsPermissionsOrganization,
  actionsActionsSetGithubActionsPermissionsRepository,
  actionsActionsSetPrivateRepoForkPrWorkflowsSettingsOrganization,
  actionsActionsSetPrivateRepoForkPrWorkflowsSettingsRepository,
  actionsActionsSetRepoAccessToSelfHostedRunnerGroupInOrg,
  actionsActionsSetSelectedReposForOrgSecret,
  actionsActionsSetSelectedReposForOrgVariable,
  actionsActionsSetSelectedRepositoriesEnabledGithubActionsOrganization,
  actionsActionsSetSelectedRepositoriesSelfHostedRunnersOrganization,
  actionsActionsSetSelfHostedRunnersInGroupForOrg,
  actionsActionsSetSelfHostedRunnersPermissionsOrganization,
  actionsActionsSetWorkflowAccessToRepository,
  actionsActionsUpdateEnvironmentVariable,
  actionsActionsUpdateHostedRunnerForOrg,
  actionsActionsUpdateOrgActionsPolicy,
  actionsActionsUpdateOrgVariable,
  actionsActionsUpdateRepoActionsPolicy,
  actionsActionsUpdateRepoVariable,
  actionsActionsUpdateSelfHostedRunnerGroupForOrg,
];
