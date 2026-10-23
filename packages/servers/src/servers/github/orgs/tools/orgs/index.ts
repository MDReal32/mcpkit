import { orgsAddSecurityManagerTeam } from './add-security-manager-team';
import { orgsAssignTeamToOrgRole } from './assign-team-to-org-role';
import { orgsAssignUserToOrgRole } from './assign-user-to-org-role';
import { orgsBlockUser } from './block-user';
import { orgsCancelInvitation } from './cancel-invitation';
import { orgsCheckBlockedUser } from './check-blocked-user';
import { orgsCheckMembershipForUser } from './check-membership-for-user';
import { orgsCheckPublicMembershipForUser } from './check-public-membership-for-user';
import { orgsConvertMemberToOutsideCollaborator } from './convert-member-to-outside-collaborator';
import { orgsCreateArtifactDeploymentRecord } from './create-artifact-deployment-record';
import { orgsCreateArtifactStorageRecord } from './create-artifact-storage-record';
import { orgsCreateClusterDeploymentRecordsJob } from './create-cluster-deployment-records-job';
import { orgsCreateInvitation } from './create-invitation';
import { orgsCreateIssueField } from './create-issue-field';
import { orgsCreateIssueType } from './create-issue-type';
import { orgsCreateWebhook } from './create-webhook';
import { orgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinition } from './custom-properties-for-repos-create-or-update-organization-definition';
import { orgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitions } from './custom-properties-for-repos-create-or-update-organization-definitions';
import { orgsCustomPropertiesForReposCreateOrUpdateOrganizationValues } from './custom-properties-for-repos-create-or-update-organization-values';
import { orgsCustomPropertiesForReposDeleteOrganizationDefinition } from './custom-properties-for-repos-delete-organization-definition';
import { orgsCustomPropertiesForReposGetOrganizationDefinition } from './custom-properties-for-repos-get-organization-definition';
import { orgsCustomPropertiesForReposGetOrganizationDefinitions } from './custom-properties-for-repos-get-organization-definitions';
import { orgsCustomPropertiesForReposGetOrganizationValues } from './custom-properties-for-repos-get-organization-values';
import { orgsDelete } from './delete';
import { orgsDeleteAttestationsBulk } from './delete-attestations-bulk';
import { orgsDeleteAttestationsById } from './delete-attestations-by-id';
import { orgsDeleteAttestationsBySubjectDigest } from './delete-attestations-by-subject-digest';
import { orgsDeleteIssueField } from './delete-issue-field';
import { orgsDeleteIssueType } from './delete-issue-type';
import { orgsDeleteWebhook } from './delete-webhook';
import { orgsDisableSelectedRepositoryImmutableReleasesOrganization } from './disable-selected-repository-immutable-releases-organization';
import { orgsEnableOrDisableSecurityProductOnAllOrgRepos } from './enable-or-disable-security-product-on-all-org-repos';
import { orgsEnableSelectedRepositoryImmutableReleasesOrganization } from './enable-selected-repository-immutable-releases-organization';
import { orgsExternalPropertiesForReposCreateOrUpdateOrganizationValues } from './external-properties-for-repos-create-or-update-organization-values';
import { orgsExternalPropertiesForReposCreateOrUpdateValuesForOrganizationProperty } from './external-properties-for-repos-create-or-update-values-for-organization-property';
import { orgsExternalPropertiesForReposDeleteOrganizationValues } from './external-properties-for-repos-delete-organization-values';
import { orgsExternalPropertiesForReposGetOrganizationAppInstallations } from './external-properties-for-repos-get-organization-app-installations';
import { orgsExternalPropertiesForReposGetOrganizationDefinitions } from './external-properties-for-repos-get-organization-definitions';
import { orgsExternalPropertiesForReposRegisterOrganizationAppInstallation } from './external-properties-for-repos-register-organization-app-installation';
import { orgsGet } from './get';
import { orgsGetClusterDeploymentRecordsJob } from './get-cluster-deployment-records-job';
import { orgsGetImmutableReleasesSettings } from './get-immutable-releases-settings';
import { orgsGetImmutableReleasesSettingsRepositories } from './get-immutable-releases-settings-repositories';
import { orgsGetMembershipForAuthenticatedUser } from './get-membership-for-authenticated-user';
import { orgsGetMembershipForUser } from './get-membership-for-user';
import { orgsGetOrgRole } from './get-org-role';
import { orgsGetOrgRulesetHistory } from './get-org-ruleset-history';
import { orgsGetOrgRulesetVersion } from './get-org-ruleset-version';
import { orgsGetWebhook } from './get-webhook';
import { orgsGetWebhookConfigForOrg } from './get-webhook-config-for-org';
import { orgsGetWebhookDelivery } from './get-webhook-delivery';
import { orgsList } from './list';
import { orgsListAppInstallations } from './list-app-installations';
import { orgsListArtifactDeploymentRecords } from './list-artifact-deployment-records';
import { orgsListArtifactStorageRecords } from './list-artifact-storage-records';
import { orgsListAttestationRepositories } from './list-attestation-repositories';
import { orgsListAttestations } from './list-attestations';
import { orgsListAttestationsBulk } from './list-attestations-bulk';
import { orgsListBlockedUsers } from './list-blocked-users';
import { orgsListFailedInvitations } from './list-failed-invitations';
import { orgsListForAuthenticatedUser } from './list-for-authenticated-user';
import { orgsListForUser } from './list-for-user';
import { orgsListInvitationTeams } from './list-invitation-teams';
import { orgsListIssueFields } from './list-issue-fields';
import { orgsListIssueTypes } from './list-issue-types';
import { orgsListMembers } from './list-members';
import { orgsListMembershipsForAuthenticatedUser } from './list-memberships-for-authenticated-user';
import { orgsListOrgRoleTeams } from './list-org-role-teams';
import { orgsListOrgRoleUsers } from './list-org-role-users';
import { orgsListOrgRoles } from './list-org-roles';
import { orgsListOutsideCollaborators } from './list-outside-collaborators';
import { orgsListPatGrantRepositories } from './list-pat-grant-repositories';
import { orgsListPatGrantRequestRepositories } from './list-pat-grant-request-repositories';
import { orgsListPatGrantRequests } from './list-pat-grant-requests';
import { orgsListPatGrants } from './list-pat-grants';
import { orgsListPendingInvitations } from './list-pending-invitations';
import { orgsListPublicMembers } from './list-public-members';
import { orgsListSecurityManagerTeams } from './list-security-manager-teams';
import { orgsListWebhookDeliveries } from './list-webhook-deliveries';
import { orgsListWebhooks } from './list-webhooks';
import { orgsPingWebhook } from './ping-webhook';
import { orgsRedeliverWebhookDelivery } from './redeliver-webhook-delivery';
import { orgsRemoveMember } from './remove-member';
import { orgsRemoveMembershipForUser } from './remove-membership-for-user';
import { orgsRemoveOutsideCollaborator } from './remove-outside-collaborator';
import { orgsRemovePublicMembershipForAuthenticatedUser } from './remove-public-membership-for-authenticated-user';
import { orgsRemoveSecurityManagerTeam } from './remove-security-manager-team';
import { orgsReviewPatGrantRequest } from './review-pat-grant-request';
import { orgsReviewPatGrantRequestsInBulk } from './review-pat-grant-requests-in-bulk';
import { orgsRevokeAllOrgRolesTeam } from './revoke-all-org-roles-team';
import { orgsRevokeAllOrgRolesUser } from './revoke-all-org-roles-user';
import { orgsRevokeOrgRoleTeam } from './revoke-org-role-team';
import { orgsRevokeOrgRoleUser } from './revoke-org-role-user';
import { orgsSetClusterDeploymentRecords } from './set-cluster-deployment-records';
import { orgsSetImmutableReleasesSettings } from './set-immutable-releases-settings';
import { orgsSetImmutableReleasesSettingsRepositories } from './set-immutable-releases-settings-repositories';
import { orgsSetMembershipForUser } from './set-membership-for-user';
import { orgsSetPublicMembershipForAuthenticatedUser } from './set-public-membership-for-authenticated-user';
import { orgsUnblockUser } from './unblock-user';
import { orgsUpdate } from './update';
import { orgsUpdateIssueField } from './update-issue-field';
import { orgsUpdateIssueType } from './update-issue-type';
import { orgsUpdateMembershipForAuthenticatedUser } from './update-membership-for-authenticated-user';
import { orgsUpdatePatAccess } from './update-pat-access';
import { orgsUpdatePatAccesses } from './update-pat-accesses';
import { orgsUpdateWebhook } from './update-webhook';
import { orgsUpdateWebhookConfigForOrg } from './update-webhook-config-for-org';

export const orgsTools = [
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
];
