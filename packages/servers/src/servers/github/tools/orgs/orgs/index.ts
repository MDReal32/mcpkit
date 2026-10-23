import { orgsOrgsAddSecurityManagerTeam } from "./add-security-manager-team";
import { orgsOrgsAssignTeamToOrgRole } from "./assign-team-to-org-role";
import { orgsOrgsAssignUserToOrgRole } from "./assign-user-to-org-role";
import { orgsOrgsBlockUser } from "./block-user";
import { orgsOrgsCancelInvitation } from "./cancel-invitation";
import { orgsOrgsCheckBlockedUser } from "./check-blocked-user";
import { orgsOrgsCheckMembershipForUser } from "./check-membership-for-user";
import { orgsOrgsCheckPublicMembershipForUser } from "./check-public-membership-for-user";
import { orgsOrgsConvertMemberToOutsideCollaborator } from "./convert-member-to-outside-collaborator";
import { orgsOrgsCreateArtifactDeploymentRecord } from "./create-artifact-deployment-record";
import { orgsOrgsCreateArtifactStorageRecord } from "./create-artifact-storage-record";
import { orgsOrgsCreateClusterDeploymentRecordsJob } from "./create-cluster-deployment-records-job";
import { orgsOrgsCreateInvitation } from "./create-invitation";
import { orgsOrgsCreateIssueField } from "./create-issue-field";
import { orgsOrgsCreateIssueType } from "./create-issue-type";
import { orgsOrgsCreateWebhook } from "./create-webhook";
import { orgsOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinition } from "./custom-properties-for-repos-create-or-update-organization-definition";
import { orgsOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitions } from "./custom-properties-for-repos-create-or-update-organization-definitions";
import { orgsOrgsCustomPropertiesForReposCreateOrUpdateOrganizationValues } from "./custom-properties-for-repos-create-or-update-organization-values";
import { orgsOrgsCustomPropertiesForReposDeleteOrganizationDefinition } from "./custom-properties-for-repos-delete-organization-definition";
import { orgsOrgsCustomPropertiesForReposGetOrganizationDefinition } from "./custom-properties-for-repos-get-organization-definition";
import { orgsOrgsCustomPropertiesForReposGetOrganizationDefinitions } from "./custom-properties-for-repos-get-organization-definitions";
import { orgsOrgsCustomPropertiesForReposGetOrganizationValues } from "./custom-properties-for-repos-get-organization-values";
import { orgsOrgsDelete } from "./delete";
import { orgsOrgsDeleteAttestationsBulk } from "./delete-attestations-bulk";
import { orgsOrgsDeleteAttestationsById } from "./delete-attestations-by-id";
import { orgsOrgsDeleteAttestationsBySubjectDigest } from "./delete-attestations-by-subject-digest";
import { orgsOrgsDeleteIssueField } from "./delete-issue-field";
import { orgsOrgsDeleteIssueType } from "./delete-issue-type";
import { orgsOrgsDeleteWebhook } from "./delete-webhook";
import { orgsOrgsDisableSelectedRepositoryImmutableReleasesOrganization } from "./disable-selected-repository-immutable-releases-organization";
import { orgsOrgsEnableOrDisableSecurityProductOnAllOrgRepos } from "./enable-or-disable-security-product-on-all-org-repos";
import { orgsOrgsEnableSelectedRepositoryImmutableReleasesOrganization } from "./enable-selected-repository-immutable-releases-organization";
import { orgsOrgsExternalPropertiesForReposCreateOrUpdateOrganizationValues } from "./external-properties-for-repos-create-or-update-organization-values";
import { orgsOrgsExternalPropertiesForReposCreateOrUpdateValuesForOrganizationProperty } from "./external-properties-for-repos-create-or-update-values-for-organization-property";
import { orgsOrgsExternalPropertiesForReposDeleteOrganizationValues } from "./external-properties-for-repos-delete-organization-values";
import { orgsOrgsExternalPropertiesForReposGetOrganizationAppInstallations } from "./external-properties-for-repos-get-organization-app-installations";
import { orgsOrgsExternalPropertiesForReposGetOrganizationDefinitions } from "./external-properties-for-repos-get-organization-definitions";
import { orgsOrgsExternalPropertiesForReposRegisterOrganizationAppInstallation } from "./external-properties-for-repos-register-organization-app-installation";
import { orgsOrgsGet } from "./get";
import { orgsOrgsGetClusterDeploymentRecordsJob } from "./get-cluster-deployment-records-job";
import { orgsOrgsGetImmutableReleasesSettings } from "./get-immutable-releases-settings";
import { orgsOrgsGetImmutableReleasesSettingsRepositories } from "./get-immutable-releases-settings-repositories";
import { orgsOrgsGetMembershipForAuthenticatedUser } from "./get-membership-for-authenticated-user";
import { orgsOrgsGetMembershipForUser } from "./get-membership-for-user";
import { orgsOrgsGetOrgRole } from "./get-org-role";
import { orgsOrgsGetOrgRulesetHistory } from "./get-org-ruleset-history";
import { orgsOrgsGetOrgRulesetVersion } from "./get-org-ruleset-version";
import { orgsOrgsGetWebhook } from "./get-webhook";
import { orgsOrgsGetWebhookConfigForOrg } from "./get-webhook-config-for-org";
import { orgsOrgsGetWebhookDelivery } from "./get-webhook-delivery";
import { orgsOrgsList } from "./list";
import { orgsOrgsListAppInstallations } from "./list-app-installations";
import { orgsOrgsListArtifactDeploymentRecords } from "./list-artifact-deployment-records";
import { orgsOrgsListArtifactStorageRecords } from "./list-artifact-storage-records";
import { orgsOrgsListAttestationRepositories } from "./list-attestation-repositories";
import { orgsOrgsListAttestations } from "./list-attestations";
import { orgsOrgsListAttestationsBulk } from "./list-attestations-bulk";
import { orgsOrgsListBlockedUsers } from "./list-blocked-users";
import { orgsOrgsListFailedInvitations } from "./list-failed-invitations";
import { orgsOrgsListForAuthenticatedUser } from "./list-for-authenticated-user";
import { orgsOrgsListForUser } from "./list-for-user";
import { orgsOrgsListInvitationTeams } from "./list-invitation-teams";
import { orgsOrgsListIssueFields } from "./list-issue-fields";
import { orgsOrgsListIssueTypes } from "./list-issue-types";
import { orgsOrgsListMembers } from "./list-members";
import { orgsOrgsListMembershipsForAuthenticatedUser } from "./list-memberships-for-authenticated-user";
import { orgsOrgsListOrgRoleTeams } from "./list-org-role-teams";
import { orgsOrgsListOrgRoleUsers } from "./list-org-role-users";
import { orgsOrgsListOrgRoles } from "./list-org-roles";
import { orgsOrgsListOutsideCollaborators } from "./list-outside-collaborators";
import { orgsOrgsListPatGrantRepositories } from "./list-pat-grant-repositories";
import { orgsOrgsListPatGrantRequestRepositories } from "./list-pat-grant-request-repositories";
import { orgsOrgsListPatGrantRequests } from "./list-pat-grant-requests";
import { orgsOrgsListPatGrants } from "./list-pat-grants";
import { orgsOrgsListPendingInvitations } from "./list-pending-invitations";
import { orgsOrgsListPublicMembers } from "./list-public-members";
import { orgsOrgsListSecurityManagerTeams } from "./list-security-manager-teams";
import { orgsOrgsListWebhookDeliveries } from "./list-webhook-deliveries";
import { orgsOrgsListWebhooks } from "./list-webhooks";
import { orgsOrgsPingWebhook } from "./ping-webhook";
import { orgsOrgsRedeliverWebhookDelivery } from "./redeliver-webhook-delivery";
import { orgsOrgsRemoveMember } from "./remove-member";
import { orgsOrgsRemoveMembershipForUser } from "./remove-membership-for-user";
import { orgsOrgsRemoveOutsideCollaborator } from "./remove-outside-collaborator";
import { orgsOrgsRemovePublicMembershipForAuthenticatedUser } from "./remove-public-membership-for-authenticated-user";
import { orgsOrgsRemoveSecurityManagerTeam } from "./remove-security-manager-team";
import { orgsOrgsReviewPatGrantRequest } from "./review-pat-grant-request";
import { orgsOrgsReviewPatGrantRequestsInBulk } from "./review-pat-grant-requests-in-bulk";
import { orgsOrgsRevokeAllOrgRolesTeam } from "./revoke-all-org-roles-team";
import { orgsOrgsRevokeAllOrgRolesUser } from "./revoke-all-org-roles-user";
import { orgsOrgsRevokeOrgRoleTeam } from "./revoke-org-role-team";
import { orgsOrgsRevokeOrgRoleUser } from "./revoke-org-role-user";
import { orgsOrgsSetClusterDeploymentRecords } from "./set-cluster-deployment-records";
import { orgsOrgsSetImmutableReleasesSettings } from "./set-immutable-releases-settings";
import { orgsOrgsSetImmutableReleasesSettingsRepositories } from "./set-immutable-releases-settings-repositories";
import { orgsOrgsSetMembershipForUser } from "./set-membership-for-user";
import { orgsOrgsSetPublicMembershipForAuthenticatedUser } from "./set-public-membership-for-authenticated-user";
import { orgsOrgsUnblockUser } from "./unblock-user";
import { orgsOrgsUpdate } from "./update";
import { orgsOrgsUpdateIssueField } from "./update-issue-field";
import { orgsOrgsUpdateIssueType } from "./update-issue-type";
import { orgsOrgsUpdateMembershipForAuthenticatedUser } from "./update-membership-for-authenticated-user";
import { orgsOrgsUpdatePatAccess } from "./update-pat-access";
import { orgsOrgsUpdatePatAccesses } from "./update-pat-accesses";
import { orgsOrgsUpdateWebhook } from "./update-webhook";
import { orgsOrgsUpdateWebhookConfigForOrg } from "./update-webhook-config-for-org";

export const orgsOrgsTools = [
  orgsOrgsAddSecurityManagerTeam,
  orgsOrgsAssignTeamToOrgRole,
  orgsOrgsAssignUserToOrgRole,
  orgsOrgsBlockUser,
  orgsOrgsCancelInvitation,
  orgsOrgsCheckBlockedUser,
  orgsOrgsCheckMembershipForUser,
  orgsOrgsCheckPublicMembershipForUser,
  orgsOrgsConvertMemberToOutsideCollaborator,
  orgsOrgsCreateArtifactDeploymentRecord,
  orgsOrgsCreateArtifactStorageRecord,
  orgsOrgsCreateClusterDeploymentRecordsJob,
  orgsOrgsCreateInvitation,
  orgsOrgsCreateIssueField,
  orgsOrgsCreateIssueType,
  orgsOrgsCreateWebhook,
  orgsOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinition,
  orgsOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitions,
  orgsOrgsCustomPropertiesForReposCreateOrUpdateOrganizationValues,
  orgsOrgsCustomPropertiesForReposDeleteOrganizationDefinition,
  orgsOrgsCustomPropertiesForReposGetOrganizationDefinition,
  orgsOrgsCustomPropertiesForReposGetOrganizationDefinitions,
  orgsOrgsCustomPropertiesForReposGetOrganizationValues,
  orgsOrgsDelete,
  orgsOrgsDeleteAttestationsBulk,
  orgsOrgsDeleteAttestationsById,
  orgsOrgsDeleteAttestationsBySubjectDigest,
  orgsOrgsDeleteIssueField,
  orgsOrgsDeleteIssueType,
  orgsOrgsDeleteWebhook,
  orgsOrgsDisableSelectedRepositoryImmutableReleasesOrganization,
  orgsOrgsEnableOrDisableSecurityProductOnAllOrgRepos,
  orgsOrgsEnableSelectedRepositoryImmutableReleasesOrganization,
  orgsOrgsExternalPropertiesForReposCreateOrUpdateOrganizationValues,
  orgsOrgsExternalPropertiesForReposCreateOrUpdateValuesForOrganizationProperty,
  orgsOrgsExternalPropertiesForReposDeleteOrganizationValues,
  orgsOrgsExternalPropertiesForReposGetOrganizationAppInstallations,
  orgsOrgsExternalPropertiesForReposGetOrganizationDefinitions,
  orgsOrgsExternalPropertiesForReposRegisterOrganizationAppInstallation,
  orgsOrgsGet,
  orgsOrgsGetClusterDeploymentRecordsJob,
  orgsOrgsGetImmutableReleasesSettings,
  orgsOrgsGetImmutableReleasesSettingsRepositories,
  orgsOrgsGetMembershipForAuthenticatedUser,
  orgsOrgsGetMembershipForUser,
  orgsOrgsGetOrgRole,
  orgsOrgsGetOrgRulesetHistory,
  orgsOrgsGetOrgRulesetVersion,
  orgsOrgsGetWebhook,
  orgsOrgsGetWebhookConfigForOrg,
  orgsOrgsGetWebhookDelivery,
  orgsOrgsList,
  orgsOrgsListAppInstallations,
  orgsOrgsListArtifactDeploymentRecords,
  orgsOrgsListArtifactStorageRecords,
  orgsOrgsListAttestationRepositories,
  orgsOrgsListAttestations,
  orgsOrgsListAttestationsBulk,
  orgsOrgsListBlockedUsers,
  orgsOrgsListFailedInvitations,
  orgsOrgsListForAuthenticatedUser,
  orgsOrgsListForUser,
  orgsOrgsListInvitationTeams,
  orgsOrgsListIssueFields,
  orgsOrgsListIssueTypes,
  orgsOrgsListMembers,
  orgsOrgsListMembershipsForAuthenticatedUser,
  orgsOrgsListOrgRoleTeams,
  orgsOrgsListOrgRoleUsers,
  orgsOrgsListOrgRoles,
  orgsOrgsListOutsideCollaborators,
  orgsOrgsListPatGrantRepositories,
  orgsOrgsListPatGrantRequestRepositories,
  orgsOrgsListPatGrantRequests,
  orgsOrgsListPatGrants,
  orgsOrgsListPendingInvitations,
  orgsOrgsListPublicMembers,
  orgsOrgsListSecurityManagerTeams,
  orgsOrgsListWebhookDeliveries,
  orgsOrgsListWebhooks,
  orgsOrgsPingWebhook,
  orgsOrgsRedeliverWebhookDelivery,
  orgsOrgsRemoveMember,
  orgsOrgsRemoveMembershipForUser,
  orgsOrgsRemoveOutsideCollaborator,
  orgsOrgsRemovePublicMembershipForAuthenticatedUser,
  orgsOrgsRemoveSecurityManagerTeam,
  orgsOrgsReviewPatGrantRequest,
  orgsOrgsReviewPatGrantRequestsInBulk,
  orgsOrgsRevokeAllOrgRolesTeam,
  orgsOrgsRevokeAllOrgRolesUser,
  orgsOrgsRevokeOrgRoleTeam,
  orgsOrgsRevokeOrgRoleUser,
  orgsOrgsSetClusterDeploymentRecords,
  orgsOrgsSetImmutableReleasesSettings,
  orgsOrgsSetImmutableReleasesSettingsRepositories,
  orgsOrgsSetMembershipForUser,
  orgsOrgsSetPublicMembershipForAuthenticatedUser,
  orgsOrgsUnblockUser,
  orgsOrgsUpdate,
  orgsOrgsUpdateIssueField,
  orgsOrgsUpdateIssueType,
  orgsOrgsUpdateMembershipForAuthenticatedUser,
  orgsOrgsUpdatePatAccess,
  orgsOrgsUpdatePatAccesses,
  orgsOrgsUpdateWebhook,
  orgsOrgsUpdateWebhookConfigForOrg,
];
