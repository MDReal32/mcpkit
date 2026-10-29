import { invitesTargetUsersAddInviteTargetUser } from "./add-invite-target-user";
import { invitesTargetUsersBulkAddInviteTargetUsers } from "./bulk-add-invite-target-users";
import { invitesTargetUsersBulkRemoveInviteTargetUsers } from "./bulk-remove-invite-target-users";
import { invitesTargetUsersGetInviteTargetUsers } from "./get-invite-target-users";
import { invitesTargetUsersGetInviteTargetUsersJobStatus } from "./get-invite-target-users-job-status";
import { invitesTargetUsersRemoveInviteTargetUser } from "./remove-invite-target-user";
import { invitesTargetUsersUpdateInviteTargetUsers } from "./update-invite-target-users";

export const invitesTargetUsersTools = [
  invitesTargetUsersAddInviteTargetUser,
  invitesTargetUsersBulkAddInviteTargetUsers,
  invitesTargetUsersBulkRemoveInviteTargetUsers,
  invitesTargetUsersGetInviteTargetUsers,
  invitesTargetUsersGetInviteTargetUsersJobStatus,
  invitesTargetUsersRemoveInviteTargetUser,
  invitesTargetUsersUpdateInviteTargetUsers,
];
