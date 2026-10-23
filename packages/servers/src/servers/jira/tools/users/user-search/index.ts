import { usersUserSearchFindAssignableUsers } from "./find-assignable-users";
import { usersUserSearchFindBulkAssignableUsers } from "./find-bulk-assignable-users";
import { usersUserSearchFindUserKeysByQuery } from "./find-user-keys-by-query";
import { usersUserSearchFindUsers } from "./find-users";
import { usersUserSearchFindUsersByQuery } from "./find-users-by-query";
import { usersUserSearchFindUsersForPicker } from "./find-users-for-picker";
import { usersUserSearchFindUsersWithAllPermissions } from "./find-users-with-all-permissions";
import { usersUserSearchFindUsersWithBrowsePermission } from "./find-users-with-browse-permission";

export const usersUserSearchTools = [
  usersUserSearchFindAssignableUsers,
  usersUserSearchFindBulkAssignableUsers,
  usersUserSearchFindUserKeysByQuery,
  usersUserSearchFindUsers,
  usersUserSearchFindUsersByQuery,
  usersUserSearchFindUsersForPicker,
  usersUserSearchFindUsersWithAllPermissions,
  usersUserSearchFindUsersWithBrowsePermission,
];
