import { usersGroupsAddUserToGroup } from './add-user-to-group';
import { usersGroupsBulkGetGroups } from './bulk-get-groups';
import { usersGroupsCreateGroup } from './create-group';
import { usersGroupsFindGroups } from './find-groups';
import { usersGroupsGetGroup } from './get-group';
import { usersGroupsGetUsersFromGroup } from './get-users-from-group';
import { usersGroupsRemoveGroup } from './remove-group';
import { usersGroupsRemoveUserFromGroup } from './remove-user-from-group';

export const usersGroupsTools = [
  usersGroupsAddUserToGroup,
  usersGroupsBulkGetGroups,
  usersGroupsCreateGroup,
  usersGroupsFindGroups,
  usersGroupsGetGroup,
  usersGroupsGetUsersFromGroup,
  usersGroupsRemoveGroup,
  usersGroupsRemoveUserFromGroup,
];
