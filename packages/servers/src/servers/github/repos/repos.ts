import { defineGithubServer } from '../../../providers/github';

import { checksCreate } from './tools/checks/create';
import { checksCreateSuite } from './tools/checks/create-suite';
import { checksGet } from './tools/checks/get';
import { checksGetSuite } from './tools/checks/get-suite';
import { checksListAnnotations } from './tools/checks/list-annotations';
import { checksListForRef } from './tools/checks/list-for-ref';
import { checksListForSuite } from './tools/checks/list-for-suite';
import { checksListSuitesForRef } from './tools/checks/list-suites-for-ref';
import { checksRerequestRun } from './tools/checks/rerequest-run';
import { checksRerequestSuite } from './tools/checks/rerequest-suite';
import { checksSetSuitesPreferences } from './tools/checks/set-suites-preferences';
import { checksUpdate } from './tools/checks/update';
import { codeQualityGetFinding } from './tools/code-quality/get-finding';
import { codeQualityGetSetup } from './tools/code-quality/get-setup';
import { codeQualityListFindingsForRepo } from './tools/code-quality/list-findings-for-repo';
import { codeQualityUpdateSetup } from './tools/code-quality/update-setup';
import { gitCreateBlob } from './tools/git/create-blob';
import { gitCreateCommit } from './tools/git/create-commit';
import { gitCreateRef } from './tools/git/create-ref';
import { gitCreateTag } from './tools/git/create-tag';
import { gitCreateTree } from './tools/git/create-tree';
import { gitDeleteRef } from './tools/git/delete-ref';
import { gitGetBlob } from './tools/git/get-blob';
import { gitGetCommit } from './tools/git/get-commit';
import { gitGetRef } from './tools/git/get-ref';
import { gitGetTag } from './tools/git/get-tag';
import { gitGetTree } from './tools/git/get-tree';
import { gitListMatchingRefs } from './tools/git/list-matching-refs';
import { gitUpdateRef } from './tools/git/update-ref';
import { reposAcceptInvitationForAuthenticatedUser } from './tools/repos/accept-invitation-for-authenticated-user';
import { reposAddAppAccessRestrictions } from './tools/repos/add-app-access-restrictions';
import { reposAddCollaborator } from './tools/repos/add-collaborator';
import { reposAddStatusCheckContexts } from './tools/repos/add-status-check-contexts';
import { reposAddTeamAccessRestrictions } from './tools/repos/add-team-access-restrictions';
import { reposAddUserAccessRestrictions } from './tools/repos/add-user-access-restrictions';
import { reposCancelPagesDeployment } from './tools/repos/cancel-pages-deployment';
import { reposCheckAutomatedSecurityFixes } from './tools/repos/check-automated-security-fixes';
import { reposCheckCollaborator } from './tools/repos/check-collaborator';
import { reposCheckImmutableReleases } from './tools/repos/check-immutable-releases';
import { reposCheckPrivateVulnerabilityReporting } from './tools/repos/check-private-vulnerability-reporting';
import { reposCheckVulnerabilityAlerts } from './tools/repos/check-vulnerability-alerts';
import { reposCodeownersErrors } from './tools/repos/codeowners-errors';
import { reposCompareCommits } from './tools/repos/compare-commits';
import { reposCreateAttestation } from './tools/repos/create-attestation';
import { reposCreateAutolink } from './tools/repos/create-autolink';
import { reposCreateCommitComment } from './tools/repos/create-commit-comment';
import { reposCreateCommitSignatureProtection } from './tools/repos/create-commit-signature-protection';
import { reposCreateCommitStatus } from './tools/repos/create-commit-status';
import { reposCreateDeployKey } from './tools/repos/create-deploy-key';
import { reposCreateDeployment } from './tools/repos/create-deployment';
import { reposCreateDeploymentBranchPolicy } from './tools/repos/create-deployment-branch-policy';
import { reposCreateDeploymentProtectionRule } from './tools/repos/create-deployment-protection-rule';
import { reposCreateDeploymentStatus } from './tools/repos/create-deployment-status';
import { reposCreateDispatchEvent } from './tools/repos/create-dispatch-event';
import { reposCreateForAuthenticatedUser } from './tools/repos/create-for-authenticated-user';
import { reposCreateFork } from './tools/repos/create-fork';
import { reposCreateInOrg } from './tools/repos/create-in-org';
import { reposCreateOrUpdateEnvironment } from './tools/repos/create-or-update-environment';
import { reposCreateOrUpdateFileContents } from './tools/repos/create-or-update-file-contents';
import { reposCreatePagesDeployment } from './tools/repos/create-pages-deployment';
import { reposCreatePagesSite } from './tools/repos/create-pages-site';
import { reposCreateRelease } from './tools/repos/create-release';
import { reposCreateRepoRuleset } from './tools/repos/create-repo-ruleset';
import { reposCreateUsingTemplate } from './tools/repos/create-using-template';
import { reposCreateWebhook } from './tools/repos/create-webhook';
import { reposCustomPropertiesForReposCreateOrUpdateRepositoryValues } from './tools/repos/custom-properties-for-repos-create-or-update-repository-values';
import { reposCustomPropertiesForReposGetRepositoryValues } from './tools/repos/custom-properties-for-repos-get-repository-values';
import { reposDeclineInvitationForAuthenticatedUser } from './tools/repos/decline-invitation-for-authenticated-user';
import { reposDelete } from './tools/repos/delete';
import { reposDeleteAccessRestrictions } from './tools/repos/delete-access-restrictions';
import { reposDeleteAdminBranchProtection } from './tools/repos/delete-admin-branch-protection';
import { reposDeleteAnEnvironment } from './tools/repos/delete-an-environment';
import { reposDeleteAutolink } from './tools/repos/delete-autolink';
import { reposDeleteBranchProtection } from './tools/repos/delete-branch-protection';
import { reposDeleteCommitComment } from './tools/repos/delete-commit-comment';
import { reposDeleteCommitSignatureProtection } from './tools/repos/delete-commit-signature-protection';
import { reposDeleteDeployKey } from './tools/repos/delete-deploy-key';
import { reposDeleteDeployment } from './tools/repos/delete-deployment';
import { reposDeleteDeploymentBranchPolicy } from './tools/repos/delete-deployment-branch-policy';
import { reposDeleteFile } from './tools/repos/delete-file';
import { reposDeleteInvitation } from './tools/repos/delete-invitation';
import { reposDeletePagesSite } from './tools/repos/delete-pages-site';
import { reposDeletePullRequestReviewProtection } from './tools/repos/delete-pull-request-review-protection';
import { reposDeleteRelease } from './tools/repos/delete-release';
import { reposDeleteReleaseAsset } from './tools/repos/delete-release-asset';
import { reposDeleteRepoRuleset } from './tools/repos/delete-repo-ruleset';
import { reposDeleteWebhook } from './tools/repos/delete-webhook';
import { reposDisableAutomatedSecurityFixes } from './tools/repos/disable-automated-security-fixes';
import { reposDisableDeploymentProtectionRule } from './tools/repos/disable-deployment-protection-rule';
import { reposDisableImmutableReleases } from './tools/repos/disable-immutable-releases';
import { reposDisablePrivateVulnerabilityReporting } from './tools/repos/disable-private-vulnerability-reporting';
import { reposDisableVulnerabilityAlerts } from './tools/repos/disable-vulnerability-alerts';
import { reposDownloadTarballArchive } from './tools/repos/download-tarball-archive';
import { reposDownloadZipballArchive } from './tools/repos/download-zipball-archive';
import { reposEnableAutomatedSecurityFixes } from './tools/repos/enable-automated-security-fixes';
import { reposEnableImmutableReleases } from './tools/repos/enable-immutable-releases';
import { reposEnablePrivateVulnerabilityReporting } from './tools/repos/enable-private-vulnerability-reporting';
import { reposEnableVulnerabilityAlerts } from './tools/repos/enable-vulnerability-alerts';
import { reposGenerateReleaseNotes } from './tools/repos/generate-release-notes';
import { reposGet } from './tools/repos/get';
import { reposGetAccessRestrictions } from './tools/repos/get-access-restrictions';
import { reposGetAdminBranchProtection } from './tools/repos/get-admin-branch-protection';
import { reposGetAllDeploymentProtectionRules } from './tools/repos/get-all-deployment-protection-rules';
import { reposGetAllEnvironments } from './tools/repos/get-all-environments';
import { reposGetAllStatusCheckContexts } from './tools/repos/get-all-status-check-contexts';
import { reposGetAllTopics } from './tools/repos/get-all-topics';
import { reposGetAppsWithAccessToProtectedBranch } from './tools/repos/get-apps-with-access-to-protected-branch';
import { reposGetAutolink } from './tools/repos/get-autolink';
import { reposGetBranch } from './tools/repos/get-branch';
import { reposGetBranchProtection } from './tools/repos/get-branch-protection';
import { reposGetBranchRules } from './tools/repos/get-branch-rules';
import { reposGetClones } from './tools/repos/get-clones';
import { reposGetCodeFrequencyStats } from './tools/repos/get-code-frequency-stats';
import { reposGetCollaboratorPermissionLevel } from './tools/repos/get-collaborator-permission-level';
import { reposGetCombinedStatusForRef } from './tools/repos/get-combined-status-for-ref';
import { reposGetCommit } from './tools/repos/get-commit';
import { reposGetCommitActivityStats } from './tools/repos/get-commit-activity-stats';
import { reposGetCommitComment } from './tools/repos/get-commit-comment';
import { reposGetCommitSignatureProtection } from './tools/repos/get-commit-signature-protection';
import { reposGetCommunityProfileMetrics } from './tools/repos/get-community-profile-metrics';
import { reposGetContent } from './tools/repos/get-content';
import { reposGetContributorsStats } from './tools/repos/get-contributors-stats';
import { reposGetCustomDeploymentProtectionRule } from './tools/repos/get-custom-deployment-protection-rule';
import { reposGetDeployKey } from './tools/repos/get-deploy-key';
import { reposGetDeployment } from './tools/repos/get-deployment';
import { reposGetDeploymentBranchPolicy } from './tools/repos/get-deployment-branch-policy';
import { reposGetDeploymentStatus } from './tools/repos/get-deployment-status';
import { reposGetEnvironment } from './tools/repos/get-environment';
import { reposGetHashAlgorithm } from './tools/repos/get-hash-algorithm';
import { reposGetLatestPagesBuild } from './tools/repos/get-latest-pages-build';
import { reposGetLatestRelease } from './tools/repos/get-latest-release';
import { reposGetPages } from './tools/repos/get-pages';
import { reposGetPagesBuild } from './tools/repos/get-pages-build';
import { reposGetPagesDeployment } from './tools/repos/get-pages-deployment';
import { reposGetPagesHealthCheck } from './tools/repos/get-pages-health-check';
import { reposGetParticipationStats } from './tools/repos/get-participation-stats';
import { reposGetPullRequestReviewProtection } from './tools/repos/get-pull-request-review-protection';
import { reposGetPunchCardStats } from './tools/repos/get-punch-card-stats';
import { reposGetReadme } from './tools/repos/get-readme';
import { reposGetReadmeInDirectory } from './tools/repos/get-readme-in-directory';
import { reposGetRelease } from './tools/repos/get-release';
import { reposGetReleaseAsset } from './tools/repos/get-release-asset';
import { reposGetReleaseByTag } from './tools/repos/get-release-by-tag';
import { reposGetRepoRuleSuite } from './tools/repos/get-repo-rule-suite';
import { reposGetRepoRuleSuites } from './tools/repos/get-repo-rule-suites';
import { reposGetRepoRuleset } from './tools/repos/get-repo-ruleset';
import { reposGetRepoRulesetHistory } from './tools/repos/get-repo-ruleset-history';
import { reposGetRepoRulesetVersion } from './tools/repos/get-repo-ruleset-version';
import { reposGetRepoRulesets } from './tools/repos/get-repo-rulesets';
import { reposGetStatusChecksProtection } from './tools/repos/get-status-checks-protection';
import { reposGetTeamsWithAccessToProtectedBranch } from './tools/repos/get-teams-with-access-to-protected-branch';
import { reposGetTopPaths } from './tools/repos/get-top-paths';
import { reposGetTopReferrers } from './tools/repos/get-top-referrers';
import { reposGetUsersWithAccessToProtectedBranch } from './tools/repos/get-users-with-access-to-protected-branch';
import { reposGetViews } from './tools/repos/get-views';
import { reposGetWebhook } from './tools/repos/get-webhook';
import { reposGetWebhookConfigForRepo } from './tools/repos/get-webhook-config-for-repo';
import { reposGetWebhookDelivery } from './tools/repos/get-webhook-delivery';
import { reposListActivities } from './tools/repos/list-activities';
import { reposListAttestations } from './tools/repos/list-attestations';
import { reposListAutolinks } from './tools/repos/list-autolinks';
import { reposListBranches } from './tools/repos/list-branches';
import { reposListBranchesForHeadCommit } from './tools/repos/list-branches-for-head-commit';
import { reposListCollaborators } from './tools/repos/list-collaborators';
import { reposListCommentsForCommit } from './tools/repos/list-comments-for-commit';
import { reposListCommitCommentsForRepo } from './tools/repos/list-commit-comments-for-repo';
import { reposListCommitStatusesForRef } from './tools/repos/list-commit-statuses-for-ref';
import { reposListCommits } from './tools/repos/list-commits';
import { reposListContributors } from './tools/repos/list-contributors';
import { reposListCustomDeploymentRuleIntegrations } from './tools/repos/list-custom-deployment-rule-integrations';
import { reposListDeployKeys } from './tools/repos/list-deploy-keys';
import { reposListDeploymentBranchPolicies } from './tools/repos/list-deployment-branch-policies';
import { reposListDeploymentStatuses } from './tools/repos/list-deployment-statuses';
import { reposListDeployments } from './tools/repos/list-deployments';
import { reposListForAuthenticatedUser } from './tools/repos/list-for-authenticated-user';
import { reposListForOrg } from './tools/repos/list-for-org';
import { reposListForUser } from './tools/repos/list-for-user';
import { reposListForks } from './tools/repos/list-forks';
import { reposListInvitations } from './tools/repos/list-invitations';
import { reposListInvitationsForAuthenticatedUser } from './tools/repos/list-invitations-for-authenticated-user';
import { reposListIssueTypes } from './tools/repos/list-issue-types';
import { reposListLanguages } from './tools/repos/list-languages';
import { reposListPagesBuilds } from './tools/repos/list-pages-builds';
import { reposListPublic } from './tools/repos/list-public';
import { reposListPullRequestsAssociatedWithCommit } from './tools/repos/list-pull-requests-associated-with-commit';
import { reposListReleaseAssets } from './tools/repos/list-release-assets';
import { reposListReleases } from './tools/repos/list-releases';
import { reposListTags } from './tools/repos/list-tags';
import { reposListTeams } from './tools/repos/list-teams';
import { reposListWebhookDeliveries } from './tools/repos/list-webhook-deliveries';
import { reposListWebhooks } from './tools/repos/list-webhooks';
import { reposMerge } from './tools/repos/merge';
import { reposMergeUpstream } from './tools/repos/merge-upstream';
import { reposPingWebhook } from './tools/repos/ping-webhook';
import { reposRedeliverWebhookDelivery } from './tools/repos/redeliver-webhook-delivery';
import { reposRemoveAppAccessRestrictions } from './tools/repos/remove-app-access-restrictions';
import { reposRemoveCollaborator } from './tools/repos/remove-collaborator';
import { reposRemoveStatusCheckContexts } from './tools/repos/remove-status-check-contexts';
import { reposRemoveStatusCheckProtection } from './tools/repos/remove-status-check-protection';
import { reposRemoveTeamAccessRestrictions } from './tools/repos/remove-team-access-restrictions';
import { reposRemoveUserAccessRestrictions } from './tools/repos/remove-user-access-restrictions';
import { reposRenameBranch } from './tools/repos/rename-branch';
import { reposReplaceAllTopics } from './tools/repos/replace-all-topics';
import { reposRequestPagesBuild } from './tools/repos/request-pages-build';
import { reposSetAdminBranchProtection } from './tools/repos/set-admin-branch-protection';
import { reposSetAppAccessRestrictions } from './tools/repos/set-app-access-restrictions';
import { reposSetStatusCheckContexts } from './tools/repos/set-status-check-contexts';
import { reposSetTeamAccessRestrictions } from './tools/repos/set-team-access-restrictions';
import { reposSetUserAccessRestrictions } from './tools/repos/set-user-access-restrictions';
import { reposTestPushWebhook } from './tools/repos/test-push-webhook';
import { reposTransfer } from './tools/repos/transfer';
import { reposUpdate } from './tools/repos/update';
import { reposUpdateBranchProtection } from './tools/repos/update-branch-protection';
import { reposUpdateCommitComment } from './tools/repos/update-commit-comment';
import { reposUpdateDeploymentBranchPolicy } from './tools/repos/update-deployment-branch-policy';
import { reposUpdateInformationAboutPagesSite } from './tools/repos/update-information-about-pages-site';
import { reposUpdateInvitation } from './tools/repos/update-invitation';
import { reposUpdatePullRequestReviewProtection } from './tools/repos/update-pull-request-review-protection';
import { reposUpdateRelease } from './tools/repos/update-release';
import { reposUpdateReleaseAsset } from './tools/repos/update-release-asset';
import { reposUpdateRepoRuleset } from './tools/repos/update-repo-ruleset';
import { reposUpdateStatusCheckProtection } from './tools/repos/update-status-check-protection';
import { reposUpdateWebhook } from './tools/repos/update-webhook';
import { reposUpdateWebhookConfigForRepo } from './tools/repos/update-webhook-config-for-repo';

export const githubRepos = defineGithubServer({
  name: 'github_repos',
  description: 'GitHub REST API: repositories, branches, commits, releases, deployments, checks, pages, git data.',
  tools: [
    checksCreate,
    checksCreateSuite,
    checksGet,
    checksGetSuite,
    checksListAnnotations,
    checksListForRef,
    checksListForSuite,
    checksListSuitesForRef,
    checksRerequestRun,
    checksRerequestSuite,
    checksSetSuitesPreferences,
    checksUpdate,
    codeQualityGetFinding,
    codeQualityGetSetup,
    codeQualityListFindingsForRepo,
    codeQualityUpdateSetup,
    gitCreateBlob,
    gitCreateCommit,
    gitCreateRef,
    gitCreateTag,
    gitCreateTree,
    gitDeleteRef,
    gitGetBlob,
    gitGetCommit,
    gitGetRef,
    gitGetTag,
    gitGetTree,
    gitListMatchingRefs,
    gitUpdateRef,
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
  ],
});
