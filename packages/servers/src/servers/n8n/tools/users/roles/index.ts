import { usersRolesCreateRole } from "./create-role";
import { usersRolesDeleteRole } from "./delete-role";
import { usersRolesGetAllRoles } from "./get-all-roles";
import { usersRolesGetRole } from "./get-role";
import { usersRolesUpdateRole } from "./update-role";

export const usersRolesTools = [
  usersRolesCreateRole,
  usersRolesDeleteRole,
  usersRolesGetAllRoles,
  usersRolesGetRole,
  usersRolesUpdateRole,
];
