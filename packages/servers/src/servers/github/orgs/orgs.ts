import { defineGithubServer } from '../../../providers/github';

import { apiInsightsGetRouteStatsByActor } from './tools/api-insights/get-route-stats-by-actor';
import { apiInsightsGetSubjectStats } from './tools/api-insights/get-subject-stats';
import { apiInsightsGetSummaryStats } from './tools/api-insights/get-summary-stats';
import { apiInsightsGetSummaryStatsByActor } from './tools/api-insights/get-summary-stats-by-actor';
import { apiInsightsGetSummaryStatsByUser } from './tools/api-insights/get-summary-stats-by-user';
import { apiInsightsGetTimeStats } from './tools/api-insights/get-time-stats';
import { apiInsightsGetTimeStatsByActor } from './tools/api-insights/get-time-stats-by-actor';
import { apiInsightsGetTimeStatsByUser } from './tools/api-insights/get-time-stats-by-user';
import { apiInsightsGetUserStats } from './tools/api-insights/get-user-stats';
import { billingCreateOrganizationBudget } from './tools/billing/create-organization-budget';
import { billingDeleteBudgetOrg } from './tools/billing/delete-budget-org';
import { billingGetAllBudgetsOrg } from './tools/billing/get-all-budgets-org';
import { billingGetBudgetOrg } from './tools/billing/get-budget-org';
import { billingGetGithubBillingAiCreditUsageReportOrg } from './tools/billing/get-github-billing-ai-credit-usage-report-org';
import { billingGetGithubBillingAiCreditUsageReportUser } from './tools/billing/get-github-billing-ai-credit-usage-report-user';
import { billingGetGithubBillingPremiumRequestUsageReportOrg } from './tools/billing/get-github-billing-premium-request-usage-report-org';
import { billingGetGithubBillingPremiumRequestUsageReportUser } from './tools/billing/get-github-billing-premium-request-usage-report-user';
import { billingGetGithubBillingUsageReportOrg } from './tools/billing/get-github-billing-usage-report-org';
import { billingGetGithubBillingUsageReportUser } from './tools/billing/get-github-billing-usage-report-user';
import { billingGetGithubBillingUsageSummaryReportOrg } from './tools/billing/get-github-billing-usage-summary-report-org';
import { billingGetGithubBillingUsageSummaryReportUser } from './tools/billing/get-github-billing-usage-summary-report-user';
import { billingUpdateBudgetOrg } from './tools/billing/update-budget-org';
import { campaignsCreateCampaign } from './tools/campaigns/create-campaign';
import { campaignsDeleteCampaign } from './tools/campaigns/delete-campaign';
import { campaignsGetCampaignSummary } from './tools/campaigns/get-campaign-summary';
import { campaignsListOrgCampaigns } from './tools/campaigns/list-org-campaigns';
import { campaignsUpdateCampaign } from './tools/campaigns/update-campaign';
import { classroomGetAClassroom } from './tools/classroom/get-a-classroom';
import { classroomGetAnAssignment } from './tools/classroom/get-an-assignment';
import { classroomGetAssignmentGrades } from './tools/classroom/get-assignment-grades';
import { classroomListAcceptedAssignmentsForAnAssignment } from './tools/classroom/list-accepted-assignments-for-an-assignment';
import { classroomListAssignmentsForAClassroom } from './tools/classroom/list-assignments-for-a-classroom';
import { classroomListClassrooms } from './tools/classroom/list-classrooms';
import { hostedComputeCreateNetworkConfigurationForOrg } from './tools/hosted-compute/create-network-configuration-for-org';
import { hostedComputeDeleteNetworkConfigurationFromOrg } from './tools/hosted-compute/delete-network-configuration-from-org';
import { hostedComputeGetNetworkConfigurationForOrg } from './tools/hosted-compute/get-network-configuration-for-org';
import { hostedComputeGetNetworkSettingsForOrg } from './tools/hosted-compute/get-network-settings-for-org';
import { hostedComputeListNetworkConfigurationsForOrg } from './tools/hosted-compute/list-network-configurations-for-org';
import { hostedComputeUpdateNetworkConfigurationForOrg } from './tools/hosted-compute/update-network-configuration-for-org';
import { interactionsGetPullRequestBypassListForRepo } from './tools/interactions/get-pull-request-bypass-list-for-repo';
import { interactionsGetPullRequestCreationCapForOrg } from './tools/interactions/get-pull-request-creation-cap-for-org';
import { interactionsGetPullRequestCreationCapForRepo } from './tools/interactions/get-pull-request-creation-cap-for-repo';
import { interactionsGetRestrictionsForAuthenticatedUser } from './tools/interactions/get-restrictions-for-authenticated-user';
import { interactionsGetRestrictionsForOrg } from './tools/interactions/get-restrictions-for-org';
import { interactionsGetRestrictionsForRepo } from './tools/interactions/get-restrictions-for-repo';
import { interactionsRemovePullRequestBypassListForRepo } from './tools/interactions/remove-pull-request-bypass-list-for-repo';
import { interactionsRemoveRestrictionsForAuthenticatedUser } from './tools/interactions/remove-restrictions-for-authenticated-user';
import { interactionsRemoveRestrictionsForOrg } from './tools/interactions/remove-restrictions-for-org';
import { interactionsRemoveRestrictionsForRepo } from './tools/interactions/remove-restrictions-for-repo';
import { interactionsSetPullRequestBypassListForRepo } from './tools/interactions/set-pull-request-bypass-list-for-repo';
import { interactionsSetRestrictionsForAuthenticatedUser } from './tools/interactions/set-restrictions-for-authenticated-user';
import { interactionsSetRestrictionsForOrg } from './tools/interactions/set-restrictions-for-org';
import { interactionsSetRestrictionsForRepo } from './tools/interactions/set-restrictions-for-repo';
import { interactionsUpdatePullRequestCreationCapForOrg } from './tools/interactions/update-pull-request-creation-cap-for-org';
import { interactionsUpdatePullRequestCreationCapForRepo } from './tools/interactions/update-pull-request-creation-cap-for-repo';
import { migrationsCancelImport } from './tools/migrations/cancel-import';
import { migrationsDeleteArchiveForAuthenticatedUser } from './tools/migrations/delete-archive-for-authenticated-user';
import { migrationsDeleteArchiveForOrg } from './tools/migrations/delete-archive-for-org';
import { migrationsDownloadArchiveForOrg } from './tools/migrations/download-archive-for-org';
import { migrationsGetArchiveForAuthenticatedUser } from './tools/migrations/get-archive-for-authenticated-user';
import { migrationsGetCommitAuthors } from './tools/migrations/get-commit-authors';
import { migrationsGetImportStatus } from './tools/migrations/get-import-status';
import { migrationsGetLargeFiles } from './tools/migrations/get-large-files';
import { migrationsGetStatusForAuthenticatedUser } from './tools/migrations/get-status-for-authenticated-user';
import { migrationsGetStatusForOrg } from './tools/migrations/get-status-for-org';
import { migrationsListForAuthenticatedUser } from './tools/migrations/list-for-authenticated-user';
import { migrationsListForOrg } from './tools/migrations/list-for-org';
import { migrationsListReposForAuthenticatedUser } from './tools/migrations/list-repos-for-authenticated-user';
import { migrationsListReposForOrg } from './tools/migrations/list-repos-for-org';
import { migrationsMapCommitAuthor } from './tools/migrations/map-commit-author';
import { migrationsSetLfsPreference } from './tools/migrations/set-lfs-preference';
import { migrationsStartForAuthenticatedUser } from './tools/migrations/start-for-authenticated-user';
import { migrationsStartForOrg } from './tools/migrations/start-for-org';
import { migrationsStartImport } from './tools/migrations/start-import';
import { migrationsUnlockRepoForAuthenticatedUser } from './tools/migrations/unlock-repo-for-authenticated-user';
import { migrationsUnlockRepoForOrg } from './tools/migrations/unlock-repo-for-org';
import { migrationsUpdateImport } from './tools/migrations/update-import';
import { orgsAddSecurityManagerTeam } from './tools/orgs/add-security-manager-team';
import { orgsAssignTeamToOrgRole } from './tools/orgs/assign-team-to-org-role';
import { orgsAssignUserToOrgRole } from './tools/orgs/assign-user-to-org-role';
import { orgsBlockUser } from './tools/orgs/block-user';
import { orgsCancelInvitation } from './tools/orgs/cancel-invitation';
import { orgsCheckBlockedUser } from './tools/orgs/check-blocked-user';
import { orgsCheckMembershipForUser } from './tools/orgs/check-membership-for-user';
import { orgsCheckPublicMembershipForUser } from './tools/orgs/check-public-membership-for-user';
import { orgsConvertMemberToOutsideCollaborator } from './tools/orgs/convert-member-to-outside-collaborator';
import { orgsCreateArtifactDeploymentRecord } from './tools/orgs/create-artifact-deployment-record';
import { orgsCreateArtifactStorageRecord } from './tools/orgs/create-artifact-storage-record';
import { orgsCreateClusterDeploymentRecordsJob } from './tools/orgs/create-cluster-deployment-records-job';
import { orgsCreateInvitation } from './tools/orgs/create-invitation';
import { orgsCreateIssueField } from './tools/orgs/create-issue-field';
import { orgsCreateIssueType } from './tools/orgs/create-issue-type';
import { orgsCreateWebhook } from './tools/orgs/create-webhook';
import { orgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinition } from './tools/orgs/custom-properties-for-repos-create-or-update-organization-definition';
import { orgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitions } from './tools/orgs/custom-properties-for-repos-create-or-update-organization-definitions';
import { orgsCustomPropertiesForReposCreateOrUpdateOrganizationValues } from './tools/orgs/custom-properties-for-repos-create-or-update-organization-values';
import { orgsCustomPropertiesForReposDeleteOrganizationDefinition } from './tools/orgs/custom-properties-for-repos-delete-organization-definition';
import { orgsCustomPropertiesForReposGetOrganizationDefinition } from './tools/orgs/custom-properties-for-repos-get-organization-definition';
import { orgsCustomPropertiesForReposGetOrganizationDefinitions } from './tools/orgs/custom-properties-for-repos-get-organization-definitions';
import { orgsCustomPropertiesForReposGetOrganizationValues } from './tools/orgs/custom-properties-for-repos-get-organization-values';
import { orgsDelete } from './tools/orgs/delete';
import { orgsDeleteAttestationsBulk } from './tools/orgs/delete-attestations-bulk';
import { orgsDeleteAttestationsById } from './tools/orgs/delete-attestations-by-id';
import { orgsDeleteAttestationsBySubjectDigest } from './tools/orgs/delete-attestations-by-subject-digest';
import { orgsDeleteIssueField } from './tools/orgs/delete-issue-field';
import { orgsDeleteIssueType } from './tools/orgs/delete-issue-type';
import { orgsDeleteWebhook } from './tools/orgs/delete-webhook';
import { orgsDisableSelectedRepositoryImmutableReleasesOrganization } from './tools/orgs/disable-selected-repository-immutable-releases-organization';
import { orgsEnableOrDisableSecurityProductOnAllOrgRepos } from './tools/orgs/enable-or-disable-security-product-on-all-org-repos';
import { orgsEnableSelectedRepositoryImmutableReleasesOrganization } from './tools/orgs/enable-selected-repository-immutable-releases-organization';
import { orgsExternalPropertiesForReposCreateOrUpdateOrganizationValues } from './tools/orgs/external-properties-for-repos-create-or-update-organization-values';
import { orgsExternalPropertiesForReposCreateOrUpdateValuesForOrganizationProperty } from './tools/orgs/external-properties-for-repos-create-or-update-values-for-organization-property';
import { orgsExternalPropertiesForReposDeleteOrganizationValues } from './tools/orgs/external-properties-for-repos-delete-organization-values';
import { orgsExternalPropertiesForReposGetOrganizationAppInstallations } from './tools/orgs/external-properties-for-repos-get-organization-app-installations';
import { orgsExternalPropertiesForReposGetOrganizationDefinitions } from './tools/orgs/external-properties-for-repos-get-organization-definitions';
import { orgsExternalPropertiesForReposRegisterOrganizationAppInstallation } from './tools/orgs/external-properties-for-repos-register-organization-app-installation';
import { orgsGet } from './tools/orgs/get';
import { orgsGetClusterDeploymentRecordsJob } from './tools/orgs/get-cluster-deployment-records-job';
import { orgsGetImmutableReleasesSettings } from './tools/orgs/get-immutable-releases-settings';
import { orgsGetImmutableReleasesSettingsRepositories } from './tools/orgs/get-immutable-releases-settings-repositories';
import { orgsGetMembershipForAuthenticatedUser } from './tools/orgs/get-membership-for-authenticated-user';
import { orgsGetMembershipForUser } from './tools/orgs/get-membership-for-user';
import { orgsGetOrgRole } from './tools/orgs/get-org-role';
import { orgsGetOrgRulesetHistory } from './tools/orgs/get-org-ruleset-history';
import { orgsGetOrgRulesetVersion } from './tools/orgs/get-org-ruleset-version';
import { orgsGetWebhook } from './tools/orgs/get-webhook';
import { orgsGetWebhookConfigForOrg } from './tools/orgs/get-webhook-config-for-org';
import { orgsGetWebhookDelivery } from './tools/orgs/get-webhook-delivery';
import { orgsList } from './tools/orgs/list';
import { orgsListAppInstallations } from './tools/orgs/list-app-installations';
import { orgsListArtifactDeploymentRecords } from './tools/orgs/list-artifact-deployment-records';
import { orgsListArtifactStorageRecords } from './tools/orgs/list-artifact-storage-records';
import { orgsListAttestationRepositories } from './tools/orgs/list-attestation-repositories';
import { orgsListAttestations } from './tools/orgs/list-attestations';
import { orgsListAttestationsBulk } from './tools/orgs/list-attestations-bulk';
import { orgsListBlockedUsers } from './tools/orgs/list-blocked-users';
import { orgsListFailedInvitations } from './tools/orgs/list-failed-invitations';
import { orgsListForAuthenticatedUser } from './tools/orgs/list-for-authenticated-user';
import { orgsListForUser } from './tools/orgs/list-for-user';
import { orgsListInvitationTeams } from './tools/orgs/list-invitation-teams';
import { orgsListIssueFields } from './tools/orgs/list-issue-fields';
import { orgsListIssueTypes } from './tools/orgs/list-issue-types';
import { orgsListMembers } from './tools/orgs/list-members';
import { orgsListMembershipsForAuthenticatedUser } from './tools/orgs/list-memberships-for-authenticated-user';
import { orgsListOrgRoleTeams } from './tools/orgs/list-org-role-teams';
import { orgsListOrgRoleUsers } from './tools/orgs/list-org-role-users';
import { orgsListOrgRoles } from './tools/orgs/list-org-roles';
import { orgsListOutsideCollaborators } from './tools/orgs/list-outside-collaborators';
import { orgsListPatGrantRepositories } from './tools/orgs/list-pat-grant-repositories';
import { orgsListPatGrantRequestRepositories } from './tools/orgs/list-pat-grant-request-repositories';
import { orgsListPatGrantRequests } from './tools/orgs/list-pat-grant-requests';
import { orgsListPatGrants } from './tools/orgs/list-pat-grants';
import { orgsListPendingInvitations } from './tools/orgs/list-pending-invitations';
import { orgsListPublicMembers } from './tools/orgs/list-public-members';
import { orgsListSecurityManagerTeams } from './tools/orgs/list-security-manager-teams';
import { orgsListWebhookDeliveries } from './tools/orgs/list-webhook-deliveries';
import { orgsListWebhooks } from './tools/orgs/list-webhooks';
import { orgsPingWebhook } from './tools/orgs/ping-webhook';
import { orgsRedeliverWebhookDelivery } from './tools/orgs/redeliver-webhook-delivery';
import { orgsRemoveMember } from './tools/orgs/remove-member';
import { orgsRemoveMembershipForUser } from './tools/orgs/remove-membership-for-user';
import { orgsRemoveOutsideCollaborator } from './tools/orgs/remove-outside-collaborator';
import { orgsRemovePublicMembershipForAuthenticatedUser } from './tools/orgs/remove-public-membership-for-authenticated-user';
import { orgsRemoveSecurityManagerTeam } from './tools/orgs/remove-security-manager-team';
import { orgsReviewPatGrantRequest } from './tools/orgs/review-pat-grant-request';
import { orgsReviewPatGrantRequestsInBulk } from './tools/orgs/review-pat-grant-requests-in-bulk';
import { orgsRevokeAllOrgRolesTeam } from './tools/orgs/revoke-all-org-roles-team';
import { orgsRevokeAllOrgRolesUser } from './tools/orgs/revoke-all-org-roles-user';
import { orgsRevokeOrgRoleTeam } from './tools/orgs/revoke-org-role-team';
import { orgsRevokeOrgRoleUser } from './tools/orgs/revoke-org-role-user';
import { orgsSetClusterDeploymentRecords } from './tools/orgs/set-cluster-deployment-records';
import { orgsSetImmutableReleasesSettings } from './tools/orgs/set-immutable-releases-settings';
import { orgsSetImmutableReleasesSettingsRepositories } from './tools/orgs/set-immutable-releases-settings-repositories';
import { orgsSetMembershipForUser } from './tools/orgs/set-membership-for-user';
import { orgsSetPublicMembershipForAuthenticatedUser } from './tools/orgs/set-public-membership-for-authenticated-user';
import { orgsUnblockUser } from './tools/orgs/unblock-user';
import { orgsUpdate } from './tools/orgs/update';
import { orgsUpdateIssueField } from './tools/orgs/update-issue-field';
import { orgsUpdateIssueType } from './tools/orgs/update-issue-type';
import { orgsUpdateMembershipForAuthenticatedUser } from './tools/orgs/update-membership-for-authenticated-user';
import { orgsUpdatePatAccess } from './tools/orgs/update-pat-access';
import { orgsUpdatePatAccesses } from './tools/orgs/update-pat-accesses';
import { orgsUpdateWebhook } from './tools/orgs/update-webhook';
import { orgsUpdateWebhookConfigForOrg } from './tools/orgs/update-webhook-config-for-org';
import { reposCreateOrgRuleset } from './tools/repos/create-org-ruleset';
import { reposDeleteOrgRuleset } from './tools/repos/delete-org-ruleset';
import { reposGetOrgRuleSuite } from './tools/repos/get-org-rule-suite';
import { reposGetOrgRuleSuites } from './tools/repos/get-org-rule-suites';
import { reposGetOrgRuleset } from './tools/repos/get-org-ruleset';
import { reposGetOrgRulesets } from './tools/repos/get-org-rulesets';
import { reposUpdateOrgRuleset } from './tools/repos/update-org-ruleset';
import { teamsAddMemberLegacy } from './tools/teams/add-member-legacy';
import { teamsAddOrUpdateMembershipForUserInOrg } from './tools/teams/add-or-update-membership-for-user-in-org';
import { teamsAddOrUpdateMembershipForUserLegacy } from './tools/teams/add-or-update-membership-for-user-legacy';
import { teamsAddOrUpdateRepoPermissionsInOrg } from './tools/teams/add-or-update-repo-permissions-in-org';
import { teamsAddOrUpdateRepoPermissionsLegacy } from './tools/teams/add-or-update-repo-permissions-legacy';
import { teamsCheckPermissionsForRepoInOrg } from './tools/teams/check-permissions-for-repo-in-org';
import { teamsCheckPermissionsForRepoLegacy } from './tools/teams/check-permissions-for-repo-legacy';
import { teamsCreate } from './tools/teams/create';
import { teamsDeleteInOrg } from './tools/teams/delete-in-org';
import { teamsDeleteLegacy } from './tools/teams/delete-legacy';
import { teamsGetByName } from './tools/teams/get-by-name';
import { teamsGetLegacy } from './tools/teams/get-legacy';
import { teamsGetMemberLegacy } from './tools/teams/get-member-legacy';
import { teamsGetMembershipForUserInOrg } from './tools/teams/get-membership-for-user-in-org';
import { teamsGetMembershipForUserLegacy } from './tools/teams/get-membership-for-user-legacy';
import { teamsList } from './tools/teams/list';
import { teamsListChildInOrg } from './tools/teams/list-child-in-org';
import { teamsListChildLegacy } from './tools/teams/list-child-legacy';
import { teamsListForAuthenticatedUser } from './tools/teams/list-for-authenticated-user';
import { teamsListMembersInOrg } from './tools/teams/list-members-in-org';
import { teamsListMembersLegacy } from './tools/teams/list-members-legacy';
import { teamsListPendingInvitationsInOrg } from './tools/teams/list-pending-invitations-in-org';
import { teamsListPendingInvitationsLegacy } from './tools/teams/list-pending-invitations-legacy';
import { teamsListReposInOrg } from './tools/teams/list-repos-in-org';
import { teamsListReposLegacy } from './tools/teams/list-repos-legacy';
import { teamsRemoveMemberLegacy } from './tools/teams/remove-member-legacy';
import { teamsRemoveMembershipForUserInOrg } from './tools/teams/remove-membership-for-user-in-org';
import { teamsRemoveMembershipForUserLegacy } from './tools/teams/remove-membership-for-user-legacy';
import { teamsRemoveRepoInOrg } from './tools/teams/remove-repo-in-org';
import { teamsRemoveRepoLegacy } from './tools/teams/remove-repo-legacy';
import { teamsUpdateInOrg } from './tools/teams/update-in-org';
import { teamsUpdateLegacy } from './tools/teams/update-legacy';

export const githubOrgs = defineGithubServer({
  name: 'github_orgs',
  description: 'GitHub REST API: organizations, teams, billing, interaction limits, migrations, classroom.',
  tools: [
    apiInsightsGetRouteStatsByActor,
    apiInsightsGetSubjectStats,
    apiInsightsGetSummaryStats,
    apiInsightsGetSummaryStatsByActor,
    apiInsightsGetSummaryStatsByUser,
    apiInsightsGetTimeStats,
    apiInsightsGetTimeStatsByActor,
    apiInsightsGetTimeStatsByUser,
    apiInsightsGetUserStats,
    billingCreateOrganizationBudget,
    billingDeleteBudgetOrg,
    billingGetAllBudgetsOrg,
    billingGetBudgetOrg,
    billingGetGithubBillingAiCreditUsageReportOrg,
    billingGetGithubBillingAiCreditUsageReportUser,
    billingGetGithubBillingPremiumRequestUsageReportOrg,
    billingGetGithubBillingPremiumRequestUsageReportUser,
    billingGetGithubBillingUsageReportOrg,
    billingGetGithubBillingUsageReportUser,
    billingGetGithubBillingUsageSummaryReportOrg,
    billingGetGithubBillingUsageSummaryReportUser,
    billingUpdateBudgetOrg,
    campaignsCreateCampaign,
    campaignsDeleteCampaign,
    campaignsGetCampaignSummary,
    campaignsListOrgCampaigns,
    campaignsUpdateCampaign,
    classroomGetAClassroom,
    classroomGetAnAssignment,
    classroomGetAssignmentGrades,
    classroomListAcceptedAssignmentsForAnAssignment,
    classroomListAssignmentsForAClassroom,
    classroomListClassrooms,
    hostedComputeCreateNetworkConfigurationForOrg,
    hostedComputeDeleteNetworkConfigurationFromOrg,
    hostedComputeGetNetworkConfigurationForOrg,
    hostedComputeGetNetworkSettingsForOrg,
    hostedComputeListNetworkConfigurationsForOrg,
    hostedComputeUpdateNetworkConfigurationForOrg,
    interactionsGetPullRequestBypassListForRepo,
    interactionsGetPullRequestCreationCapForOrg,
    interactionsGetPullRequestCreationCapForRepo,
    interactionsGetRestrictionsForAuthenticatedUser,
    interactionsGetRestrictionsForOrg,
    interactionsGetRestrictionsForRepo,
    interactionsRemovePullRequestBypassListForRepo,
    interactionsRemoveRestrictionsForAuthenticatedUser,
    interactionsRemoveRestrictionsForOrg,
    interactionsRemoveRestrictionsForRepo,
    interactionsSetPullRequestBypassListForRepo,
    interactionsSetRestrictionsForAuthenticatedUser,
    interactionsSetRestrictionsForOrg,
    interactionsSetRestrictionsForRepo,
    interactionsUpdatePullRequestCreationCapForOrg,
    interactionsUpdatePullRequestCreationCapForRepo,
    migrationsCancelImport,
    migrationsDeleteArchiveForAuthenticatedUser,
    migrationsDeleteArchiveForOrg,
    migrationsDownloadArchiveForOrg,
    migrationsGetArchiveForAuthenticatedUser,
    migrationsGetCommitAuthors,
    migrationsGetImportStatus,
    migrationsGetLargeFiles,
    migrationsGetStatusForAuthenticatedUser,
    migrationsGetStatusForOrg,
    migrationsListForAuthenticatedUser,
    migrationsListForOrg,
    migrationsListReposForAuthenticatedUser,
    migrationsListReposForOrg,
    migrationsMapCommitAuthor,
    migrationsSetLfsPreference,
    migrationsStartForAuthenticatedUser,
    migrationsStartForOrg,
    migrationsStartImport,
    migrationsUnlockRepoForAuthenticatedUser,
    migrationsUnlockRepoForOrg,
    migrationsUpdateImport,
    orgsAddSecurityManagerTeam,
    orgsAssignTeamToOrgRole,
    orgsAssignUserToOrgRole,
    orgsBlockUser,
    orgsCancelInvitation,
    orgsCheckBlockedUser,
    orgsCheckMembershipForUser,
    orgsCheckPublicMembershipForUser,
    orgsConvertMemberToOutsideCollaborator,
    orgsCreateArtifactDeploymentRecord,
    orgsCreateArtifactStorageRecord,
    orgsCreateClusterDeploymentRecordsJob,
    orgsCreateInvitation,
    orgsCreateIssueField,
    orgsCreateIssueType,
    orgsCreateWebhook,
    orgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinition,
    orgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitions,
    orgsCustomPropertiesForReposCreateOrUpdateOrganizationValues,
    orgsCustomPropertiesForReposDeleteOrganizationDefinition,
    orgsCustomPropertiesForReposGetOrganizationDefinition,
    orgsCustomPropertiesForReposGetOrganizationDefinitions,
    orgsCustomPropertiesForReposGetOrganizationValues,
    orgsDelete,
    orgsDeleteAttestationsBulk,
    orgsDeleteAttestationsById,
    orgsDeleteAttestationsBySubjectDigest,
    orgsDeleteIssueField,
    orgsDeleteIssueType,
    orgsDeleteWebhook,
    orgsDisableSelectedRepositoryImmutableReleasesOrganization,
    orgsEnableOrDisableSecurityProductOnAllOrgRepos,
    orgsEnableSelectedRepositoryImmutableReleasesOrganization,
    orgsExternalPropertiesForReposCreateOrUpdateOrganizationValues,
    orgsExternalPropertiesForReposCreateOrUpdateValuesForOrganizationProperty,
    orgsExternalPropertiesForReposDeleteOrganizationValues,
    orgsExternalPropertiesForReposGetOrganizationAppInstallations,
    orgsExternalPropertiesForReposGetOrganizationDefinitions,
    orgsExternalPropertiesForReposRegisterOrganizationAppInstallation,
    orgsGet,
    orgsGetClusterDeploymentRecordsJob,
    orgsGetImmutableReleasesSettings,
    orgsGetImmutableReleasesSettingsRepositories,
    orgsGetMembershipForAuthenticatedUser,
    orgsGetMembershipForUser,
    orgsGetOrgRole,
    orgsGetOrgRulesetHistory,
    orgsGetOrgRulesetVersion,
    orgsGetWebhook,
    orgsGetWebhookConfigForOrg,
    orgsGetWebhookDelivery,
    orgsList,
    orgsListAppInstallations,
    orgsListArtifactDeploymentRecords,
    orgsListArtifactStorageRecords,
    orgsListAttestationRepositories,
    orgsListAttestations,
    orgsListAttestationsBulk,
    orgsListBlockedUsers,
    orgsListFailedInvitations,
    orgsListForAuthenticatedUser,
    orgsListForUser,
    orgsListInvitationTeams,
    orgsListIssueFields,
    orgsListIssueTypes,
    orgsListMembers,
    orgsListMembershipsForAuthenticatedUser,
    orgsListOrgRoleTeams,
    orgsListOrgRoleUsers,
    orgsListOrgRoles,
    orgsListOutsideCollaborators,
    orgsListPatGrantRepositories,
    orgsListPatGrantRequestRepositories,
    orgsListPatGrantRequests,
    orgsListPatGrants,
    orgsListPendingInvitations,
    orgsListPublicMembers,
    orgsListSecurityManagerTeams,
    orgsListWebhookDeliveries,
    orgsListWebhooks,
    orgsPingWebhook,
    orgsRedeliverWebhookDelivery,
    orgsRemoveMember,
    orgsRemoveMembershipForUser,
    orgsRemoveOutsideCollaborator,
    orgsRemovePublicMembershipForAuthenticatedUser,
    orgsRemoveSecurityManagerTeam,
    orgsReviewPatGrantRequest,
    orgsReviewPatGrantRequestsInBulk,
    orgsRevokeAllOrgRolesTeam,
    orgsRevokeAllOrgRolesUser,
    orgsRevokeOrgRoleTeam,
    orgsRevokeOrgRoleUser,
    orgsSetClusterDeploymentRecords,
    orgsSetImmutableReleasesSettings,
    orgsSetImmutableReleasesSettingsRepositories,
    orgsSetMembershipForUser,
    orgsSetPublicMembershipForAuthenticatedUser,
    orgsUnblockUser,
    orgsUpdate,
    orgsUpdateIssueField,
    orgsUpdateIssueType,
    orgsUpdateMembershipForAuthenticatedUser,
    orgsUpdatePatAccess,
    orgsUpdatePatAccesses,
    orgsUpdateWebhook,
    orgsUpdateWebhookConfigForOrg,
    reposCreateOrgRuleset,
    reposDeleteOrgRuleset,
    reposGetOrgRuleSuite,
    reposGetOrgRuleSuites,
    reposGetOrgRuleset,
    reposGetOrgRulesets,
    reposUpdateOrgRuleset,
    teamsAddMemberLegacy,
    teamsAddOrUpdateMembershipForUserInOrg,
    teamsAddOrUpdateMembershipForUserLegacy,
    teamsAddOrUpdateRepoPermissionsInOrg,
    teamsAddOrUpdateRepoPermissionsLegacy,
    teamsCheckPermissionsForRepoInOrg,
    teamsCheckPermissionsForRepoLegacy,
    teamsCreate,
    teamsDeleteInOrg,
    teamsDeleteLegacy,
    teamsGetByName,
    teamsGetLegacy,
    teamsGetMemberLegacy,
    teamsGetMembershipForUserInOrg,
    teamsGetMembershipForUserLegacy,
    teamsList,
    teamsListChildInOrg,
    teamsListChildLegacy,
    teamsListForAuthenticatedUser,
    teamsListMembersInOrg,
    teamsListMembersLegacy,
    teamsListPendingInvitationsInOrg,
    teamsListPendingInvitationsLegacy,
    teamsListReposInOrg,
    teamsListReposLegacy,
    teamsRemoveMemberLegacy,
    teamsRemoveMembershipForUserInOrg,
    teamsRemoveMembershipForUserLegacy,
    teamsRemoveRepoInOrg,
    teamsRemoveRepoLegacy,
    teamsUpdateInOrg,
    teamsUpdateLegacy,
  ],
});
