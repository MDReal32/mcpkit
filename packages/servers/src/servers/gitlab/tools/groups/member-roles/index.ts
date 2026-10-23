import { groupsMemberRolesCreateAdminMemberRoles } from './create-admin-member-roles';
import { groupsMemberRolesCreateGroupsMemberRoles } from './create-groups-member-roles';
import { groupsMemberRolesCreateMemberRoles } from './create-member-roles';
import { groupsMemberRolesDeleteAdminMemberRoles } from './delete-admin-member-roles';
import { groupsMemberRolesDeleteGroupsMemberRoles } from './delete-groups-member-roles';
import { groupsMemberRolesDeleteMemberRoles } from './delete-member-roles';
import { groupsMemberRolesListAdminMemberRoles } from './list-admin-member-roles';
import { groupsMemberRolesListGroupsMemberRoles } from './list-groups-member-roles';
import { groupsMemberRolesListMemberRoles } from './list-member-roles';

export const groupsMemberRolesTools = [
  groupsMemberRolesCreateAdminMemberRoles,
  groupsMemberRolesCreateGroupsMemberRoles,
  groupsMemberRolesCreateMemberRoles,
  groupsMemberRolesDeleteAdminMemberRoles,
  groupsMemberRolesDeleteGroupsMemberRoles,
  groupsMemberRolesDeleteMemberRoles,
  groupsMemberRolesListAdminMemberRoles,
  groupsMemberRolesListGroupsMemberRoles,
  groupsMemberRolesListMemberRoles,
];
