import { reposAcceptInvitationForAuthenticatedUser } from './accept-invitation-for-authenticated-user';
import { reposAddAppAccessRestrictions } from './add-app-access-restrictions';
import { reposAddCollaborator } from './add-collaborator';
import { reposAddStatusCheckContexts } from './add-status-check-contexts';
import { reposAddTeamAccessRestrictions } from './add-team-access-restrictions';
import { reposAddUserAccessRestrictions } from './add-user-access-restrictions';
import { reposCancelPagesDeployment } from './cancel-pages-deployment';
import { reposCheckAutomatedSecurityFixes } from './check-automated-security-fixes';
import { reposCheckCollaborator } from './check-collaborator';
import { reposCheckImmutableReleases } from './check-immutable-releases';
import { reposCheckPrivateVulnerabilityReporting } from './check-private-vulnerability-reporting';
import { reposCheckVulnerabilityAlerts } from './check-vulnerability-alerts';
import { reposCodeownersErrors } from './codeowners-errors';
import { reposCompareCommits } from './compare-commits';
import { reposCreateAttestation } from './create-attestation';
import { reposCreateAutolink } from './create-autolink';
import { reposCreateCommitComment } from './create-commit-comment';
import { reposCreateCommitSignatureProtection } from './create-commit-signature-protection';
import { reposCreateCommitStatus } from './create-commit-status';
import { reposCreateDeployKey } from './create-deploy-key';
import { reposCreateDeployment } from './create-deployment';
import { reposCreateDeploymentBranchPolicy } from './create-deployment-branch-policy';
import { reposCreateDeploymentProtectionRule } from './create-deployment-protection-rule';
import { reposCreateDeploymentStatus } from './create-deployment-status';
import { reposCreateDispatchEvent } from './create-dispatch-event';
import { reposCreateForAuthenticatedUser } from './create-for-authenticated-user';
import { reposCreateFork } from './create-fork';
import { reposCreateInOrg } from './create-in-org';
import { reposCreateOrUpdateEnvironment } from './create-or-update-environment';
import { reposCreateOrUpdateFileContents } from './create-or-update-file-contents';
import { reposCreatePagesDeployment } from './create-pages-deployment';
import { reposCreatePagesSite } from './create-pages-site';
import { reposCreateRelease } from './create-release';
import { reposCreateRepoRuleset } from './create-repo-ruleset';
import { reposCreateUsingTemplate } from './create-using-template';
import { reposCreateWebhook } from './create-webhook';
import { reposCustomPropertiesForReposCreateOrUpdateRepositoryValues } from './custom-properties-for-repos-create-or-update-repository-values';
import { reposCustomPropertiesForReposGetRepositoryValues } from './custom-properties-for-repos-get-repository-values';
import { reposDeclineInvitationForAuthenticatedUser } from './decline-invitation-for-authenticated-user';
import { reposDelete } from './delete';
import { reposDeleteAccessRestrictions } from './delete-access-restrictions';
import { reposDeleteAdminBranchProtection } from './delete-admin-branch-protection';
import { reposDeleteAnEnvironment } from './delete-an-environment';
import { reposDeleteAutolink } from './delete-autolink';
import { reposDeleteBranchProtection } from './delete-branch-protection';
import { reposDeleteCommitComment } from './delete-commit-comment';
import { reposDeleteCommitSignatureProtection } from './delete-commit-signature-protection';
import { reposDeleteDeployKey } from './delete-deploy-key';
import { reposDeleteDeployment } from './delete-deployment';
import { reposDeleteDeploymentBranchPolicy } from './delete-deployment-branch-policy';
import { reposDeleteFile } from './delete-file';
import { reposDeleteInvitation } from './delete-invitation';
import { reposDeletePagesSite } from './delete-pages-site';
import { reposDeletePullRequestReviewProtection } from './delete-pull-request-review-protection';
import { reposDeleteRelease } from './delete-release';
import { reposDeleteReleaseAsset } from './delete-release-asset';
import { reposDeleteRepoRuleset } from './delete-repo-ruleset';
import { reposDeleteWebhook } from './delete-webhook';
import { reposDisableAutomatedSecurityFixes } from './disable-automated-security-fixes';
import { reposDisableDeploymentProtectionRule } from './disable-deployment-protection-rule';
import { reposDisableImmutableReleases } from './disable-immutable-releases';
import { reposDisablePrivateVulnerabilityReporting } from './disable-private-vulnerability-reporting';
import { reposDisableVulnerabilityAlerts } from './disable-vulnerability-alerts';
import { reposDownloadTarballArchive } from './download-tarball-archive';
import { reposDownloadZipballArchive } from './download-zipball-archive';
import { reposEnableAutomatedSecurityFixes } from './enable-automated-security-fixes';
import { reposEnableImmutableReleases } from './enable-immutable-releases';
import { reposEnablePrivateVulnerabilityReporting } from './enable-private-vulnerability-reporting';
import { reposEnableVulnerabilityAlerts } from './enable-vulnerability-alerts';
import { reposGenerateReleaseNotes } from './generate-release-notes';
import { reposGet } from './get';
import { reposGetAccessRestrictions } from './get-access-restrictions';
import { reposGetAdminBranchProtection } from './get-admin-branch-protection';
import { reposGetAllDeploymentProtectionRules } from './get-all-deployment-protection-rules';
import { reposGetAllEnvironments } from './get-all-environments';
import { reposGetAllStatusCheckContexts } from './get-all-status-check-contexts';
import { reposGetAllTopics } from './get-all-topics';
import { reposGetAppsWithAccessToProtectedBranch } from './get-apps-with-access-to-protected-branch';
import { reposGetAutolink } from './get-autolink';
import { reposGetBranch } from './get-branch';
import { reposGetBranchProtection } from './get-branch-protection';
import { reposGetBranchRules } from './get-branch-rules';
import { reposGetClones } from './get-clones';
import { reposGetCodeFrequencyStats } from './get-code-frequency-stats';
import { reposGetCollaboratorPermissionLevel } from './get-collaborator-permission-level';
import { reposGetCombinedStatusForRef } from './get-combined-status-for-ref';
import { reposGetCommit } from './get-commit';
import { reposGetCommitActivityStats } from './get-commit-activity-stats';
import { reposGetCommitComment } from './get-commit-comment';
import { reposGetCommitSignatureProtection } from './get-commit-signature-protection';
import { reposGetCommunityProfileMetrics } from './get-community-profile-metrics';
import { reposGetContent } from './get-content';
import { reposGetContributorsStats } from './get-contributors-stats';
import { reposGetCustomDeploymentProtectionRule } from './get-custom-deployment-protection-rule';
import { reposGetDeployKey } from './get-deploy-key';
import { reposGetDeployment } from './get-deployment';
import { reposGetDeploymentBranchPolicy } from './get-deployment-branch-policy';
import { reposGetDeploymentStatus } from './get-deployment-status';
import { reposGetEnvironment } from './get-environment';
import { reposGetHashAlgorithm } from './get-hash-algorithm';
import { reposGetLatestPagesBuild } from './get-latest-pages-build';
import { reposGetLatestRelease } from './get-latest-release';
import { reposGetPages } from './get-pages';
import { reposGetPagesBuild } from './get-pages-build';
import { reposGetPagesDeployment } from './get-pages-deployment';
import { reposGetPagesHealthCheck } from './get-pages-health-check';
import { reposGetParticipationStats } from './get-participation-stats';
import { reposGetPullRequestReviewProtection } from './get-pull-request-review-protection';
import { reposGetPunchCardStats } from './get-punch-card-stats';
import { reposGetReadme } from './get-readme';
import { reposGetReadmeInDirectory } from './get-readme-in-directory';
import { reposGetRelease } from './get-release';
import { reposGetReleaseAsset } from './get-release-asset';
import { reposGetReleaseByTag } from './get-release-by-tag';
import { reposGetRepoRuleSuite } from './get-repo-rule-suite';
import { reposGetRepoRuleSuites } from './get-repo-rule-suites';
import { reposGetRepoRuleset } from './get-repo-ruleset';
import { reposGetRepoRulesetHistory } from './get-repo-ruleset-history';
import { reposGetRepoRulesetVersion } from './get-repo-ruleset-version';
import { reposGetRepoRulesets } from './get-repo-rulesets';
import { reposGetStatusChecksProtection } from './get-status-checks-protection';
import { reposGetTeamsWithAccessToProtectedBranch } from './get-teams-with-access-to-protected-branch';
import { reposGetTopPaths } from './get-top-paths';
import { reposGetTopReferrers } from './get-top-referrers';
import { reposGetUsersWithAccessToProtectedBranch } from './get-users-with-access-to-protected-branch';
import { reposGetViews } from './get-views';
import { reposGetWebhook } from './get-webhook';
import { reposGetWebhookConfigForRepo } from './get-webhook-config-for-repo';
import { reposGetWebhookDelivery } from './get-webhook-delivery';
import { reposListActivities } from './list-activities';
import { reposListAttestations } from './list-attestations';
import { reposListAutolinks } from './list-autolinks';
import { reposListBranches } from './list-branches';
import { reposListBranchesForHeadCommit } from './list-branches-for-head-commit';
import { reposListCollaborators } from './list-collaborators';
import { reposListCommentsForCommit } from './list-comments-for-commit';
import { reposListCommitCommentsForRepo } from './list-commit-comments-for-repo';
import { reposListCommitStatusesForRef } from './list-commit-statuses-for-ref';
import { reposListCommits } from './list-commits';
import { reposListContributors } from './list-contributors';
import { reposListCustomDeploymentRuleIntegrations } from './list-custom-deployment-rule-integrations';
import { reposListDeployKeys } from './list-deploy-keys';
import { reposListDeploymentBranchPolicies } from './list-deployment-branch-policies';
import { reposListDeploymentStatuses } from './list-deployment-statuses';
import { reposListDeployments } from './list-deployments';
import { reposListForAuthenticatedUser } from './list-for-authenticated-user';
import { reposListForOrg } from './list-for-org';
import { reposListForUser } from './list-for-user';
import { reposListForks } from './list-forks';
import { reposListInvitations } from './list-invitations';
import { reposListInvitationsForAuthenticatedUser } from './list-invitations-for-authenticated-user';
import { reposListIssueTypes } from './list-issue-types';
import { reposListLanguages } from './list-languages';
import { reposListPagesBuilds } from './list-pages-builds';
import { reposListPublic } from './list-public';
import { reposListPullRequestsAssociatedWithCommit } from './list-pull-requests-associated-with-commit';
import { reposListReleaseAssets } from './list-release-assets';
import { reposListReleases } from './list-releases';
import { reposListTags } from './list-tags';
import { reposListTeams } from './list-teams';
import { reposListWebhookDeliveries } from './list-webhook-deliveries';
import { reposListWebhooks } from './list-webhooks';
import { reposMerge } from './merge';
import { reposMergeUpstream } from './merge-upstream';
import { reposPingWebhook } from './ping-webhook';
import { reposRedeliverWebhookDelivery } from './redeliver-webhook-delivery';
import { reposRemoveAppAccessRestrictions } from './remove-app-access-restrictions';
import { reposRemoveCollaborator } from './remove-collaborator';
import { reposRemoveStatusCheckContexts } from './remove-status-check-contexts';
import { reposRemoveStatusCheckProtection } from './remove-status-check-protection';
import { reposRemoveTeamAccessRestrictions } from './remove-team-access-restrictions';
import { reposRemoveUserAccessRestrictions } from './remove-user-access-restrictions';
import { reposRenameBranch } from './rename-branch';
import { reposReplaceAllTopics } from './replace-all-topics';
import { reposRequestPagesBuild } from './request-pages-build';
import { reposSetAdminBranchProtection } from './set-admin-branch-protection';
import { reposSetAppAccessRestrictions } from './set-app-access-restrictions';
import { reposSetStatusCheckContexts } from './set-status-check-contexts';
import { reposSetTeamAccessRestrictions } from './set-team-access-restrictions';
import { reposSetUserAccessRestrictions } from './set-user-access-restrictions';
import { reposTestPushWebhook } from './test-push-webhook';
import { reposTransfer } from './transfer';
import { reposUpdate } from './update';
import { reposUpdateBranchProtection } from './update-branch-protection';
import { reposUpdateCommitComment } from './update-commit-comment';
import { reposUpdateDeploymentBranchPolicy } from './update-deployment-branch-policy';
import { reposUpdateInformationAboutPagesSite } from './update-information-about-pages-site';
import { reposUpdateInvitation } from './update-invitation';
import { reposUpdatePullRequestReviewProtection } from './update-pull-request-review-protection';
import { reposUpdateRelease } from './update-release';
import { reposUpdateReleaseAsset } from './update-release-asset';
import { reposUpdateRepoRuleset } from './update-repo-ruleset';
import { reposUpdateStatusCheckProtection } from './update-status-check-protection';
import { reposUpdateWebhook } from './update-webhook';
import { reposUpdateWebhookConfigForRepo } from './update-webhook-config-for-repo';

export const reposTools = [
  reposAcceptInvitationForAuthenticatedUser,
  reposAddAppAccessRestrictions,
  reposAddCollaborator,
  reposAddStatusCheckContexts,
  reposAddTeamAccessRestrictions,
  reposAddUserAccessRestrictions,
  reposCancelPagesDeployment,
  reposCheckAutomatedSecurityFixes,
  reposCheckCollaborator,
  reposCheckImmutableReleases,
  reposCheckPrivateVulnerabilityReporting,
  reposCheckVulnerabilityAlerts,
  reposCodeownersErrors,
  reposCompareCommits,
  reposCreateAttestation,
  reposCreateAutolink,
  reposCreateCommitComment,
  reposCreateCommitSignatureProtection,
  reposCreateCommitStatus,
  reposCreateDeployKey,
  reposCreateDeployment,
  reposCreateDeploymentBranchPolicy,
  reposCreateDeploymentProtectionRule,
  reposCreateDeploymentStatus,
  reposCreateDispatchEvent,
  reposCreateForAuthenticatedUser,
  reposCreateFork,
  reposCreateInOrg,
  reposCreateOrUpdateEnvironment,
  reposCreateOrUpdateFileContents,
  reposCreatePagesDeployment,
  reposCreatePagesSite,
  reposCreateRelease,
  reposCreateRepoRuleset,
  reposCreateUsingTemplate,
  reposCreateWebhook,
  reposCustomPropertiesForReposCreateOrUpdateRepositoryValues,
  reposCustomPropertiesForReposGetRepositoryValues,
  reposDeclineInvitationForAuthenticatedUser,
  reposDelete,
  reposDeleteAccessRestrictions,
  reposDeleteAdminBranchProtection,
  reposDeleteAnEnvironment,
  reposDeleteAutolink,
  reposDeleteBranchProtection,
  reposDeleteCommitComment,
  reposDeleteCommitSignatureProtection,
  reposDeleteDeployKey,
  reposDeleteDeployment,
  reposDeleteDeploymentBranchPolicy,
  reposDeleteFile,
  reposDeleteInvitation,
  reposDeletePagesSite,
  reposDeletePullRequestReviewProtection,
  reposDeleteRelease,
  reposDeleteReleaseAsset,
  reposDeleteRepoRuleset,
  reposDeleteWebhook,
  reposDisableAutomatedSecurityFixes,
  reposDisableDeploymentProtectionRule,
  reposDisableImmutableReleases,
  reposDisablePrivateVulnerabilityReporting,
  reposDisableVulnerabilityAlerts,
  reposDownloadTarballArchive,
  reposDownloadZipballArchive,
  reposEnableAutomatedSecurityFixes,
  reposEnableImmutableReleases,
  reposEnablePrivateVulnerabilityReporting,
  reposEnableVulnerabilityAlerts,
  reposGenerateReleaseNotes,
  reposGet,
  reposGetAccessRestrictions,
  reposGetAdminBranchProtection,
  reposGetAllDeploymentProtectionRules,
  reposGetAllEnvironments,
  reposGetAllStatusCheckContexts,
  reposGetAllTopics,
  reposGetAppsWithAccessToProtectedBranch,
  reposGetAutolink,
  reposGetBranch,
  reposGetBranchProtection,
  reposGetBranchRules,
  reposGetClones,
  reposGetCodeFrequencyStats,
  reposGetCollaboratorPermissionLevel,
  reposGetCombinedStatusForRef,
  reposGetCommit,
  reposGetCommitActivityStats,
  reposGetCommitComment,
  reposGetCommitSignatureProtection,
  reposGetCommunityProfileMetrics,
  reposGetContent,
  reposGetContributorsStats,
  reposGetCustomDeploymentProtectionRule,
  reposGetDeployKey,
  reposGetDeployment,
  reposGetDeploymentBranchPolicy,
  reposGetDeploymentStatus,
  reposGetEnvironment,
  reposGetHashAlgorithm,
  reposGetLatestPagesBuild,
  reposGetLatestRelease,
  reposGetPages,
  reposGetPagesBuild,
  reposGetPagesDeployment,
  reposGetPagesHealthCheck,
  reposGetParticipationStats,
  reposGetPullRequestReviewProtection,
  reposGetPunchCardStats,
  reposGetReadme,
  reposGetReadmeInDirectory,
  reposGetRelease,
  reposGetReleaseAsset,
  reposGetReleaseByTag,
  reposGetRepoRuleSuite,
  reposGetRepoRuleSuites,
  reposGetRepoRuleset,
  reposGetRepoRulesetHistory,
  reposGetRepoRulesetVersion,
  reposGetRepoRulesets,
  reposGetStatusChecksProtection,
  reposGetTeamsWithAccessToProtectedBranch,
  reposGetTopPaths,
  reposGetTopReferrers,
  reposGetUsersWithAccessToProtectedBranch,
  reposGetViews,
  reposGetWebhook,
  reposGetWebhookConfigForRepo,
  reposGetWebhookDelivery,
  reposListActivities,
  reposListAttestations,
  reposListAutolinks,
  reposListBranches,
  reposListBranchesForHeadCommit,
  reposListCollaborators,
  reposListCommentsForCommit,
  reposListCommitCommentsForRepo,
  reposListCommitStatusesForRef,
  reposListCommits,
  reposListContributors,
  reposListCustomDeploymentRuleIntegrations,
  reposListDeployKeys,
  reposListDeploymentBranchPolicies,
  reposListDeploymentStatuses,
  reposListDeployments,
  reposListForAuthenticatedUser,
  reposListForOrg,
  reposListForUser,
  reposListForks,
  reposListInvitations,
  reposListInvitationsForAuthenticatedUser,
  reposListIssueTypes,
  reposListLanguages,
  reposListPagesBuilds,
  reposListPublic,
  reposListPullRequestsAssociatedWithCommit,
  reposListReleaseAssets,
  reposListReleases,
  reposListTags,
  reposListTeams,
  reposListWebhookDeliveries,
  reposListWebhooks,
  reposMerge,
  reposMergeUpstream,
  reposPingWebhook,
  reposRedeliverWebhookDelivery,
  reposRemoveAppAccessRestrictions,
  reposRemoveCollaborator,
  reposRemoveStatusCheckContexts,
  reposRemoveStatusCheckProtection,
  reposRemoveTeamAccessRestrictions,
  reposRemoveUserAccessRestrictions,
  reposRenameBranch,
  reposReplaceAllTopics,
  reposRequestPagesBuild,
  reposSetAdminBranchProtection,
  reposSetAppAccessRestrictions,
  reposSetStatusCheckContexts,
  reposSetTeamAccessRestrictions,
  reposSetUserAccessRestrictions,
  reposTestPushWebhook,
  reposTransfer,
  reposUpdate,
  reposUpdateBranchProtection,
  reposUpdateCommitComment,
  reposUpdateDeploymentBranchPolicy,
  reposUpdateInformationAboutPagesSite,
  reposUpdateInvitation,
  reposUpdatePullRequestReviewProtection,
  reposUpdateRelease,
  reposUpdateReleaseAsset,
  reposUpdateRepoRuleset,
  reposUpdateStatusCheckProtection,
  reposUpdateWebhook,
  reposUpdateWebhookConfigForRepo,
];
