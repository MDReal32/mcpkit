import { guildsRolesBulkUpdateGuildRoles } from "./bulk-update-guild-roles";
import { guildsRolesCreateGuildRole } from "./create-guild-role";
import { guildsRolesDeleteGuildRole } from "./delete-guild-role";
import { guildsRolesGetGuildRole } from "./get-guild-role";
import { guildsRolesGuildRoleMemberCounts } from "./guild-role-member-counts";
import { guildsRolesListGuildRoles } from "./list-guild-roles";
import { guildsRolesUpdateGuildRole } from "./update-guild-role";

export const guildsRolesTools = [
  guildsRolesBulkUpdateGuildRoles,
  guildsRolesCreateGuildRole,
  guildsRolesDeleteGuildRole,
  guildsRolesGetGuildRole,
  guildsRolesGuildRoleMemberCounts,
  guildsRolesListGuildRoles,
  guildsRolesUpdateGuildRole,
];
