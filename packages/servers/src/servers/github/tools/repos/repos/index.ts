import { reposReposAcceptInvitationForAuthenticatedUser } from './accept-invitation-for-authenticated-user';
import { reposReposAddAppAccessRestrictions } from './add-app-access-restrictions';
import { reposReposAddCollaborator } from './add-collaborator';
import { reposReposAddStatusCheckContexts } from './add-status-check-contexts';
import { reposReposAddTeamAccessRestrictions } from './add-team-access-restrictions';
import { reposReposAddUserAccessRestrictions } from './add-user-access-restrictions';
import { reposReposCancelPagesDeployment } from './cancel-pages-deployment';
import { reposReposCheckAutomatedSecurityFixes } from './check-automated-security-fixes';
import { reposReposCheckCollaborator } from './check-collaborator';
import { reposReposCheckImmutableReleases } from './check-immutable-releases';
import { reposReposCheckPrivateVulnerabilityReporting } from './check-private-vulnerability-reporting';
import { reposReposCheckVulnerabilityAlerts } from './check-vulnerability-alerts';
import { reposReposCodeownersErrors } from './codeowners-errors';
import { reposReposCompareCommits } from './compare-commits';
import { reposReposCreateAttestation } from './create-attestation';
import { reposReposCreateAutolink } from './create-autolink';
import { reposReposCreateCommitComment } from './create-commit-comment';
import { reposReposCreateCommitSignatureProtection } from './create-commit-signature-protection';
import { reposReposCreateCommitStatus } from './create-commit-status';
import { reposReposCreateDeployKey } from './create-deploy-key';
import { reposReposCreateDeployment } from './create-deployment';
import { reposReposCreateDeploymentBranchPolicy } from './create-deployment-branch-policy';
import { reposReposCreateDeploymentProtectionRule } from './create-deployment-protection-rule';
import { reposReposCreateDeploymentStatus } from './create-deployment-status';
import { reposReposCreateDispatchEvent } from './create-dispatch-event';
import { reposReposCreateForAuthenticatedUser } from './create-for-authenticated-user';
import { reposReposCreateFork } from './create-fork';
import { reposReposCreateInOrg } from './create-in-org';
import { reposReposCreateOrUpdateEnvironment } from './create-or-update-environment';
import { reposReposCreateOrUpdateFileContents } from './create-or-update-file-contents';
import { reposReposCreatePagesDeployment } from './create-pages-deployment';
import { reposReposCreatePagesSite } from './create-pages-site';
import { reposReposCreateRelease } from './create-release';
import { reposReposCreateRepoRuleset } from './create-repo-ruleset';
import { reposReposCreateUsingTemplate } from './create-using-template';
import { reposReposCreateWebhook } from './create-webhook';
import { reposReposCustomPropertiesForReposCreateOrUpdateRepositoryValues } from './custom-properties-for-repos-create-or-update-repository-values';
import { reposReposCustomPropertiesForReposGetRepositoryValues } from './custom-properties-for-repos-get-repository-values';
import { reposReposDeclineInvitationForAuthenticatedUser } from './decline-invitation-for-authenticated-user';
import { reposReposDelete } from './delete';
import { reposReposDeleteAccessRestrictions } from './delete-access-restrictions';
import { reposReposDeleteAdminBranchProtection } from './delete-admin-branch-protection';
import { reposReposDeleteAnEnvironment } from './delete-an-environment';
import { reposReposDeleteAutolink } from './delete-autolink';
import { reposReposDeleteBranchProtection } from './delete-branch-protection';
import { reposReposDeleteCommitComment } from './delete-commit-comment';
import { reposReposDeleteCommitSignatureProtection } from './delete-commit-signature-protection';
import { reposReposDeleteDeployKey } from './delete-deploy-key';
import { reposReposDeleteDeployment } from './delete-deployment';
import { reposReposDeleteDeploymentBranchPolicy } from './delete-deployment-branch-policy';
import { reposReposDeleteFile } from './delete-file';
import { reposReposDeleteInvitation } from './delete-invitation';
import { reposReposDeletePagesSite } from './delete-pages-site';
import { reposReposDeletePullRequestReviewProtection } from './delete-pull-request-review-protection';
import { reposReposDeleteRelease } from './delete-release';
import { reposReposDeleteReleaseAsset } from './delete-release-asset';
import { reposReposDeleteRepoRuleset } from './delete-repo-ruleset';
import { reposReposDeleteWebhook } from './delete-webhook';
import { reposReposDisableAutomatedSecurityFixes } from './disable-automated-security-fixes';
import { reposReposDisableDeploymentProtectionRule } from './disable-deployment-protection-rule';
import { reposReposDisableImmutableReleases } from './disable-immutable-releases';
import { reposReposDisablePrivateVulnerabilityReporting } from './disable-private-vulnerability-reporting';
import { reposReposDisableVulnerabilityAlerts } from './disable-vulnerability-alerts';
import { reposReposDownloadTarballArchive } from './download-tarball-archive';
import { reposReposDownloadZipballArchive } from './download-zipball-archive';
import { reposReposEnableAutomatedSecurityFixes } from './enable-automated-security-fixes';
import { reposReposEnableImmutableReleases } from './enable-immutable-releases';
import { reposReposEnablePrivateVulnerabilityReporting } from './enable-private-vulnerability-reporting';
import { reposReposEnableVulnerabilityAlerts } from './enable-vulnerability-alerts';
import { reposReposGenerateReleaseNotes } from './generate-release-notes';
import { reposReposGet } from './get';
import { reposReposGetAccessRestrictions } from './get-access-restrictions';
import { reposReposGetAdminBranchProtection } from './get-admin-branch-protection';
import { reposReposGetAllDeploymentProtectionRules } from './get-all-deployment-protection-rules';
import { reposReposGetAllEnvironments } from './get-all-environments';
import { reposReposGetAllStatusCheckContexts } from './get-all-status-check-contexts';
import { reposReposGetAllTopics } from './get-all-topics';
import { reposReposGetAppsWithAccessToProtectedBranch } from './get-apps-with-access-to-protected-branch';
import { reposReposGetAutolink } from './get-autolink';
import { reposReposGetBranch } from './get-branch';
import { reposReposGetBranchProtection } from './get-branch-protection';
import { reposReposGetBranchRules } from './get-branch-rules';
import { reposReposGetClones } from './get-clones';
import { reposReposGetCodeFrequencyStats } from './get-code-frequency-stats';
import { reposReposGetCollaboratorPermissionLevel } from './get-collaborator-permission-level';
import { reposReposGetCombinedStatusForRef } from './get-combined-status-for-ref';
import { reposReposGetCommit } from './get-commit';
import { reposReposGetCommitActivityStats } from './get-commit-activity-stats';
import { reposReposGetCommitComment } from './get-commit-comment';
import { reposReposGetCommitSignatureProtection } from './get-commit-signature-protection';
import { reposReposGetCommunityProfileMetrics } from './get-community-profile-metrics';
import { reposReposGetContent } from './get-content';
import { reposReposGetContributorsStats } from './get-contributors-stats';
import { reposReposGetCustomDeploymentProtectionRule } from './get-custom-deployment-protection-rule';
import { reposReposGetDeployKey } from './get-deploy-key';
import { reposReposGetDeployment } from './get-deployment';
import { reposReposGetDeploymentBranchPolicy } from './get-deployment-branch-policy';
import { reposReposGetDeploymentStatus } from './get-deployment-status';
import { reposReposGetEnvironment } from './get-environment';
import { reposReposGetHashAlgorithm } from './get-hash-algorithm';
import { reposReposGetLatestPagesBuild } from './get-latest-pages-build';
import { reposReposGetLatestRelease } from './get-latest-release';
import { reposReposGetPages } from './get-pages';
import { reposReposGetPagesBuild } from './get-pages-build';
import { reposReposGetPagesDeployment } from './get-pages-deployment';
import { reposReposGetPagesHealthCheck } from './get-pages-health-check';
import { reposReposGetParticipationStats } from './get-participation-stats';
import { reposReposGetPullRequestReviewProtection } from './get-pull-request-review-protection';
import { reposReposGetPunchCardStats } from './get-punch-card-stats';
import { reposReposGetReadme } from './get-readme';
import { reposReposGetReadmeInDirectory } from './get-readme-in-directory';
import { reposReposGetRelease } from './get-release';
import { reposReposGetReleaseAsset } from './get-release-asset';
import { reposReposGetReleaseByTag } from './get-release-by-tag';
import { reposReposGetRepoRuleSuite } from './get-repo-rule-suite';
import { reposReposGetRepoRuleSuites } from './get-repo-rule-suites';
import { reposReposGetRepoRuleset } from './get-repo-ruleset';
import { reposReposGetRepoRulesetHistory } from './get-repo-ruleset-history';
import { reposReposGetRepoRulesetVersion } from './get-repo-ruleset-version';
import { reposReposGetRepoRulesets } from './get-repo-rulesets';
import { reposReposGetStatusChecksProtection } from './get-status-checks-protection';
import { reposReposGetTeamsWithAccessToProtectedBranch } from './get-teams-with-access-to-protected-branch';
import { reposReposGetTopPaths } from './get-top-paths';
import { reposReposGetTopReferrers } from './get-top-referrers';
import { reposReposGetUsersWithAccessToProtectedBranch } from './get-users-with-access-to-protected-branch';
import { reposReposGetViews } from './get-views';
import { reposReposGetWebhook } from './get-webhook';
import { reposReposGetWebhookConfigForRepo } from './get-webhook-config-for-repo';
import { reposReposGetWebhookDelivery } from './get-webhook-delivery';
import { reposReposListActivities } from './list-activities';
import { reposReposListAttestations } from './list-attestations';
import { reposReposListAutolinks } from './list-autolinks';
import { reposReposListBranches } from './list-branches';
import { reposReposListBranchesForHeadCommit } from './list-branches-for-head-commit';
import { reposReposListCollaborators } from './list-collaborators';
import { reposReposListCommentsForCommit } from './list-comments-for-commit';
import { reposReposListCommitCommentsForRepo } from './list-commit-comments-for-repo';
import { reposReposListCommitStatusesForRef } from './list-commit-statuses-for-ref';
import { reposReposListCommits } from './list-commits';
import { reposReposListContributors } from './list-contributors';
import { reposReposListCustomDeploymentRuleIntegrations } from './list-custom-deployment-rule-integrations';
import { reposReposListDeployKeys } from './list-deploy-keys';
import { reposReposListDeploymentBranchPolicies } from './list-deployment-branch-policies';
import { reposReposListDeploymentStatuses } from './list-deployment-statuses';
import { reposReposListDeployments } from './list-deployments';
import { reposReposListForAuthenticatedUser } from './list-for-authenticated-user';
import { reposReposListForOrg } from './list-for-org';
import { reposReposListForUser } from './list-for-user';
import { reposReposListForks } from './list-forks';
import { reposReposListInvitations } from './list-invitations';
import { reposReposListInvitationsForAuthenticatedUser } from './list-invitations-for-authenticated-user';
import { reposReposListIssueTypes } from './list-issue-types';
import { reposReposListLanguages } from './list-languages';
import { reposReposListPagesBuilds } from './list-pages-builds';
import { reposReposListPublic } from './list-public';
import { reposReposListPullRequestsAssociatedWithCommit } from './list-pull-requests-associated-with-commit';
import { reposReposListReleaseAssets } from './list-release-assets';
import { reposReposListReleases } from './list-releases';
import { reposReposListTags } from './list-tags';
import { reposReposListTeams } from './list-teams';
import { reposReposListWebhookDeliveries } from './list-webhook-deliveries';
import { reposReposListWebhooks } from './list-webhooks';
import { reposReposMerge } from './merge';
import { reposReposMergeUpstream } from './merge-upstream';
import { reposReposPingWebhook } from './ping-webhook';
import { reposReposRedeliverWebhookDelivery } from './redeliver-webhook-delivery';
import { reposReposRemoveAppAccessRestrictions } from './remove-app-access-restrictions';
import { reposReposRemoveCollaborator } from './remove-collaborator';
import { reposReposRemoveStatusCheckContexts } from './remove-status-check-contexts';
import { reposReposRemoveStatusCheckProtection } from './remove-status-check-protection';
import { reposReposRemoveTeamAccessRestrictions } from './remove-team-access-restrictions';
import { reposReposRemoveUserAccessRestrictions } from './remove-user-access-restrictions';
import { reposReposRenameBranch } from './rename-branch';
import { reposReposReplaceAllTopics } from './replace-all-topics';
import { reposReposRequestPagesBuild } from './request-pages-build';
import { reposReposSetAdminBranchProtection } from './set-admin-branch-protection';
import { reposReposSetAppAccessRestrictions } from './set-app-access-restrictions';
import { reposReposSetStatusCheckContexts } from './set-status-check-contexts';
import { reposReposSetTeamAccessRestrictions } from './set-team-access-restrictions';
import { reposReposSetUserAccessRestrictions } from './set-user-access-restrictions';
import { reposReposTestPushWebhook } from './test-push-webhook';
import { reposReposTransfer } from './transfer';
import { reposReposUpdate } from './update';
import { reposReposUpdateBranchProtection } from './update-branch-protection';
import { reposReposUpdateCommitComment } from './update-commit-comment';
import { reposReposUpdateDeploymentBranchPolicy } from './update-deployment-branch-policy';
import { reposReposUpdateInformationAboutPagesSite } from './update-information-about-pages-site';
import { reposReposUpdateInvitation } from './update-invitation';
import { reposReposUpdatePullRequestReviewProtection } from './update-pull-request-review-protection';
import { reposReposUpdateRelease } from './update-release';
import { reposReposUpdateReleaseAsset } from './update-release-asset';
import { reposReposUpdateRepoRuleset } from './update-repo-ruleset';
import { reposReposUpdateStatusCheckProtection } from './update-status-check-protection';
import { reposReposUpdateWebhook } from './update-webhook';
import { reposReposUpdateWebhookConfigForRepo } from './update-webhook-config-for-repo';

export const reposReposTools = [
  reposReposAcceptInvitationForAuthenticatedUser,
  reposReposAddAppAccessRestrictions,
  reposReposAddCollaborator,
  reposReposAddStatusCheckContexts,
  reposReposAddTeamAccessRestrictions,
  reposReposAddUserAccessRestrictions,
  reposReposCancelPagesDeployment,
  reposReposCheckAutomatedSecurityFixes,
  reposReposCheckCollaborator,
  reposReposCheckImmutableReleases,
  reposReposCheckPrivateVulnerabilityReporting,
  reposReposCheckVulnerabilityAlerts,
  reposReposCodeownersErrors,
  reposReposCompareCommits,
  reposReposCreateAttestation,
  reposReposCreateAutolink,
  reposReposCreateCommitComment,
  reposReposCreateCommitSignatureProtection,
  reposReposCreateCommitStatus,
  reposReposCreateDeployKey,
  reposReposCreateDeployment,
  reposReposCreateDeploymentBranchPolicy,
  reposReposCreateDeploymentProtectionRule,
  reposReposCreateDeploymentStatus,
  reposReposCreateDispatchEvent,
  reposReposCreateForAuthenticatedUser,
  reposReposCreateFork,
  reposReposCreateInOrg,
  reposReposCreateOrUpdateEnvironment,
  reposReposCreateOrUpdateFileContents,
  reposReposCreatePagesDeployment,
  reposReposCreatePagesSite,
  reposReposCreateRelease,
  reposReposCreateRepoRuleset,
  reposReposCreateUsingTemplate,
  reposReposCreateWebhook,
  reposReposCustomPropertiesForReposCreateOrUpdateRepositoryValues,
  reposReposCustomPropertiesForReposGetRepositoryValues,
  reposReposDeclineInvitationForAuthenticatedUser,
  reposReposDelete,
  reposReposDeleteAccessRestrictions,
  reposReposDeleteAdminBranchProtection,
  reposReposDeleteAnEnvironment,
  reposReposDeleteAutolink,
  reposReposDeleteBranchProtection,
  reposReposDeleteCommitComment,
  reposReposDeleteCommitSignatureProtection,
  reposReposDeleteDeployKey,
  reposReposDeleteDeployment,
  reposReposDeleteDeploymentBranchPolicy,
  reposReposDeleteFile,
  reposReposDeleteInvitation,
  reposReposDeletePagesSite,
  reposReposDeletePullRequestReviewProtection,
  reposReposDeleteRelease,
  reposReposDeleteReleaseAsset,
  reposReposDeleteRepoRuleset,
  reposReposDeleteWebhook,
  reposReposDisableAutomatedSecurityFixes,
  reposReposDisableDeploymentProtectionRule,
  reposReposDisableImmutableReleases,
  reposReposDisablePrivateVulnerabilityReporting,
  reposReposDisableVulnerabilityAlerts,
  reposReposDownloadTarballArchive,
  reposReposDownloadZipballArchive,
  reposReposEnableAutomatedSecurityFixes,
  reposReposEnableImmutableReleases,
  reposReposEnablePrivateVulnerabilityReporting,
  reposReposEnableVulnerabilityAlerts,
  reposReposGenerateReleaseNotes,
  reposReposGet,
  reposReposGetAccessRestrictions,
  reposReposGetAdminBranchProtection,
  reposReposGetAllDeploymentProtectionRules,
  reposReposGetAllEnvironments,
  reposReposGetAllStatusCheckContexts,
  reposReposGetAllTopics,
  reposReposGetAppsWithAccessToProtectedBranch,
  reposReposGetAutolink,
  reposReposGetBranch,
  reposReposGetBranchProtection,
  reposReposGetBranchRules,
  reposReposGetClones,
  reposReposGetCodeFrequencyStats,
  reposReposGetCollaboratorPermissionLevel,
  reposReposGetCombinedStatusForRef,
  reposReposGetCommit,
  reposReposGetCommitActivityStats,
  reposReposGetCommitComment,
  reposReposGetCommitSignatureProtection,
  reposReposGetCommunityProfileMetrics,
  reposReposGetContent,
  reposReposGetContributorsStats,
  reposReposGetCustomDeploymentProtectionRule,
  reposReposGetDeployKey,
  reposReposGetDeployment,
  reposReposGetDeploymentBranchPolicy,
  reposReposGetDeploymentStatus,
  reposReposGetEnvironment,
  reposReposGetHashAlgorithm,
  reposReposGetLatestPagesBuild,
  reposReposGetLatestRelease,
  reposReposGetPages,
  reposReposGetPagesBuild,
  reposReposGetPagesDeployment,
  reposReposGetPagesHealthCheck,
  reposReposGetParticipationStats,
  reposReposGetPullRequestReviewProtection,
  reposReposGetPunchCardStats,
  reposReposGetReadme,
  reposReposGetReadmeInDirectory,
  reposReposGetRelease,
  reposReposGetReleaseAsset,
  reposReposGetReleaseByTag,
  reposReposGetRepoRuleSuite,
  reposReposGetRepoRuleSuites,
  reposReposGetRepoRuleset,
  reposReposGetRepoRulesetHistory,
  reposReposGetRepoRulesetVersion,
  reposReposGetRepoRulesets,
  reposReposGetStatusChecksProtection,
  reposReposGetTeamsWithAccessToProtectedBranch,
  reposReposGetTopPaths,
  reposReposGetTopReferrers,
  reposReposGetUsersWithAccessToProtectedBranch,
  reposReposGetViews,
  reposReposGetWebhook,
  reposReposGetWebhookConfigForRepo,
  reposReposGetWebhookDelivery,
  reposReposListActivities,
  reposReposListAttestations,
  reposReposListAutolinks,
  reposReposListBranches,
  reposReposListBranchesForHeadCommit,
  reposReposListCollaborators,
  reposReposListCommentsForCommit,
  reposReposListCommitCommentsForRepo,
  reposReposListCommitStatusesForRef,
  reposReposListCommits,
  reposReposListContributors,
  reposReposListCustomDeploymentRuleIntegrations,
  reposReposListDeployKeys,
  reposReposListDeploymentBranchPolicies,
  reposReposListDeploymentStatuses,
  reposReposListDeployments,
  reposReposListForAuthenticatedUser,
  reposReposListForOrg,
  reposReposListForUser,
  reposReposListForks,
  reposReposListInvitations,
  reposReposListInvitationsForAuthenticatedUser,
  reposReposListIssueTypes,
  reposReposListLanguages,
  reposReposListPagesBuilds,
  reposReposListPublic,
  reposReposListPullRequestsAssociatedWithCommit,
  reposReposListReleaseAssets,
  reposReposListReleases,
  reposReposListTags,
  reposReposListTeams,
  reposReposListWebhookDeliveries,
  reposReposListWebhooks,
  reposReposMerge,
  reposReposMergeUpstream,
  reposReposPingWebhook,
  reposReposRedeliverWebhookDelivery,
  reposReposRemoveAppAccessRestrictions,
  reposReposRemoveCollaborator,
  reposReposRemoveStatusCheckContexts,
  reposReposRemoveStatusCheckProtection,
  reposReposRemoveTeamAccessRestrictions,
  reposReposRemoveUserAccessRestrictions,
  reposReposRenameBranch,
  reposReposReplaceAllTopics,
  reposReposRequestPagesBuild,
  reposReposSetAdminBranchProtection,
  reposReposSetAppAccessRestrictions,
  reposReposSetStatusCheckContexts,
  reposReposSetTeamAccessRestrictions,
  reposReposSetUserAccessRestrictions,
  reposReposTestPushWebhook,
  reposReposTransfer,
  reposReposUpdate,
  reposReposUpdateBranchProtection,
  reposReposUpdateCommitComment,
  reposReposUpdateDeploymentBranchPolicy,
  reposReposUpdateInformationAboutPagesSite,
  reposReposUpdateInvitation,
  reposReposUpdatePullRequestReviewProtection,
  reposReposUpdateRelease,
  reposReposUpdateReleaseAsset,
  reposReposUpdateRepoRuleset,
  reposReposUpdateStatusCheckProtection,
  reposReposUpdateWebhook,
  reposReposUpdateWebhookConfigForRepo,
];
