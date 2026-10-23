import { usersApplicationRolesTools } from "./application-roles";
import { usersAvatarsTools } from "./avatars";
import { usersGroupAndUserPickerTools } from "./group-and-user-picker";
import { usersGroupsTools } from "./groups";
import { usersMyselfTools } from "./myself";
import { usersPermissionSchemesTools } from "./permission-schemes";
import { usersPermissionsTools } from "./permissions";
import { usersUserPropertiesTools } from "./user-properties";
import { usersUserSearchTools } from "./user-search";
import { usersUsersTools } from "./users";

export const usersGroupTools = [
  ...usersApplicationRolesTools,
  ...usersAvatarsTools,
  ...usersGroupAndUserPickerTools,
  ...usersGroupsTools,
  ...usersMyselfTools,
  ...usersPermissionSchemesTools,
  ...usersPermissionsTools,
  ...usersUserPropertiesTools,
  ...usersUserSearchTools,
  ...usersUsersTools,
];
