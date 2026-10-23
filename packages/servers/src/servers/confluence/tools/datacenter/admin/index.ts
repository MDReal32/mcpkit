import { datacenterAdminCreateGroup } from "./create-group";
import { datacenterAdminCreateSpacePersonal } from "./create-space-personal";
import { datacenterAdminCreateUser } from "./create-user";
import { datacenterAdminCreateUserPassword } from "./create-user-password";
import { datacenterAdminDeleteGroup } from "./delete-group";
import { datacenterAdminDeleteUser } from "./delete-user";
import { datacenterAdminGetUsersListActive } from "./get-users-list-active";
import { datacenterAdminUpdateUser } from "./update-user";
import { datacenterAdminUpdateUserDisable } from "./update-user-disable";
import { datacenterAdminUpdateUserEnable } from "./update-user-enable";

export const datacenterAdminTools = [
  datacenterAdminCreateGroup,
  datacenterAdminCreateSpacePersonal,
  datacenterAdminCreateUser,
  datacenterAdminCreateUserPassword,
  datacenterAdminDeleteGroup,
  datacenterAdminDeleteUser,
  datacenterAdminGetUsersListActive,
  datacenterAdminUpdateUser,
  datacenterAdminUpdateUserDisable,
  datacenterAdminUpdateUserEnable,
];
