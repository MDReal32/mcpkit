import { teamsAddMemberLegacy } from './add-member-legacy';
import { teamsAddOrUpdateMembershipForUserInOrg } from './add-or-update-membership-for-user-in-org';
import { teamsAddOrUpdateMembershipForUserLegacy } from './add-or-update-membership-for-user-legacy';
import { teamsAddOrUpdateRepoPermissionsInOrg } from './add-or-update-repo-permissions-in-org';
import { teamsAddOrUpdateRepoPermissionsLegacy } from './add-or-update-repo-permissions-legacy';
import { teamsCheckPermissionsForRepoInOrg } from './check-permissions-for-repo-in-org';
import { teamsCheckPermissionsForRepoLegacy } from './check-permissions-for-repo-legacy';
import { teamsCreate } from './create';
import { teamsDeleteInOrg } from './delete-in-org';
import { teamsDeleteLegacy } from './delete-legacy';
import { teamsGetByName } from './get-by-name';
import { teamsGetLegacy } from './get-legacy';
import { teamsGetMemberLegacy } from './get-member-legacy';
import { teamsGetMembershipForUserInOrg } from './get-membership-for-user-in-org';
import { teamsGetMembershipForUserLegacy } from './get-membership-for-user-legacy';
import { teamsList } from './list';
import { teamsListChildInOrg } from './list-child-in-org';
import { teamsListChildLegacy } from './list-child-legacy';
import { teamsListForAuthenticatedUser } from './list-for-authenticated-user';
import { teamsListMembersInOrg } from './list-members-in-org';
import { teamsListMembersLegacy } from './list-members-legacy';
import { teamsListPendingInvitationsInOrg } from './list-pending-invitations-in-org';
import { teamsListPendingInvitationsLegacy } from './list-pending-invitations-legacy';
import { teamsListReposInOrg } from './list-repos-in-org';
import { teamsListReposLegacy } from './list-repos-legacy';
import { teamsRemoveMemberLegacy } from './remove-member-legacy';
import { teamsRemoveMembershipForUserInOrg } from './remove-membership-for-user-in-org';
import { teamsRemoveMembershipForUserLegacy } from './remove-membership-for-user-legacy';
import { teamsRemoveRepoInOrg } from './remove-repo-in-org';
import { teamsRemoveRepoLegacy } from './remove-repo-legacy';
import { teamsUpdateInOrg } from './update-in-org';
import { teamsUpdateLegacy } from './update-legacy';

export const teamsTools = [
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
];
